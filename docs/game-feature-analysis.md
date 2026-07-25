# Analiza feature Game — logika, wzorce architektoniczne, struktura plików

Analiza kompletnego feature `Game` w aplikacji CLI (Ink/React) dla gry kółko-krzyżyk opartej na bibliotece `t3core`.

---

## Struktura plików

```text
src/features/Game/
├── Game.tsx                    # Komponent główny — orchestracja UI (View)
├── index.ts                    # Barrel export (re-export Game)
├── constants/
│   └── gameConstants.ts        # BOARD_SIZE=9, INITIAL_BOARD_POSITION=4, BOARD_ROWS/COLS=3
├── engine/
│   ├── gameEngine.ts           # Adapter/Facade nad biblioteką t3core.Game (Model)
│   └── index.ts                # Barrel export
├── hooks/
│   ├── useGameInput.ts         # Thin input parser: key → command routing
│   ├── useGameStore.ts         # useSyncExternalStore — synchronizacja stanu engine z React
│   └── useGameViewModel.ts     # ViewModel: stan + komendy (makeMove, navigate, reset...)
├── reducers/
│   └── gameReducer.ts          # Reducer dla stanu UI (selectedCell, showInfo, historyMode, inputError)
├── validation/
│   ├── index.ts                # Barrel export
│   ├── validateMove.ts         # Kompozycja walidacji ruchu (zakres + zajętość pola)
│   └── validateSelectedField.ts # Walidacja czy pole jest już zajęte
└── components/
    ├── Board/
    │   ├── Board.tsx           # Pure renderer — deklaratywny .map() over grid
    │   ├── boardAdapter.ts     # Data Adapter: toGrid() — flat array → CellViewModel[][]
    │   ├── constants.ts        # BORDER_CHARS (box-drawing)
    │   ├── index.ts
    │   └── components/
    │       ├── BoardItem.tsx   # Pure renderer — dostaje CellViewModel (isSelected, value)
    │       ├── BoardRow.tsx    # Pure renderer — mapuje CellViewModel[] → BoardItem + Separator
    │       └── Border.tsx      # Ramka box-drawing (top/mid/bot)
    ├── GameHint/               # Podpowiedzi sterowania
    ├── GameInfo/               # Panel informacyjny o grze (toggle "i")
    ├── GameStatus/             # Status gry: running/draw/win
    ├── InputError/             # Wyświetlanie błędów walidacji
    └── PlayerPrompt/           # Wskaźnik aktualnego gracza
```

---

## Wzorce architektoniczne

### 1. Feature-Based Module Organization (FSD-like)

Cały feature jest samowystarczalną jednostką z własnymi `components/`, `hooks/`, `reducers/`, `validation/`, `engine/`, `constants/`. Komunikacja z resztą aplikacji przez barrel `index.ts` (eksportuje tylko `Game`).

### 2. Adapter / Facade Pattern — `gameEngine.ts`

`createGameEngine()` opakowuje instancję `t3core.Game` i wystawza uproszczony interfejs `GameEngine`:

- Gettery proxy: `snapshot`, `board`, `currentPlayer`, `gameStatus`, `movesCount`, `isRunning`
- Metody: `savePlayerMove`, `backToMove`, `reset`, `isFieldSelectedByIndex`
- Subscribe/unsubscribe przez event `GameEvent.STATE_CHANGE`
- **Izoluje** logikę gry od React — engine jest klasą z biblioteki zewnętrznej, adapter udostępnia czysto funkcjonalne API.

### 3. External Store Pattern — `useGameStore.ts`

Używa `useSyncExternalStore(engine.subscribe, engine.getSnapshot)` do synchronizacji stanu engine z React. Engine jest mutowalny (klasa `Game`), ale React widzi go jako external store z immutable snapshotami. To kanoniczny wzorzec React 18 dla integracji z zewnętrznymi źródłami stanu.

### 4. Reducer Pattern — `gameReducer.ts`

Stan UI (nie-gry) zarządzany przez `useReducer`:

- `UIState`: `selectedCell`, `showInfo`, `historyMode`, `inputError`
- `UIAction`: `NAVIGATE`, `TOGGLE_INFO`, `TOGGLE_HISTORY`, `SET_ERROR`, `RESET`
- Czysta funkcja `navigate()` implementuje nawigację po siatce z **wrap-around** (modulo)
- Reducer jest czysty i deterministyczny — łatwy do testowania.

### 5. Separacja stanu gry od stanu UI

- **Stan gry** (board, currentPlayer, gameStatus) → external store (engine)
- **Stan UI** (selectedCell, showInfo, historyMode, inputError) → useReducer
- To rozdzielenie pozwala na niezależne testowanie i ewolucję obu warstw.

### 6. MVVM Pattern — `useGameViewModel.ts`

ViewModel wystawia stan (gameState + ui) oraz komendy (makeMove, backToMove, navigate, toggleInfo, toggleHistory, reset). Komendy enkapsulują logikę biznesową (validate → mutate → dispatch) i są testowalne w izolacji bez Ink's `useInput`.

- **Model**: `t3core.Game` (external store) + `useSettingsStore`
- **ViewModel**: `useGameViewModel` — stan + komendy
- **View**: `Game.tsx` + `components/*` — pure rendering
- **Input Parser**: `useGameInput` — thin router: klawisz → komenda

### 7. Data Adapter Pattern — `boardAdapter.ts`

Czysta funkcja `toGrid()` transformująca flat array z Modelu do `CellViewModel[][]` dla View. Jedyna funkcja, która wie jak flat array → grid. Komponenty Board nie znają struktury flat array ani nie obliczają indexów.

### 8. Container/Presentational Component Split

- `Game.tsx` = container: tworzy engine, zarządza stanem, przekazuje props
- Komponenty w `components/` = presentational: czyste funkcje renderujące na podstawie props, bez logiki biznesowej

### 9. Factory Pattern — `createGameEngine()`

Engine tworzony raz przez `useRef(createGameEngine())` — instancja przeżywa re-render, nie jest tworzona na każdym renderze.

### 10. Barrel Exports

Każdy podkatalog ma `index.ts` z re-exportami — czyste import paths (`./components/Board` zamiast `./components/Board/Board`).

### 11. Validation Pipeline (Chain of Responsibility-like)

`validateMove` komponuje walidacje:

1. Sprawdzenie zakresu (history mode: 0–movesCount, normal: 0–BOARD_SIZE)
2. `validateSelectedField` — czy pole zajęte

Zwraca `string | null` (error message lub null).

---

## Logika — przepływ danych

```text
Game.tsx
  │
  ├─ useRef(createGameEngine())  →  GameEngine (singleton na lifecycle)
  │
  ├─ useGameInput(engine)
  │    ├─ useGameViewModel(engine)
  │    │    ├─ useGameStore(engine)        →  gameState via useSyncExternalStore
  │    │    ├─ useReducer(uiReducer)       →  ui (selectedCell, showInfo, historyMode, inputError)
  │    │    └─ commands: { makeMove, backToMove, navigate, toggleInfo, toggleHistory, reset }
  │    └─ useInput(handler)           →  thin parser: key → command
  │         │
  │         ├─ Game over?  →  Enter: commands.reset()
  │         ├─ "i"         →  commands.toggleInfo()
  │         ├─ "h"         →  commands.toggleHistory() (gdy movesCount > 0)
  │         ├─ historyMode →  parseHistoryInput (Enter/num → commands.backToMove)
  │         └─ normal mode:
  │              ├─ arrowNav ON  →  parseArrowInput (arrows → commands.navigate, Enter → commands.makeMove)
  │              └─ arrowNav OFF →  parseNumberInput (1-9 → commands.makeMove)
  │
  │  Komendy enkapsulują: validateMove → engine.savePlayerMove + beep | dispatch SET_ERROR
  │
  └─ Render:
       GameInfo (toggle) → PlayerPrompt → Board(toGrid) → GameStatus → InputError → GameHint
```

### Tryby gry

- **Normal mode**: nawigacja strzałkami (z wrap-around) lub input liczbowy 1-9
- **History mode** (`h`): cofanie do wybranego ruchu (`engine.backToMove`), zakres 0–movesCount
- **Game over**: Enter = restart, q = back to menu (obsługiwane wyżej)

### Sterowanie

- `i` — toggle info panel
- `h` — toggle history mode (gdy movesCount > 0)
- Strzałki — nawigacja (gdy arrowNav włączone w settings)
- `1-9` — wybór pola (gdy arrowNav wyłączone)
- `Enter`/`Space` — potwierdzenie ruchu / cofnięcie w history mode

---

## Obserwacje po refactorze

- ~~**Duplikacja stałych**~~: usunięte — `BOARD_ROWS`/`BOARD_COLS` tylko w `constants/gameConstants.ts`, `Board/constants.ts` zawiera tylko `BORDER_CHARS`.
- ~~`validateFieldRange.ts`~~: usunięte jako dead code.
- ~~`Board` renderuje imperatywnie~~: refaktorowane na deklaratywne `.map()` z Data Adapter.
- `arrowNav` czytany z `useSettingsStore` — integracja z globalnym store ustawień.
- `useGameInput` zredukowany z 161 do 85 linii — thin parser bez logiki biznesowej.
- `useGameViewModel` — nowy hook z komendami testowalnymi w izolacji (bez Ink's `useInput`).
- `boardAdapter.ts` — `toGrid()` jako jedyna funkcja transformująca flat array → grid.
