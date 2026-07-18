# Refactor plan — MVVM + Data Adapter w feature Game

Wprowadzenie wzorca MVVM na poziomie feature (rozdzielenie `useGameInput` na ViewModel + input parser) oraz Data Adapter na poziomie komponentu Board (wyciągnięcie transformacji flat array → grid do czystej funkcji).

---

## Cele refactoru

- Rozdzielenie logiki biznesowej (validate → mutate → dispatch) od parsowania inputu
- Wyciągnięcie komend ViewModelu do testowalnych w izolacji metod
- Transformacja danych Board do jednej czystej funkcji (`toGrid`)
- Eliminacja imperatywnego renderowania (`for` + `push`) na rzecz deklaratywnego (`.map()`)
- Redukcja prop drillingu (`selectedCell` nie trafia do `BoardItem`)

---

## Faza 1 — MVVM: rozdzielenie `useGameInput`

### 1.1 Utworzyć `hooks/useGameViewModel.ts`

Wyciągnąć stan + komendy z `useGameInput` do osobnego hooka:

```ts
export const useGameViewModel = (engine: GameEngine) => {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);

  const makeMove = (index: number) => {
    const error = validateMove({ index, game: engine, isHistoryMode: ui.historyMode });
    if (error) { dispatch({ type: "SET_ERROR", error }); return; }
    engine.savePlayerMove(index);
    beep();
    dispatch({ type: "SET_ERROR", error: null });
  };

  const backToMove = (index: number) => {
    const error = validateMove({ index, game: engine, isHistoryMode: true });
    if (error) { dispatch({ type: "SET_ERROR", error }); return; }
    engine.backToMove(index);
    dispatch({ type: "SET_ERROR", error: null });
  };

  const navigate = (direction: Direction) => dispatch({ type: "NAVIGATE", direction });
  const toggleInfo = () => dispatch({ type: "TOGGLE_INFO" });
  const toggleHistory = () => dispatch({ type: "TOGGLE_HISTORY" });
  const reset = () => { engine.reset(); dispatch({ type: "RESET" }); };

  return { gameState, ui, commands: { makeMove, backToMove, navigate, toggleInfo, toggleHistory, reset } };
};
```

### 1.2 Uprościć `hooks/useGameInput.ts` do thin input parsera

`useGameInput` staje się tylko routerem klawisz → komenda:

```ts
export const useGameInput = (engine: GameEngine) => {
  const { gameState, ui, commands } = useGameViewModel(engine);
  const arrowKeyNavigation = useSettingsStore((s) => s.arrowKeyNavigation);

  useInput((input, key) => {
    if (!engine.isRunning) {
      if (key.return) commands.reset();
      return;
    }
    if (input === "i") return commands.toggleInfo();
    if (input === "h" && engine.movesCount > 0) return commands.toggleHistory();
    if (ui.historyMode) return parseHistoryInput(input, key, ui, commands);
    if (arrowKeyNavigation) return parseArrowInput(input, key, ui, commands);
    return parseNumberInput(input, commands);
  });

  return { gameState, ui, arrowKeyNavigation };
};
```

Funkcje `handleArrowInput`, `handleNumberInput`, `handleHistoryInput` zostają zastąpione przez trywialne parsery, które tylko mapują klawisz → komenda.

### 1.3 `Game.tsx` — bez zmian

Komponent główny nie wymaga zmian — nadal woła `useGameInput` i otrzymuje `{ gameState, ui, arrowKeyNavigation }`.

### Pliki dotknięte fazą 1

- **Nowy**: `hooks/useGameViewModel.ts`
- **Zmodyfikowany**: `hooks/useGameInput.ts` (znacznie krótszy)
- **Bez zmian**: `Game.tsx`, `reducers/gameReducer.ts`, `hooks/useGameStore.ts`, `validation/*`

---

## Faza 2 — Data Adapter: transformacja Board

### 2.1 Utworzyć `components/Board/boardAdapter.ts`

Czysta funkcja transformująca flat array → grid `CellViewModel`:

```ts
export type CellViewModel = {
  index: number;
  value: BoardField;
  isSelected: boolean;
};

export const toGrid = (
  board: readonly BoardField[],
  selectedCell: number,
): CellViewModel[][] =>
  Array.from({ length: BOARD_ROWS }, (_, row) =>
    Array.from({ length: BOARD_COLS }, (_, col) => {
      const index = row * BOARD_COLS + col;
      return { index, value: board[index], isSelected: index === selectedCell };
    }),
  );
```

### 2.2 Refactor `Board.tsx` — deklaratywny renderer

```tsx
export const Board = ({ board, selectedCell }: BoardProps) => {
  const grid = toGrid(board, selectedCell);

  return (
    <Box flexDirection="column" alignItems="center">
      <Border type="top" />
      {grid.map((cells, row) => (
        <Fragment key={row}>
          <BoardRow cells={cells} />
          {row < grid.length - 1 && <Border type="mid" />}
        </Fragment>
      ))}
      <Border type="bot" />
    </Box>
  );
};
```

### 2.3 Refactor `BoardRow.tsx` — nie wie o flat array

```tsx
export const BoardRow = ({ cells }: { cells: CellViewModel[] }) => (
  <Box>
    <Separator />
    {cells.map((cell, i) => (
      <Fragment key={cell.index}>
        <BoardItem cell={cell} />
        {i < cells.length - 1 && <Separator />}
      </Fragment>
    ))}
    <Separator />
  </Box>
);
```

- Usunąć props `board`, `rowIndex`, `cols`, `selectedCell`
- Zastąpić przez `cells: CellViewModel[]`
- Usunąć pętlę `for` + `push`

### 2.4 Refactor `BoardItem.tsx` — dostaje gotowy `CellViewModel`

```tsx
export const BoardItem = ({ cell }: { cell: CellViewModel }) => {
  const isBold = cell.isSelected || DEFAULT_GAME_SYMBOLS.some((v) => v === cell.value);
  const color = getColor(cell.isSelected, cell.value);
  const content = cell.isSelected ? `[${cell.value}]` : ` ${cell.value} `;

  return <Text bold={isBold} color={color}>{content}</Text>;
};
```

- Usunąć props `value`, `index`, `selectedCell`
- Zastąpić przez `cell: CellViewModel`
- Usunąć obliczanie `isSelected = index === selectedCell` (przychodzi w `cell`)

### 2.5 Konsolidacja stałych

Usunąć duplikat `BOARD_ROWS`/`BOARD_COLS` z `components/Board/constants.ts` — importować z `constants/gameConstants.ts`. W `constants.ts` zostawić tylko `BORDER_CHARS`.

### Pliki dotknięte fazą 2

- **Nowy**: `components/Board/boardAdapter.ts`
- **Zmodyfikowane**: `components/Board/Board.tsx`, `components/Board/components/BoardRow.tsx`, `components/Board/components/BoardItem.tsx`, `components/Board/constants.ts`
- **Bez zmian**: `components/Board/components/Border.tsx`, `components/Board/index.ts`

---

## Faza 3 — Cleanup

### 3.1 Usunąć dead code

- `validation/validateFieldRange.ts` — nieużywane, `validateMove` robi range check inline. Usunąć plik i export z `validation/index.ts`.

### 3.2 Zaktualizować dokumentację

- Zaktualizować `docs/game-feature-analysis.md` aby odzwierciedlała nową strukturę (ViewModel, Data Adapter).

---

## Kolejność wykonania

1. **Faza 1** — MVVM (nie zmienia API `Game.tsx`, bezpieczne)
2. **Faza 2** — Data Adapter (zmienia wewnętrzne API Board, ale propsy `Board` z zewnątrz bez zmian)
3. **Faza 3** — Cleanup

Każda faza jest niezależna i może być testowana osobno.

---

## Architektura po refactorze

```text
┌─────────────────────────────────────────────────────────┐
│  Model:  t3core.Game (external store)                   │
│          useSettingsStore (global state)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  ViewModel:  useGameViewModel                            │
│  • gameState (useSyncExternalStore)                     │
│  • ui state (useReducer)                                │
│  • commands: makeMove, backToMove, navigate, reset...   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  Input Parser:  useGameInput                             │
│  • key → command routing (thin, no business logic)      │
└──────────────────────┬──────────────────────────────────┘
                       │ props (board, selectedCell, gameStatus...)
┌──────────────────────▼──────────────────────────────────┐
│  View:  Game.tsx + components/*                          │
│  • Board → toGrid() adapter → BoardRow → BoardItem      │
│  • GameStatus, PlayerPrompt, GameHint, GameInfo...      │
└─────────────────────────────────────────────────────────┘
```

### Kluczowe różnice vs stan obecny

- **`useGameInput`** — z 161 linii (fat hook) do ~40 linii (thin parser)
- **`useGameViewModel`** — nowy, testowalny w izolacji (bez Ink's `useInput`)
- **`Board`** — z imperatywnego `for`+`push` do deklaratywnego `.map()`
- **`BoardRow`** — nie wie o flat array, dostaje `CellViewModel[]`
- **`BoardItem`** — nie dostaje `selectedCell`, dostaje `isSelected: boolean`
- **Stałe** — jedno źródło prawdy dla `BOARD_ROWS`/`BOARD_COLS`
- **Dead code** — `validateFieldRange.ts` usunięte
