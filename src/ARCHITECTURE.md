# Architektura projektu t3core-cli

## Przegląd

`t3core-cli` to interaktywna aplikacja CLI do gry w kółko i krzyżyk, zbudowana w TypeScript. Projekt wykorzystuje architekturę opartą na cechach (feature-based architecture) z wyraźnym podziałem odpowiedzialności.

---

## Struktura katalogów

```text
src/
├── app.ts              # Główny punkt wejścia aplikacji
├── components/         # Współdzielone komponenty UI
│   └── Header/         # Nagłówek aplikacji
├── features/           # Moduły funkcjonalne (feature-based)
│   ├── game/           # Logika gry
│   ├── menu/           # Menu główne
│   └── settings/       # Ustawienia
├── global/             # Globalne stałe i konfiguracja
│   ├── navigationKeys.ts
│   └── tty.global.ts
├── navigation/         # System nawigacji między ekranami
│   ├── renderRoute.ts
│   └── routes.ts
├── screens/            # Screen wrappers (adaptery między navigation a features)
│   ├── Game.screen.ts
│   ├── Menu.screen.ts
│   └── Settings.screen.ts
├── services/           # Współdzielone serwisy
│   ├── inputService/
│   ├── keyHandlerService/
│   └── settings/
└── utils/              # Narzędzia pomocnicze
    ├── beepAndClear.ts
    ├── beepSound.ts
    ├── rawMode.ts
    ├── styledLabel.ts
    └── viewUtils.ts
```

---

## Konwencje architektoniczne

### 1. Feature-Based Organization

Każda funkcjonalność (gra, menu, ustawienia) ma własny folder w `features/` zawierający:

```text
features/[feature]/
├── [feature].ts          # Główny plik widoku (exportuje *View)
├── components/           # Komponenty specyficzne dla funkcji
│   └── [Component]/
│       ├── [Component].ts
│       └── index.ts      # Barreled export
├── constants/            # Stałe specyficzne dla funkcji
├── services/             # Serwisy specyficzne dla funkcji
├── util/                 # Narzędzia specyficzne dla funkcji
└── validation/           # Walidatory (opcjonalnie)
```

### 2. Screen Pattern

Warstwa `screens/` działa jako adapter między systemem nawigacji a funkcjonalnościami:

```typescript
// screens/Game.screen.ts
export const GameScreen = async (): Promise<AppRoute> => {
  return GameView();  // Delegacja do feature
};
```

Zalety:

- **Loose coupling** – nawigacja nie zależy bezpośrednio od implementacji
- **Testability** – można mockować widoki
- **Consistency** – wszystkie ekrany mają ten sam interfejs

### 3. Route- constants jako Single Source of Truth

```typescript
// navigation/routes.ts
export const ROUTES = {
  MENU: "menu",
  GAME: "game",
  SETTINGS: "settings",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
export type AppRoute = Routes | "exit";
```

Wykorzystanie `as const` zapewnia:

- Type safety przy nawigacji
- Autocomplete w IDE
- Refactoring safety

### 4. Component Naming Conventions

- **Widoki**: `[Feature]View` – funkcje asynchroniczne zwracające `AppRoute`
- **Komponenty UI**: `[Nazwa]` – funkcje renderujące (bez prefixu)
- **Komponenty wejścia**: `[Feature]Entry` – obsługa inputu użytkownika
- **Komponenty nagłówka**: `[Feature]Header` – nagłówki sekcji
- **Screeny**: `[Feature].screen.ts` – wrappery nawigacyjne

### 5. Export Patterns

**Barreled exports** dla komponentów:

```typescript
// components/Header/index.ts
export * from "./Header";
```

**Named exports** dla głównych funkcjonalności:

```typescript
// features/game/game.ts
export const GameView = async (): Promise<AppRoute> => { ... };
```

### 6. Path Aliases

Konfiguracja `@/` jako aliasu do `src/`:

```json
// tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

Zastosowanie:

```typescript
import { ROUTES } from "@/navigation/routes";
import { ArrowKeyInstance } from "@/services/keyHandlerService/navInstances/arrowKeyInstance";
```

Zalety:

- Unikanie `../../../` hell
- Refactoring safety
- Czytelniejsze importy

---

## System nawigacji

### Router prosty (switch-based)

```typescript
// navigation/renderRoute.ts
export const renderRoute = async (route: Routes): Promise<AppRoute> => {
  switch (route) {
    case ROUTES.MENU:
      return MenuScreen();
    case ROUTES.GAME:
      return GameScreen();
    case ROUTES.SETTINGS:
      return SettingsScreen();
    default:
      throw new Error(`Unknown route: ${route satisfies never}`);
  }
};
```

### Pętla aplikacji

```typescript
// app.ts
export const app = async () => {
  let currentRoute: AppRoute = ROUTES.GAME;

  while (currentRoute !== "exit") {
    beepAndDeepClear();
    Header();
    currentRoute = await renderRoute(currentRoute);
  }
  // ... cleanup
};
```

---

## System wejścia/klawiatury

### KeyHandler – klasa zarządzająca klawiaturą

```typescript
export class KeyHandler {
  constructor(options: KeyHandlerOptions)
  start(): boolean
  stop(): void
  waitForKeyPress(): Promise<number | string | null>
  get position()
  get running()
}
```

Cechy:

- **Raw mode** – natychmiastowe przechwytywanie klawiszy
- **Promise-based** – async/await zamiast callbacków
- **Cleanup** – automatyczne sprzątanie listenerów
- **Position tracking** – śledzenie pozycji nawigacji

### Singleton instances

```typescript
// services/keyHandlerService/navInstances/arrowKeyInstance.ts
export const ArrowKeyInstance = {
  set: (options: KeyHandlerOptions): KeyHandler | null => { ... },
  get: (): KeyHandler | null => { ... },
  clear: (): void => { ... },
};
```

---

## Konwencje TypeScript

### 1. Strict Type Safety

```json
// tsconfig.json
"strict": true,
"forceConsistentCasingInFileNames": true
```

### 2. Type-only imports

```typescript
import type { KeyHandler } from "@/services/keyHandlerService";
import type { AppRoute } from "@/navigation/routes";
```

Wymuszane przez ESLint:

```typescript
"@typescript-eslint/consistent-type-imports": [
  "error",
  { prefer: "type-imports", fixStyle: "separate-type-imports" }
]
```

### 3. Exhaustive switch

```typescript
default:
  throw new Error(`Unknown route: ${route satisfies never}`);
```

Użycie `satisfies never` gwarantuje exhaustiveness checking.

---

## Konwencje ESLint

### Używane pluginy

- **typescript-eslint** – reguły TS
- **import-x** – organizacja importów, detekcja cykli
- **perfectionist** – sortowanie importów alfabetycznie

### Kluczowe reguły

```typescript
"perfectionist/sort-imports": ["error", {
  type: "alphabetical",
  order: "asc",
  newlinesBetween: 1,
  groups: [
    "type-import",
    ["value-builtin", "value-external"],
    "value-internal",
    ["value-parent", "value-sibling", "value-index"],
    "side-effect",
    "unknown",
  ],
}]

"import-x/no-cycle": ["error", { ignoreExternal: true, maxDepth: 10 }]
```

### Grupy importów (kolejność)

1. **Type imports** – `import type { ... }`
2. **Built-in + External** – `readline`, `t3core`
3. **Internal (@/)** – `@/navigation/routes`
4. **Relative** – `../components/Board`
5. **Side effects** – `import "./styles.css"`

---

## Konwencje stylizacji UI

### StyledLabel (utility)

```typescript
// utils/styledLabel.ts
export const s = {
  grey: { bold: (text: string) => ... },
  yellowBright: { bold: (text: string) => ... },
  blueBright: (text: string) => ...,
  inverse: (text: string) => ...,
  // ... ANSI colors
};
```

Użycie:

```typescript
const itemNumber = s.yellowBright.bold(item.id);
const itemLabel = s.blueBright(item.label);
```

---

## Podsumowanie konwencji

| Aspekt | Konwencja |
| ------ | --------- |
| **Architektura** | Feature-based + Layered (screens/services/utils) |
| **Nawigacja** | Route constants + Switch router + Screen adapters |
| **Komponenty** | Funkcje renderujące, barreled exports |
| **Importy** | Path aliases `@/`, sortowanie alfabetyczne, type imports |
| **Wejście** | KeyHandler class + Singleton instances |
| **Typy** | Strict mode, exhaustiveness checking, `as const` |
| **Styl** | ESLint + perfectionist, konsystentna organizacja importów |

---

## Zalety tej architektury

1. **Skalowalność** – łatwo dodawać nowe funkcjonalności w osobnych folderach
2. **Testability** – wyraźne granice między warstwami
3. **Maintainability** – konsekwentne konwencje ułatwiają onboardingu
4. **Type Safety** – exhaustiveness checking, strict mode
5. **DX** – path aliases, IDE autocomplete, ESLint perfectionist

---

## Wzorce projektowe – Analiza i Propozycje

## 1. Stan gry (Game State) – Obecna implementacja

### Aktualna implementacja kodu

```typescript
// features/game/services/gameSession.ts
let game: Game | null = null;

export const getGame = () => {
  if (!game) {
    game = new Game();
  }
  return game;
};

export const setGame = (newGame: Game) => {
  game = newGame;
};

export const clearGame = () => {
  game = null;
};

export const resetGame = () => {
  getGame().reset();
};
```

### Zdiagnozowane problemy architektoniczne

- **Brak kontroli cyklu życia** – gra jest singletonem przez przypadek, nie przez projekt
- **Trudność w testowaniu** – globalna zmienna stanowa utrudnia mockowanie
- **Brak izolacji sesji** – niemożliwe prowadzenie wielu gier równocześnie
- **Brak walidacji stanu** – nie ma ograniczeń kiedy można wywołać `resetGame()`

### Propozycja rozwiązania: Factory Pattern + State Machine

```typescript
// features/game/services/gameSession.ts
export type GameStatus = "idle" | "playing" | "paused" | "finished";

interface GameSession {
  id: string;
  game: Game;
  status: GameStatus;
  createdAt: Date;
}

export class GameSessionFactory {
  private static sessions = new Map<string, GameSession>();
  private static activeSessionId: string | null = null;

  static create(): GameSession {
    const session: GameSession = {
      id: crypto.randomUUID(),
      game: new Game(),
      status: "idle",
      createdAt: new Date(),
    };
    this.sessions.set(session.id, session);
    this.activeSessionId = session.id;
    return session;
  }

  static getActive(): GameSession | null {
    if (!this.activeSessionId) return null;
    return this.sessions.get(this.activeSessionId) ?? null;
  }

  static setActive(sessionId: string): boolean {
    if (!this.sessions.has(sessionId)) return false;
    this.activeSessionId = sessionId;
    return true;
  }

  static transition(status: GameStatus): boolean {
    const session = this.getActive();
    if (!session) return false;
    
    const validTransitions: Record<GameStatus, GameStatus[]> = {
      idle: ["playing"],
      playing: ["paused", "finished"],
      paused: ["playing"],
      finished: ["idle"],
    };

    if (!validTransitions[session.status].includes(status)) {
      return false;
    }

    session.status = status;
    return true;
  }

  static reset(): void {
    const session = this.getActive();
    if (session?.status === "finished") {
      session.game.reset();
      this.transition("idle");
    }
  }

  static destroy(sessionId?: string): void {
    const id = sessionId ?? this.activeSessionId;
    if (id) {
      this.sessions.delete(id);
      if (this.activeSessionId === id) {
        this.activeSessionId = null;
      }
    }
  }
}
```

### Korzyści z zastosowania wzorca

- **Świadomy singleton** – jawna kontrola nad aktywną sesją
- **Maszyna stanów** – walidacja przejść między stanami
- **Wsparcie dla wielu sesji** – Map przechowuje historię gier
- **Testowalność** – można injectować zależności, mockować `Game`

---

## 2. Nawigacja – Analiza

### Nawigacja – aktualna implementacja kodu

```typescript
// navigation/renderRoute.ts
export const renderRoute = async (route: Routes): Promise<AppRoute> => {
  switch (route) {
    case ROUTES.MENU:
      return MenuScreen();
    case ROUTES.GAME:
      return GameScreen();
    case ROUTES.SETTINGS:
      return SettingsScreen();
    default:
      throw new Error(`Unknown route: ${route satisfies never}`);
  }
};

// app.ts
export const app = async () => {
  let currentRoute: AppRoute = ROUTES.GAME;
  while (currentRoute !== "exit") {
    beepAndDeepClear();
    Header();
    currentRoute = await renderRoute(currentRoute);
  }
};
```

### Nawigacja – zdiagnozowane problemy

- **Łamanie OCP** – dodanie nowej trasy wymaga modyfikacji switcha
- **Brak parametetrów** – nie można przekazywać danych między ekranami
- **Brak middleware** – brak miejsca na guards, analytics, logging
- **Brak historii** – nie ma wsparcia dla "wstecz"

### Propozycja rozwiązania: Strategy Pattern + Router Registry

```typescript
// navigation/types.ts
export type RouteHandler = (params?: RouteParams) => Promise<AppRoute>;
export type RouteParams = Record<string, unknown>;

export interface RouteConfig {
  path: Routes;
  handler: RouteHandler;
  beforeEnter?: (params?: RouteParams) => boolean | Promise<boolean>;
  afterLeave?: (result: AppRoute) => void;
}

// navigation/router.ts
export class Router {
  private routes = new Map<Routes, RouteConfig>();
  private history: Routes[] = [];
  private guards: Array<(from: Routes, to: Routes) => boolean> = [];

  register(config: RouteConfig): void {
    this.routes.set(config.path, config);
  }

  useGuard(guard: (from: Routes, to: Routes) => boolean): void {
    this.guards.push(guard);
  }

  async navigate(to: Routes, params?: RouteParams): Promise<AppRoute> {
    const route = this.routes.get(to);
    if (!route) throw new Error(`Route ${to} not registered`);

    const from = this.history[this.history.length - 1];

    // Run guards
    for (const guard of this.guards) {
      if (!guard(from, to)) return from ?? ROUTES.MENU;
    }

    // Before enter hook
    if (route.beforeEnter) {
      const canEnter = await route.beforeEnter(params);
      if (!canEnter) return from ?? ROUTES.MENU;
    }

    this.history.push(to);
    const result = await route.handler(params);
    
    route.afterLeave?.(result);
    
    return result;
  }

  back(): Routes | null {
    if (this.history.length < 2) return null;
    this.history.pop();
    return this.history[this.history.length - 1];
  }
}

// navigation/registry.ts
export const router = new Router();

router.register({
  path: ROUTES.GAME,
  handler: GameScreen,
  beforeEnter: () => GameSessionFactory.getActive() !== null,
});

router.register({
  path: ROUTES.MENU,
  handler: MenuScreen,
});

router.register({
  path: ROUTES.SETTINGS,
  handler: SettingsScreen,
});

// Usage in app.ts
export const app = async () => {
  let currentRoute: AppRoute = ROUTES.GAME;

  while (currentRoute !== "exit") {
    beepAndDeepClear();
    Header();
    currentRoute = await router.navigate(currentRoute);
  }
};
```

### Nawigacja – korzyści z zastosowania wzorca

- **OCP (Open/Closed Principle)** – nowe trasy bez modyfikacji routera
- **Middleware** – guards i hooks wstrzykiwane deklaratywnie
- **Historia** – wsparcie dla nawigacji wstecz
- **Przekazywanie danych** – `RouteParams` pozwala na state transfer

---

## 3. Ustawienia – Analiza

### Ustawienia – aktualna implementacja kodu

```typescript
// services/settings/settings.ts
let settings = { ...initialSettings };

export const getSettings = () => {
  if (!settings.style) {
    return { ...settings, arrowKeyNavigation: false };
  }
  return settings;
};

export const toggleBeep = () => {
  settings.beep = !settings.beep;
};

export const toggleStyle = () => {
  settings.style = !settings.style;
};
```

### Ustawienia – zdiagnozowane problemy

- **Mutacje globalne** – każdy może zmienić stan bez śladu
- **Brak reaktywności** – komponenty nie wiedzą o zmianach
- **Brak persystencji** – ustawienia znikają po restarcie
- **Brak walidacji** – nie ma constraintów na wartości

### Propozycja rozwiązania: Singleton + Observer + Memento

```typescript
// services/settings/settingsStore.ts
type SettingsListener = (settings: Settings, prev: Settings) => void;

export class SettingsStore {
  private static instance: SettingsStore;
  private settings: Settings;
  private listeners = new Set<SettingsListener>();
  private history: Settings[] = [];
  private historyIndex = -1;
  private maxHistory = 10;

  static getInstance(): SettingsStore {
    if (!this.instance) {
      this.instance = new SettingsStore();
    }
    return this.instance;
  }

  private constructor() {
    this.settings = this.loadFromStorage() ?? { ...initialSettings };
  }

  get(): Readonly<Settings> {
    return Object.freeze({ ...this.settings });
  }

  update<K extends keyof Settings>(key: K, value: Settings[K]): boolean {
    const prev = { ...this.settings };
    
    // Validation
    if (!this.validate(key, value)) return false;

    this.settings = { ...this.settings, [key]: value };
    
    // Save to history for undo
    this.saveToHistory(prev);
    
    // Persist
    this.persist();
    
    // Notify
    this.listeners.forEach((fn) => fn(this.settings, prev));
    
    return true;
  }

  toggle<K extends keyof Settings>(key: K): boolean {
    const current = this.settings[key];
    if (typeof current !== "boolean") return false;
    return this.update(key, !current as Settings[K]);
  }

  subscribe(listener: SettingsListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  undo(): boolean {
    if (this.historyIndex <= 0) return false;
    this.historyIndex--;
    this.settings = { ...this.history[this.historyIndex] };
    this.persist();
    return true;
  }

  private validate<K extends keyof Settings>(key: K, value: Settings[K]): boolean {
    const validators: Record<keyof Settings, (v: unknown) => boolean> = {
      beep: (v) => typeof v === "boolean",
      style: (v) => typeof v === "boolean",
      arrowKeyNavigation: (v) => typeof v === "boolean" && (this.settings.style || !v),
    };
    return validators[key]?.(value) ?? false;
  }

  private saveToHistory(snapshot: Settings): void {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(snapshot);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    this.historyIndex = this.history.length - 1;
  }

  private persist(): void {
    try {
      localStorage.setItem("t3core_settings", JSON.stringify(this.settings));
    } catch {
      // Fail silently in environments without localStorage
    }
  }

  private loadFromStorage(): Settings | null {
    try {
      const stored = localStorage.getItem("t3core_settings");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}

// Hook-like usage in components
const settings = SettingsStore.getInstance();

export const useSettings = () => {
  const [localSettings, setLocalSettings] = useState(settings.get());
  
  useEffect(() => {
    return settings.subscribe((newSettings) => {
      setLocalSettings(newSettings);
    });
  }, []);
  
  return {
    settings: localSettings,
    toggle: settings.toggle.bind(settings),
    update: settings.update.bind(settings),
    undo: settings.undo.bind(settings),
  };
};
```

### Ustawienia – korzyści z zastosowania wzorca

- **Singleton** – jedna źródło prawdy o ustawieniach
- **Observer** – komponenty reagują na zmiany automatycznie
- **Memento** – undo/redo historii zmian
- **Walidacja** – constraint logic przed modyfikacją
- **Persystencja** – automatyczny zapis do storage

---

## 4. Stan gry lokalny (UI State) – Analiza

### UI State – aktualna implementacja kodu

```typescript
// features/game/services/gameState.ts
export const gameState = new Proxy<GameState>(gameStateDefault, {
  get(target, prop: keyof GameState) {
    if (prop === "toggleState") {
      return (key: ToggleableKeys) => {
        target[key] = !target[key];
      };
    }
    if (prop === "reset") {
      return () => {
        target.historyMode = false;
        target.info = false;
        target.inputError = null;
      };
    }
    return target[prop];
  },
  set(target, prop: keyof GameState, value: string | undefined) {
    if (prop === "inputError") {
      target.inputError = value;
      return true;
    }
    return false;
  },
});
```

### UI State – zdiagnozowane problemy

- **Proxy jest nadmiarowe** – prosty state nie potrzebuje takiej elastyczności
- **Brak typowego interfejsu** – `toggleState` i `reset` są metodami przez Proxy
- **Trudny do debugowania** – Proxy utrudnia stack traces
- **Brak kompozycji** – jeden duży obiekt zamiast mniejszych store'ów

### Propozycja rozwiązania: State Pattern + Store Composition

```typescript
// features/game/stores/infoStore.ts
import { SettingsStore } from "@/services/settings/settingsStore";

interface InfoState {
  isVisible: boolean;
  toggle(): void;
  show(): void;
  hide(): void;
}

export const createInfoStore = (): InfoState => {
  let isVisible = false;
  const settings = SettingsStore.getInstance();

  return {
    get isVisible() { return isVisible; },
    toggle: () => { isVisible = !isVisible; },
    show: () => { isVisible = true; },
    hide: () => { isVisible = false; },
  };
};

// features/game/stores/historyStore.ts
interface HistoryState {
  isEnabled: boolean;
  moves: string[];
  toggle(): void;
  recordMove(move: string): void;
  clear(): void;
}

export const createHistoryStore = (): HistoryState => {
  let isEnabled = false;
  const moves: string[] = [];

  return {
    get isEnabled() { return isEnabled; },
    get moves() { return [...moves]; },
    toggle: () => { isEnabled = !isEnabled; },
    recordMove: (move) => { if (isEnabled) moves.push(move); },
    clear: () => { moves.length = 0; },
  };
};

// features/game/stores/errorStore.ts
interface ErrorState {
  message: string | null;
  set(message: string | null): void;
  clear(): void;
}

export const createErrorStore = (): ErrorState => {
  let message: string | null = null;

  return {
    get message() { return message; },
    set: (msg) => { message = msg; },
    clear: () => { message = null; },
  };
};

// features/game/stores/gameUIStore.ts – kompozycja
export class GameUIStore {
  info = createInfoStore();
  history = createHistoryStore();
  error = createErrorStore();

  reset(): void {
    this.info.hide();
    this.history.clear();
    this.error.clear();
  }
}

// Usage
const uiStore = new GameUIStore();
uiStore.info.toggle();
uiStore.error.set("Invalid move");
```

### UI State – korzyści z zastosowania wzorca

- **Kompozycja** – małe, testowalne store'y zamiast jednego Proxy
- **Czytelność** – jawne metody zamiast magii Proxy
- **Izolacja** – każdy store zarządza jednym aspektem UI
- **Debugowalność** – normalne stack traces, brak Proxy traps

---

## Podsumowanie rekomendacji

| Komponent     | Obecny wzorzec     | Zalecany wzorzec                   | Priorytet |
| ------------- | ------------------ | ---------------------------------- | --------- |
| Game Session  | Global variable    | **Factory + State Machine**        | Wysoki    |
| Navigation    | Switch statement   | **Strategy + Registry**            | Średni    |
| Settings      | Module exports     | **Singleton + Observer + Memento** | Wysoki    |
| Game UI State | Proxy              | **State Pattern + Composition**    | Średni    |

### Kolejność implementacji

1. **Settings Store** – najbardziej izolowane, największy wpływ UX
2. **Game Session Factory** – poprawia testowalność całej aplikacji
3. **Game UI Stores** – refactoring lokalny, nie wpływa na inne moduły
4. **Router Registry** – najbardziej globalna zmiana, wymaga koordynacji
