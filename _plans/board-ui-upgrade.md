# Board UI Upgrade — Unicode + Arrow Key Navigation

Upgrade planszy do Unicode box-drawing i zastąpienie wpisywania numeru nawigacją strzałkami + Enter, bez żadnych nowych zależności.

---

## Nowe paczki npm (propozycja)

### Do rozważenia teraz

| Paczka | Wersja | Rozmiar | Po co |
|--------|--------|---------|-------|
| `nanospinner` | `^1.1.0` | ~20 kB, 0 deps | Spinner podczas ładowania/resetu gry |

```
yarn add nanospinner
```

### Do rozważenia w przyszłości — pełny rebuild na `ink`

> **Notatka o `ink`** — React dla terminala ([github.com/vadimdemedes/ink](https://github.com/vadimdemedes/ink))
>
> Ink pozwala budować interaktywne CLI używając komponentów React + hooków. Używa **Yoga** (Flexbox engine od Meta) do layoutu.
> Używają go: Claude Code, Gemini CLI, GitHub Copilot CLI, Cloudflare Wrangler, Gatsby, Prisma, Shopify CLI.
>
> **Instalacja:** `npm install ink react`
>
> **Kluczowe API:**
>
> - `<Text color="green">` — kolorowanie tekstu (zastępuje `styledLabel.ts`)
> - `<Box flexDirection="column">` — layout Flexbox w terminalu
> - `useInput(handler)` — hook na klawisze (strzałki, Enter, q) — **zastąpiłby cały `arrowKeyInput.ts`**
> - `useFocus()` / `useFocusManager()` — focus między polami planszy
> - `useApp()` — `exit()` zamiast `process.exit(0)`
>
> **Co by oznaczało przepisanie na ink:**
>
> - Cały obecny kod UI (`Header.ts`, `Board.ts`, `MenuOptions.ts`, itd.) → komponenty React `.tsx`
> - `UserInput.ts` (readline) → `useInput` hook
> - `styledLabel.ts` → `<Text>` z props kolorów
> - `navigateTo` / routing → `useState` w root komponencie
> - Wymaga: zmiana `tsconfig.json` (JSX), dodanie `react` + `@types/react`, przepisanie `tsup.config.ts`
> - Projekt przechodzi z `"type": "commonjs"` na ESM (ink v5 jest ESM-only)
>
> **Wniosek:** Duży refactor (~całe `src/`), ale efekt: deklaratywny, testowalny UI z `ink testing library`.
> Warto rozważyć przy kolejnym major release (v2.0).

---

## Zakres zmian (obecny plan — bez ink)

### 2. Nawigacja strzałkami — nowy util `arrowKeyInput.ts`

Nowy plik: `src/features/game/components/PlayerEntry/utils/arrowKeyInput.ts`

Mechanizm (Node.js stdlib only):

1. `readline.emitKeypressEvents(process.stdin)`
2. `process.stdin.setRawMode(true)` — przechwytuje klawisze surowo
3. Listener na `keypress`:
   - `↑ ↓ ← →` — przesuwa kursor po siatce 3x3 (mod 3 dla wierszy/kolumn)
   - `Enter` / `Space` — zatwierdza wybrane pole
   - `q` — wróć do menu
   - `h` — historia (jeśli movesCount > 0)
4. Po każdym ruchu: `\x1b[{n}A` (move cursor up) + przerysowanie planszy z nowym podświetleniem
5. `process.stdin.setRawMode(false)` + cleanup po zatwierdzeniu

**Zwraca:** `Promise<number | null>` — ten sam interface co obecne `getPlayerAnswer`

---

### 3. Podmiana wejścia w `PlayerEntry.ts`

`getPlayerAnswer()` → `arrowKeyInput()` w `PlayerEntry.ts`.

Usunięcie tekstu "Select the number of the field (1-9)" — zastąpienie wskazówką: `"Use arrow keys, Enter to confirm"`.

**Pliki:** `src/features/game/components/PlayerEntry/PlayerEntry.ts`

---

### 4. Tryb fallback

Jeśli `settings.style === false` — zostaje obecna plansza tekstowa i wpisywanie numeru (bez raw mode).
Opcjonalnie: nowy toggle `settings.arrows` w `settings.global.ts`.

---

## Kolejność implementacji

1. `Board.ts` — Unicode rendering (wizualna zmiana, niezależna)
2. `arrowKeyInput.ts` — nowy util z raw mode + siatka 3x3
3. `PlayerEntry.ts` — podmiana callsite
4. Opcjonalnie: `settings.global.ts` + Settings toggle dla arrow mode

---

## Ryzyko / uwagi

- `setRawMode` nie działa w środowiskach bez TTY (CI, pipe) — wymagany guard `process.stdin.isTTY`
- Przerysowanie planszy w miejscu: używamy `\x1b[{n}A` zamiast `console.clear()` żeby nie flashować całego ekranu
- `closeInput()` z `UserInput.ts` zamyka globalny readline — trzeba upewnić się że raw mode nie koliduje z tym samym `process.stdin`
