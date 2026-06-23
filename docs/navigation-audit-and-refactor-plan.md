# Audyt Nawigacji I Plan Refaktoryzacji

## Zakres

Dokument opisuje audyt obecnej logiki wejścia i nawigacji w:

- `src/services/inputService/`
- `src/services/keyHandlerService/`
- powiązanych handlerach w `features/game` i `features/settings`

Celem jest uporządkowanie odpowiedzialności, opisanie wzorca **Strategy + Command** oraz przygotowanie bezpiecznego planu wdrożenia bez dużego rewrite'u.

## Status Wdrożenia

Plan został wdrożony. Aktualna architektura używa:

- `keyNormalizer` do normalizacji surowych klawiszy z `readline`,
- `NavigationStrategy` dla ruchu po planszy i liście,
- `KeyCommand` dla akcji klawiszy,
- bezstanowego `NavigationController`,
- `gameNavigation` i `settingsNavigation` jako feature-level punktów składania nawigacji,
- `inputService` jako centralnego miejsca zarządzania `readline` i raw mode.

Pozycja nawigacji jest obecnie zawsze liczbą. Adaptery `gameKeyHandler.ts` i `settingsKeyHandler.ts` zostały usunięte, a feature-serwisy podpinają `gameNavigation.handleKey` i `settingsNavigation.handleKey` bezpośrednio do `KeyHandler`.

## Obecny Stan

Aktualna obsługa wejścia jest podzielona na dwa główne mechanizmy:

- `inputService` obsługuje klasyczne wejście tekstowe przez `readline.question()`.
- `KeyHandler` obsługuje pojedyncze klawisze w raw mode przez `process.stdin` i event `keypress`.

Feature'y korzystają z tego tak:

- `gameKeyHandlerService` tworzy singleton `KeyHandler` dla planszy gry.
- `settingsKeyHandlerService` tworzy singleton `KeyHandler` dla ekranu ustawień.
- `gameNavigation` i `settingsNavigation` zawierają właściwą konfigurację strategii oraz komend.

Obecny układ działa, ale odpowiedzialności są miejscami wymieszane.

## Audyt

### 1. `KeyHandler` Ma Za Dużo Wiedzy O Nawigacji

`KeyHandler` powinien być adapterem terminala: start, stop, raw mode, listener klawiatury, cleanup.

Pierwotnie dodatkowo:

- przechowuje `position`,
- resetuje pozycję,
- przekazuje samego siebie do callbacka,
- oczekuje, że callback zwróci nową pozycję albo komendę tekstową.

To powodowało, że logika domenowa gry znała szczegóły infrastruktury wejścia, np. mogła wołać `handler.resetPosition()` albo sprawdzać `handler.running`.

Docelowo `KeyHandler` powinien wiedzieć tylko tyle:

```txt
key pressed -> normalized key -> callback
```

Nie powinien wiedzieć, czy pozycja oznacza pole planszy, pozycję w settingsach, wyjście z widoku, historię ruchów albo akcję gry.

Status: częściowo uproszczone. `KeyHandler` nadal przechowuje pozycję, bo jest ona częścią obecnego flow widoków, ale nie zna strategii ani komend domenowych. Surowy klawisz jest normalizowany przed przekazaniem do callbacka.

### 2. `inputService` I `KeyHandler` Konkurują O `stdin`

`inputService` tworzy globalny `readline.Interface`, a `KeyHandler` przełącza `process.stdin` w raw mode.

Pierwotnie po zatrzymaniu `KeyHandler` feature-serwisy wołały `refreshInput()`, żeby odtworzyć `readline.Interface`.

Takie rozwiązanie działało, ale było kruche, bo zarządzanie trybem terminala było rozproszone:

- `inputService` zarządza `readline`,
- `KeyHandler` zarządza raw mode,
- feature-serwisy wiedziały, że po `stop()` trzeba zrobić `refreshInput()`.

Lepszym kierunkiem jest centralny serwis wejścia terminalowego, który kontroluje oba tryby.

Status: wdrożone. `inputService` udostępnia `startKeyInput()` i `stopKeyInput()`, a feature-serwisy nie wołają już ręcznie `refreshInput()`.

### 3. Typ `ReadlineKey` Jest Zbyt Optymistyczny

Pierwotny typ zakładał, że `key.name` zawsze jest jedną z wartości `NavKey`.

W runtime `readline.Key.name` może być:

- `undefined`,
- dowolnym stringiem spoza `NAV_KEYS`,
- wartością zależną od terminala.

Bezpieczniej jest przyjąć szerszy typ wejściowy i normalizować go do `NavKey | null`.

Przykładowy kierunek:

```ts
type RawReadlineKey = Omit<readline.Key, "name"> & {
  name?: string;
};

const normalizeKey = (key: RawReadlineKey): NavKey | null => {
  // mapowanie tylko znanych klawiszy
};
```

Status: wdrożone. `normalizeReadlineKey()` odrzuca nieznane klawisze i zwraca `ReadlineKey | null`.

### 4. `waitForKeyPress()` Może Zostawić Nierozwiązany Promise

Pierwotnie `waitForKeyPress()` przechowywało jeden resolver. Jeśli metoda została wywołana drugi raz przed następnym klawiszem, poprzedni Promise mógł zostać zgubiony.

Jeśli `stop()` nastąpił podczas oczekiwania na klawisz, Promise również mógł pozostać nierozwiązany.

Obecny kod rozwiązuje aktywne oczekiwanie jawnie, więc API nie zostawia oczekujących Promise'ów w tych scenariuszach.

Docelowo warto:

- blokować drugie oczekiwanie, jeśli jedno już trwa,
- albo rozwiązywać poprzednie oczekiwanie przy `stop()`,
- albo uprościć API i zamiast `waitForKeyPress()` emitować wynik przez kontroler nawigacji.

Status: wdrożone. Drugie oczekiwanie rozwiązuje poprzedni Promise, `stop()` rozwiązuje aktywne oczekiwanie wartością `null`, a wywołanie `waitForKeyPress()` przy zatrzymanym handlerze również zwraca rozwiązany Promise.

### 5. Logika Ruchu I Akcji Jest Wymieszana

Pierwotnie w `gameKeyHandler` w jednym miejscu działy się różne rzeczy:

- obliczanie pozycji na planszy 3x3,
- obsługa Enter/Space,
- zapis ruchu gracza,
- reset pozycji po zakończeniu gry,
- obsługa akcji `q`, `escape`, `backspace`, `h`, `i`.

Pierwotnie w `settingsKeyHandler` podobnie:

- ruch po liście,
- wyjście,
- przełączanie ustawień.

To są różne odpowiedzialności:

- ruch kursora to strategia nawigacji,
- akcja po klawiszu to komenda.

Status: wdrożone. Ruch jest w strategiach, akcje są w komendach, a adaptery `gameKeyHandler.ts` i `settingsKeyHandler.ts` zostały usunięte.

## Rekomendowany Wzorzec: Strategy + Command

### Strategy

**Strategy** służy do wymiany algorytmu bez zmieniania kodu, który tego algorytmu używa.

W tej aplikacji strategia odpowiada na pytanie:

> Jak zmienić pozycję po naciśnięciu klawisza nawigacyjnego?

Przykłady strategii:

- `GridNavigationStrategy` dla planszy 3x3.
- `ListNavigationStrategy` dla settingsów albo menu.

Wspólny kontrakt:

```ts
export type NavigationPosition = number;

export type NavigationStrategy = {
  move(position: NavigationPosition, key: NavKey): NavigationPosition;
};
```

Przykład strategii dla planszy:

```ts
export class GridNavigationStrategy implements NavigationStrategy {
  constructor(
    private readonly rows: number,
    private readonly cols: number,
  ) {}

  move(position: number, key: NavKey): number {
    const row = Math.floor(position / this.cols);
    const col = position % this.cols;

    let nextRow = row;
    let nextCol = col;

    if (key === NAV_KEYS.UP) nextRow = (row - 1 + this.rows) % this.rows;
    if (key === NAV_KEYS.DOWN) nextRow = (row + 1) % this.rows;
    if (key === NAV_KEYS.LEFT) nextCol = (col - 1 + this.cols) % this.cols;
    if (key === NAV_KEYS.RIGHT) nextCol = (col + 1) % this.cols;

    return nextRow * this.cols + nextCol;
  }
}
```

Przykład strategii dla listy:

```ts
export class ListNavigationStrategy implements NavigationStrategy {
  constructor(
    private readonly min: number,
    private readonly max: number,
  ) {}

  move(position: number, key: NavKey): number {
    if (key === NAV_KEYS.UP) return Math.max(this.min, position - 1);
    if (key === NAV_KEYS.DOWN) return Math.min(this.max, position + 1);

    return position;
  }
}
```

### Command

**Command** opakowuje akcję wykonywaną po konkretnym klawiszu.

W tej aplikacji komenda odpowiada na pytanie:

> Czy ten klawisz powinien wykonać akcję, a jeśli tak, co ma się stać?

Przykłady komend:

- `QuitCommand`
- `SelectFieldCommand`
- `ToggleHistoryCommand`
- `ToggleInfoCommand`
- `ToggleSelectedSettingCommand`

Wspólny kontrakt:

```ts
export type NavigationResult = NavigationPosition | NavKey | null;

export interface KeyCommand {
  canHandle(key: NavKey): boolean;
  execute(position: NavigationPosition): NavigationResult;
}
```

Przykład komendy wyjścia:

```ts
export class QuitCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return isExitKey(key);
  }

  execute(): NavKey {
    return NAV_KEYS.Q;
  }
}
```

Przykład komendy wyboru pola:

```ts
export class SelectFieldCommand implements KeyCommand {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER || key === NAV_KEYS.SPACE;
  }

  execute(position: number): number | null {
    const game = getGame();

    if (game.gameStatus.status !== "running") {
      return INITIAL_BOARD_POSITION;
    }

    validateInputEntry(position, true);
    game.savePlayerMove(position);

    return position;
  }
}
```

## Navigation Controller

Strategie i komendy najlepiej spiąć przez mały kontroler.

Kontroler:

- przyjmuje aktualną pozycję jako argument,
- sprawdza, czy klawisz obsługuje jakaś komenda,
- jeśli nie, deleguje ruch do strategii,
- zwraca wynik dla widoku.

Przykład:

```ts
export class NavigationController {
  constructor(
    private readonly strategy: NavigationStrategy,
    private readonly commands: KeyCommand[] = [],
  ) {}

  handleKey(position: number, key: NavKey): NavigationResult {
    const command = this.commands.find((command) => command.canHandle(key));

    if (command) {
      return command.execute(position);
    }

    return this.strategy.move(position, key);
  }
}
```

## Proponowana Struktura Plików

Na start rekomendowana jest umiarkowana struktura, bez zbyt głębokiego rozbijania plików.

```txt
src/
  services/
    keyHandlerService/
      index.ts
      keyHandler.ts
      keyNormalizer.ts

    navigationService/
      index.ts
      navigationController.ts
      types.ts
      strategies/
        gridNavigationStrategy.ts
        listNavigationStrategy.ts

  features/
    game/
      navigation/
        gameNavigation.ts

    settings/
      navigation/
        settingsNavigation.ts
```

To jest najrozsądniejszy pierwszy krok.

Komendy można dodać później, kiedy pliki `gameNavigation.ts` i `settingsNavigation.ts` zaczną rosnąć.

Docelowa, bardziej kompletna struktura może wyglądać tak:

```txt
src/
  services/
    inputService/
      index.ts
      inputService.ts

    keyHandlerService/
      index.ts
      keyHandler.ts
      keyNormalizer.ts

    navigationService/
      index.ts
      navigationController.ts
      types.ts
      strategies/
        gridNavigationStrategy.ts
        listNavigationStrategy.ts
      commands/
        quitCommand.ts

  features/
    game/
      navigation/
        gameNavigation.ts
        commands/
          selectFieldCommand.ts
          toggleHistoryCommand.ts
          toggleInfoCommand.ts

    settings/
      navigation/
        settingsNavigation.ts
        commands/
          toggleSelectedSettingCommand.ts
```

Zasada podziału:

- wspólne mechanizmy trafiają do `services/navigationService`,
- komendy znające domenę gry zostają w `features/game`,
- komendy znające ustawienia zostają w `features/settings`,
- `keyHandlerService` nie importuje logiki feature'ów.

## Plan Wdrożenia

### Etap 1: Normalizacja Klawiszy

Dodać:

```txt
src/services/keyHandlerService/keyNormalizer.ts
```

Cel:

- przyjmować surowy `readline.Key`,
- zwracać `NavKey | null`,
- odrzucać nieznane klawisze.

Po tym kroku `KeyHandler` przestaje zakładać, że każdy `key.name` jest poprawnym `NavKey`.

### Etap 2: Wydzielenie Typów Nawigacji

Dodać:

```txt
src/services/navigationService/types.ts
```

Minimalne typy:

```ts
export type NavigationPosition = number;

export type NavigationResult = NavigationPosition | NavKey | null;

export type NavigationStrategy = {
  move(position: NavigationPosition, key: NavKey): NavigationPosition;
};

export interface KeyCommand {
  canHandle(key: NavKey): boolean;
  execute(position: NavigationPosition): NavigationResult;
}
```

Na tym etapie można jeszcze nie wdrażać komend. Warto jednak dodać typ od razu, żeby docelowy kierunek był jasny.

### Etap 3: Wydzielenie Strategii

Dodać:

```txt
src/services/navigationService/strategies/gridNavigationStrategy.ts
src/services/navigationService/strategies/listNavigationStrategy.ts
```

Przenieść:

- logikę ruchu po planszy do `GridNavigationStrategy`,
- logikę ruchu po liście do `ListNavigationStrategy`.

To jest najbezpieczniejszy etap, bo dotyczy głównie czystej logiki bez efektów ubocznych.

### Etap 4: Dodać `NavigationController`

Dodać:

```txt
src/services/navigationService/navigationController.ts
```

Kontroler powinien:

- przyjmować aktualną pozycję jako argument `handleKey(position, key)`,
- używać strategii do ruchu,
- obsługiwać komendy przed strategią.

Na tym etapie można jeszcze utrzymać akcje w istniejących handlerach, żeby nie robić zbyt dużej zmiany naraz.

### Etap 5: Utworzyć Nawigację Gry I Settingsów

Dodać:

```txt
src/features/game/navigation/gameNavigation.ts
src/features/settings/navigation/settingsNavigation.ts
```

`gameNavigation.ts` składa:

- `NavigationController`,
- `GridNavigationStrategy`,
- akcje specyficzne dla gry.

`settingsNavigation.ts` składa:

- `NavigationController`,
- `ListNavigationStrategy`,
- akcje specyficzne dla settingsów.

Po tym kroku `gameNavigation.handleKey` i `settingsNavigation.handleKey` mogą być podpięte bezpośrednio jako `onKeyPress` w `KeyHandler`.

### Etap 6: Wydzielenie Komend

Kiedy `gameNavigation.ts` i `settingsNavigation.ts` będą już stabilne, można wydzielić komendy:

```txt
src/features/game/navigation/commands/selectFieldCommand.ts
src/features/game/navigation/commands/toggleHistoryCommand.ts
src/features/game/navigation/commands/toggleInfoCommand.ts
src/features/settings/navigation/commands/toggleSelectedSettingCommand.ts
```

Wspólna komenda wyjścia może trafić do:

```txt
src/services/navigationService/commands/quitCommand.ts
```

Ten etap warto zrobić dopiero wtedy, gdy faktycznie poprawi czytelność. Nie ma potrzeby tworzyć wielu małych plików, jeśli logika nadal jest krótka.

### Etap 7: Uporządkowanie `inputService` I Raw Mode

Etap został wdrożony po uporządkowaniu Strategy + Command.

Cel:

- ograniczyć ręczne wołanie `refreshInput()` w feature-serwisach,
- zamknąć zarządzanie `readline` i raw mode w jednym miejscu,
- uniknąć sytuacji, w której różne warstwy wiedzą o szczegółach `stdin`.

Możliwe kierunki:

- zostawić `inputService`, ale dodać metody trybu klawiatury,
- albo stworzyć nowy `terminalInputService`, który obsłuży i `question()`, i `keypress`.

Wybrany kierunek: `inputService` pozostał istniejącym serwisem, ale dostał metody `startKeyInput()` i `stopKeyInput()`. Dzięki temu `KeyHandler` nie zarządza bezpośrednio raw mode, a feature-serwisy nie odświeżają ręcznie `readline`.

## Kolejność Priorytetów

Najlepsza kolejność zmian:

1. `keyNormalizer`
2. `NavigationStrategy` i strategie `Grid` / `List`
3. `NavigationController`
4. `gameNavigation` i `settingsNavigation`
5. komendy
6. cleanup `inputService` / raw mode

Największy zysk przy najmniejszym ryzyku dają punkty 1-4.

## Testy

Warto dodać testy przede wszystkim dla czystej logiki:

- `GridNavigationStrategy`
- `ListNavigationStrategy`
- `NavigationController`
- komendy domenowe, jeśli zostaną wydzielone

Przykładowe przypadki dla planszy 3x3:

- pozycja `4` + `up` daje `1`,
- pozycja `4` + `down` daje `7`,
- pozycja `4` + `left` daje `3`,
- pozycja `4` + `right` daje `5`,
- pozycja `0` + `up` zawija do `6`,
- pozycja `0` + `left` zawija do `2`.

Przykładowe przypadki dla listy:

- pozycja minimalna + `up` zostaje na minimum,
- pozycja maksymalna + `down` zostaje na maksimum,
- pozycja środkowa reaguje na `up` i `down`.

## Kryteria Akceptacji

Refaktoryzację można uznać za udaną, gdy:

- `KeyHandler` nie zna domeny gry ani settingsów,
- logika ruchu po planszy i liście jest w strategiach,
- akcje po klawiszach są oddzielone od ruchu kursora,
- `gameKeyHandler` i `settingsKeyHandler` nie są potrzebne albo są tylko świadomym adapterem,
- `inputService` centralizuje przełączanie `readline` i raw mode,
- `waitForKeyPress()` nie zostawia nierozwiązanych Promise'ów przy `stop()` ani przy ponownym oczekiwaniu,
- `npm run ts:check` przechodzi,
- istnieją testy dla strategii albo przynajmniej czysta logika możliwa do łatwego testowania.

## Rekomendacja Końcowa

Refaktoryzacja została wdrożona bez dużego rewrite'u całego wejścia.

Aktualny układ rozdziela czystą logikę ruchu przez **Strategy**, akcje użytkownika przez **Command**, a `NavigationController` pełni rolę bezstanowego koordynatora.

Kolejny sensowny krok to dodanie testów dla strategii, kontrolera i komend, żeby utrwalić zachowanie po refaktoryzacji.
