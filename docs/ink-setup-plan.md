# Ink Setup Plan — Greenfield Rewrite

Setup infrastruktury dla Ink (React w terminalu) z nową strukturą feature-based w `src/`. Stary kod imperatywny przeniesiony do `src-legacy/`.

---

## Kontekst

Projekt `t3core-cli` to gra Tic Tac Toe w terminalu. Stary kod imperatywny (`console.log`, kody ANSI, `readline`, raw mode) został przeniesiony do `src-legacy/`. Nowy kod powstaje od zera w `src/` z użyciem Ink i React. `ink` (^7.1.0) i `react` (^19.2.7) są już w `dependencies`. Cel: skonfigurować infrastrukturę i strukturę plików dla nowej architektury Ink.

---

## Krok 1 — `tsconfig.json`: włączenie JSX

Dodać `"jsx": "react-jsx"` w `compilerOptions` oraz rozszerzyć `include` o pliki `.tsx`.

```jsonc
{
  "compilerOptions": {
    // ...istniejące...
    "jsx": "react-jsx"
  },
  "include": ["index.ts", "src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "tests/**/*.tsx", "vitest.config.mts"]
}
```

**Co się zmienia:** TypeScript kompiluje pliki `.tsx` z JSX. Dyrektywa `react-jsx` nie wymaga importu `React` w każdym pliku (automatic runtime).

---

## Krok 2 — `tsup.config.ts`: budowanie JSX

Tsup używa esbuild, który natywnie wspiera JSX. Należy upewnić się, że `loader` obsługuje `.tsx`. Dodać `loader: { ".tsx": "tsx" }` (esbuild domyślnie rozpoznaje, ale warto jawnie).

```ts
export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs"],
  target: "node16",
  clean: true,
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  loader: { ".tsx": "tsx" },
});
```

**Uwaga:** `entry` zostaje `index.ts` — nowy `index.ts` importuje z `src/app/` (Ink), nie z `src-legacy/`.

---

## Krok 3 — ESLint: wsparcie `.tsx` i React

### 3a. Rozszerzenie `files` o `.tsx`

W `eslint.config.mts` zmienić pattern `files`:

```ts
files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
```

### 3b. Dodanie pluginu React (opcjonalnie)

Zainstalować `eslint-plugin-react-hooks` dla sprawdzania hooków:

```bash
yarn add -D eslint-plugin-react-hooks
```

Dodać konfigurację dla plików `.tsx`:

```ts
{
  files: ["**/*.tsx"],
  plugins: { "react-hooks": reactHooks },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
}
```

---

## Krok 4 — Struktura plików `src/` (feature-based)

### Zasady

- **Feature-based** — każdy feature (menu, game, settings) jest samowystarczalny: własne komponenty, hooki, stałe, logika
- **Pliki `.tsx`** — komponenty React/Ink; **`.ts`** — logika, serwisy, typy, utils
- **`index.ts` w każdym feature** — barrel export, importuj przez `@/features/menu` nie `@/features/menu/MenuView`
- **Logika gry w `engine/`** — czysty TypeScript bez JSX, testowalna bez Ink
- **Hooki w `hooks/`** — separacja logiki od UI (`useGameEngine` vs `Board.tsx`)
- **`components/` na poziomie `src/`** — tylko współdzielone (Header, Footer, Spacer)
- **Brak `styledLabel.ts`, `rawMode.ts`, `inputService.ts`, `keyHandler.ts`** — Ink zarządza kolorami, raw mode i inputem natywnie

### Struktura

```text
src/
  app/
    App.tsx              # root komponent — routing, layout, stan nawigacji
    AppContext.tsx       # context provider (ustawienia, stan globalny)
    index.ts             # export App + render()

  features/
    menu/
      MenuView.tsx       # główny widok menu
      components/
        MenuOption.tsx   # pojedyncza opcja
        MenuList.tsx     # lista opcji (nawigacja strzałkami)
      hooks/
        useMenuNavigation.ts
      constants.ts       # opcje menu, etykiety
      index.ts

    game/
      GameView.tsx       # główny widok gry (kompozycja komponentów)
      components/
        Board.tsx        # plansza 3x3
        Cell.tsx         # pojedyncza komórka
        GameStatus.tsx   # czyja tura, wynik
        ScoreBoard.tsx   # tablica wyników
      hooks/
        useGameEngine.ts # logika gry (opakowuje t3core)
        useGameInput.ts  # obsługa klawiatury w grze
      engine/            # logika czysta (bez UI — testowalna osobno)
        gameEngine.ts
        types.ts
        t3coreAdapter.ts
      constants.ts       # symbole, kolory, layout planszy
      index.ts

    settings/
      SettingsView.tsx   # główny widok ustawień
      components/
        SettingsOption.tsx
        ToggleOption.tsx
      hooks/
        useSettings.ts   # odczyt/zapis ustawień
      constants.ts       # opcje ustawień
      index.ts

  components/             # współdzielone komponenty UI (Ink)
    Header/
      Header.tsx
      index.ts
    Footer/
      Footer.tsx
      index.ts
    Spacer/
      Spacer.tsx
      index.ts

  hooks/                  # współdzielone hooki
    useInput.ts          # wrapper useInput z Ink + mapowanie na NavKey
    useNavigation.ts     # routing hook (useState + routes)

  navigation/
    routes.ts            # definicja tras
    types.ts             # AppRoute, Routes

  services/              # logika biznesowa (bez UI)
    settings/
      settingsManager.ts
      index.ts

  utils/
    beep.ts
    clear.ts

  types/
    index.ts             # typy globalne, shared
```

### Wzorzec komponentu feature

```tsx
// features/menu/MenuView.tsx
import { Box, Text, useInput } from "ink";
import { useState } from "react";

import { useMenuNavigation } from "./hooks/useMenuNavigation";
import { MenuList } from "./components/MenuList";
import { MENU_OPTIONS } from "./constants";

type MenuViewProps = {
  onSelect: (route: AppRoute) => void;
};

export const MenuView = ({ onSelect }: MenuViewProps) => {
  const { selectedIndex, select, move } = useMenuNavigation(MENU_OPTIONS);

  useInput((input, key) => {
    if (key.upArrow) move(-1);
    if (key.downArrow) move(1);
    if (key.return) select(onSelect);
    if (input === "q") onSelect("exit");
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">Tic Tac Toe</Text>
      <MenuList options={MENU_OPTIONS} selectedIndex={selectedIndex} />
    </Box>
  );
};
```

---

## Krok 5 — Wzorzec renderowania Ink

Nowy `index.ts` renderuje `<App />` jako root. Routing zarządzany w React przez `useState`:

```tsx
// app/App.tsx
import { useState } from "react";
import { Box } from "ink";

import { MenuView } from "@/features/menu";
import { GameView } from "@/features/game";
import { SettingsView } from "@/features/settings";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ROUTES, type AppRoute } from "@/navigation/routes";

export const App = () => {
  const [route, setRoute] = useState<AppRoute>(ROUTES.MENU);

  if (route === "exit") {
    return null; // render() unmount -> process.exit w index.ts
  }

  return (
    <Box flexDirection="column">
      <Header />
      {route === ROUTES.MENU && <MenuView onSelect={setRoute} />}
      {route === ROUTES.GAME && <GameView onExit={setRoute} />}
      {route === ROUTES.SETTINGS && <SettingsView onExit={setRoute} />}
      <Footer />
    </Box>
  );
};
```

```ts
// index.ts
#!/usr/bin/env node
import { render } from "ink";
import React from "react";
import { App } from "./src/app";

const { waitUntilExit } = render(<App />);
waitUntilExit().then(() => process.exit(0));
```

**Kluczowe:** Jeden `render()` dla całej aplikacji. Routing przez stan React, nie przez pętlę `while`. Ink zarządza raw mode, cursor i re-render automatycznie.

---

## Krok 6 — `vitest.config.mts`: coverage na `.tsx`

Dodać `.tsx` do coverage include:

```ts
coverage: {
  include: ["src/**/*.ts", "src/**/*.tsx"],
  // ...
}
```

Testy komponentów Ink mogą używać `ink-testing-library`:

```bash
yarn add -D ink-testing-library
```

---

## Krok 7 — Typy: `@types/react`

Sprawdzić czy `@types/react` jest potrzebny. Ink v7 eksportuje własne typy, ale `@types/react` może być wymagany dla JSX w plikach `.tsx`:

```bash
yarn add -D @types/react
```

Jeśli `tsc --noEmit` po dodaniu JSX nie zgłasza błędów typów, ten krok można pominąć.

---

## Krok 8 — `package.json`: skrypty pomocnicze

Dodać skrypty ułatwiające pracę z Ink:

```jsonc
"scripts": {
  // ...istniejące...
  "dev:ink": "ts-node-dev -r tsconfig-paths/register --respawn --project tsconfig.json index.ts",
  "ts:check:tsx": "tsc --noEmit --listFiles | grep .tsx || echo 'No .tsx files yet'",
  "lint:tsx": "eslint src/**/*.tsx tests/**/*.tsx",
  "test:ink": "vitest run --testNamePattern='[Ii]nk'",
  "build:dev": "tsup --no-minify --sourcemap"
}
```

**Opis skryptów:**

- **`dev:ink`** — dev server z `ts-node-dev --respawn` (fast restart, nie HMR)
- **`ts:check:tsx`** — szybki check czy `.tsx` pliki są poprawnie wykrywane przez TypeScript
- **`lint:tsx`** — lint tylko plików `.tsx` (szybkie sprawdzanie komponentów Ink)
- **`test:ink`** — uruchomienie tylko testów zaczynających się od `Ink` (do testów komponentów Ink)
- **`build:dev`** — build bez minify z sourcemaps — ułatwia debugowanie Ink w terminalu

### Hot reload — uwaga

`ts-node-dev --respawn` to **fast restart**, nie hot reload (HMR). Przy zmianie pliku proces jest zabijany i uruchamiany od nowa (`console.clear()` + świeże `render()`). Dla aplikacji terminalowych z Ink to standardowe podejście — prawdziwy HMR nie jest praktyczny, bo Ink zarządza wyjściem terminala bezpośrednio.

**Co to oznacza:**

- Zmiana w komponencie → restart → powrót do ekranu startowego (menu)
- Stan React (`useState`) jest resetowany
- Działa szybko (1-2s), ale nie zachowuje stanu gry

**Alternatywa:** `tsup --watch` + `node --watch dist/index.js` (Node 18+ `--watch`) — też restart, ale przez wbudowany watcher Nodea.

---

## Podsumowanie zmian

| Plik | Zmiana |
|------|--------|
| `tsconfig.json` | `"jsx": "react-jsx"`, `include` += `*.tsx` |
| `tsup.config.ts` | `loader: { ".tsx": "tsx" }` |
| `eslint.config.mts` | `files` += `*.tsx`, plugin `react-hooks` |
| `package.json` | `+ eslint-plugin-react-hooks` (dev), `+ ink-testing-library` (dev), `+ @types/react` (dev, jeśli potrzebne), `+ skrypty pomocnicze` |
| `vitest.config.mts` | coverage `include` += `*.tsx` |

## Czego NIE robimy w tym setupie

- Nie tworzymy widoków (to osobne zadania) — tylko setup infrastruktury i struktura katalogów
- Nie usuwamy `src-legacy/` — zostaje jako referencja do przepisywania
- Nie zmieniamy `format: ["cjs"]` w tsup (Ink v7 wspiera CJS)

## Kolejność wykonania

1. `tsconfig.json` — JSX + `include` `.tsx`
2. `tsup.config.ts` — loader `.tsx`
3. `yarn add -D eslint-plugin-react-hooks ink-testing-library @types/react`
4. `eslint.config.mts` — `.tsx` + react-hooks
5. `vitest.config.mts` — coverage `.tsx`
6. `package.json` — skrypty pomocnicze
7. Utworzenie struktury katalogów `src/` (puste pliki + `index.ts` barrel exports)
8. `index.ts` — nowy punkt wejścia z `render(<App />)`
9. `yarn ts:check` — weryfikacja typów
10. `yarn build` — weryfikacja budowania
11. `yarn test:run` — weryfikacja testów
