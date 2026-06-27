# Plan implementacji testów

## Stan na czerwiec 2026

Plan został wdrożony. Refaktoryzacja DI została zakończona dla głównych komponentów, komend, walidatorów i serwisów key handlerów. Singletony pozostały tylko jako fallbacki w domyślnych parametrach. Testy obejmują wszystkie fazy planu, w tym utility `beepSound.ts` i `styledLabel.ts`.

## Wybór biblioteki

**Vitest** — zalecana biblioteka testowa.

### Dlaczego Vitest

- Natywna obsługa TypeScript bez dodatkowej konfiguracji (ts-jest).
- Szybki start i wykonanie testów.
- Wbudowany mocking (`vi.fn`, `vi.mock`, `vi.spyOn`).
- Wsparcie dla tsconfig paths (alias `@/`).
- Wbudowana coverage poprzez `@vitest/coverage-v8`.
- Społeczność i ekosystem zgodny z nowoczesnymi projektami TS/Vite/tsup.

## Struktura testów

```text
t3core-cli/
├── src/
│   └── features/...        # kod źródłowy
├── tests/
│   ├── unit/
│   │   ├── features/
│   │   │   ├── game/       # testy komponentów, walidatorów, komend gry
│   │   │   ├── settings/   # testy komponentów, komend, options ustawień
│   │   │   └── menu/       # testy menu
│   │   ├── services/       # testy serwisów nawigacji, key handlerów
│   │   └── utils/          # testy utility (tam gdzie sensowne)
│   ├── integration/          # testy widoków (GameView, SettingsView) z mockami
│   └── setup.ts              # globalny setup, np. mock console.log
└── vitest.config.mts
```

## Co testować i w jakiej kolejności

### Faza 1 — najłatwiejsze, największy zysk

1. **Walidatory gry** (`src/features/game/validation/`)
   - `validateFieldRange`, `validateSelectedField`, `validateInputEntry`.
   - Przekazać mock `GameStateManager` z `setInputError` i `historyMode`.
   - Przekazać mock `GameEngine` z `isFieldOccupied`.

2. **Settings options** (`src/features/settings/options/`)
   - `getSettingsOptionById`, `getSettingsOptionByPosition`.
   - `executeSettingsOption`, `executeSettingsOptionByPosition` z mock `SettingsManager`.

3. **SettingsOptions component** (`src/features/settings/components/SettingsOptions`)
   - Sprawdzić formatowanie linii dla różnych stanów `settings` i `activePosition`.
   - Zamockować `console.log`.

### Faza 2 — komendy i nawigacja

1. **Komendy gry** (`src/features/game/navigation/commands/`)
   - `SelectFieldCommand`, `ToggleHistoryCommand`, `ToggleInfoCommand`.
   - Mock `GameEngine` i `GameStateManager`.

2. **Komendy ustawień** (`src/features/settings/navigation/commands/`)
   - `ToggleSelectedSettingCommand` z mock `SettingsManager`.

3. **Nawigacja** (`gameNavigation`, `settingsNavigation`)
   - Testy `handleKey` z mock `NavigationController` lub mock key presses.

### Faza 3 — serwisy i widoki

1. **Serwisy key handlerów** (`createGameKeyHandlerService`, `createSettingsKeyHandlerService`)
   - Mock `SettingsManager`, `GameStateManager`, `GameManager`.
   - Sprawdzić start/stop na podstawie ustawień.

2. **Widoki** (`GameView`, `SettingsView`)
   - Testy integracyjne z zamockowanymi usługami wejścia/wyjścia.
   - Zamockować `console`, `inputService`, `keyHandlerService`, `navigationService`.

### Faza 4 — utility (opcjonalnie)

1. **`beepSound`**, **`styledLabel`** — zamockować `settingsManager` lub przekazać `settings` bezpośrednio, jeśli zdecydujesz się na DI.

## Konfiguracja Vitest

### Instalacja

```bash
yarn add -D vitest @vitest/coverage-v8 vite-tsconfig-paths
```

### Skrypty w `package.json`

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### Plik `vitest.config.mts`

```typescript
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/**/index.ts"],
    },
  },
});
```

### Setup `tests/setup.ts`

```typescript
import { vi } from "vitest";

// Tłumienie logów podczas testów; można włączyć przez zmianę flagi
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
```

## Przykładowy pierwszy test

`tests/unit/features/game/validation/validateFieldRange.test.ts`:

```typescript
import { describe, expect, it, vi } from "vitest";
import { validateFieldRange } from "@/features/game/validation/validateFieldRange";
import type { GameStateManager } from "@/features/game/services/gameState";

describe("validateFieldRange", () => {
  it("returns true for valid index", () => {
    const setInputError = vi.fn();
    const gameState = { setInputError } as unknown as GameStateManager;

    expect(validateFieldRange(5, 9, 1, gameState)).toBe(true);
    expect(setInputError).not.toHaveBeenCalled();
  });

  it("sets error and returns false for out of range index", () => {
    const setInputError = vi.fn();
    const gameState = { setInputError } as unknown as GameStateManager;

    expect(validateFieldRange(10, 9, 1, gameState)).toBe(false);
    expect(setInputError).toHaveBeenCalledWith(
      "Please enter a valid number (1-9) and press enter",
    );
  });
});
```

## Strategia mockowania

- **Managery stanu**: tworzyć lekkie obiekty z mockowanymi metodami (`vi.fn()`).
- **Silnik gry (`GameEngine`)**: mockować `getBoard`, `getStatus`, `isFieldOccupied`, `makeMove`, `backToMove`, `getMovesCount`, `isGameOver`, `reset`.
- **Serwisy wejścia/wyjścia**: mockować `waitForInput` z `inputService`.
- **Key handler services**: tworzyć ręcznie przez fabryki z mock managerów, bez uruchamiania prawdziwego nasłuchiwania klawiszy.
- **Singletony globalne**: w testach integracyjnych używać `vi.mock("@/services/settings", ...)`, żeby zamockować `settingsManager`.

## Konfiguracja projektu

Wprowadzone zmiany w plikach konfiguracyjnych:

- `tsconfig.json` — dodano `tests/**/*.ts` i `vitest.config.mts` do `include`.
- `eslint.config.mts` — dodano `globals.node` i `globals.vitest` do globalnych zmiennych.
- `package.json` — rozszerzono skrypt `lint` na `src tests vitest.config.mts`.
- `.fallowrc.json` — dodano `tests/**`, `vitest.config.mts`, `coverage/**`, `**/*.test.ts` do `ignorePatterns` oraz `vitest` i `@vitest/coverage-v8` do `ignoreDependencies`.

## Uruchamianie testów

```bash
yarn test:run         # jednorazowe uruchomienie
yarn test             # tryb watch
yarn test:coverage    # z raportem pokrycia
```

## Stan walidacji

- `yarn test:run` — 18 plików, 73 testy, wszystkie przechodzą.
- `yarn ts:check` — przechodzi.
- `yarn lint` — przechodzi.

## Pozostałe możliwości

- Dodać testy menu (`tests/unit/features/menu/`).
- Rozszerzyć testy widoków o scenariusze z wieloma iteracjami pętli.
- Uruchomić `yarn test:coverage` i przeanalizować braki w pokryciu.
