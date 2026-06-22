# Audyt Nawigacji I Plan Refaktoryzacji

## Zakres

Dokument opisuje audyt obecnej logiki wejścia i nawigacji w:

- `src/services/inputService/`
- `src/services/keyHandlerService/`
- powiązanych handlerach w `features/game` i `features/settings`

Celem jest uporządkowanie odpowiedzialności, opisanie wzorca **Strategy + Command** oraz przygotowanie bezpiecznego planu wdrożenia bez dużego rewrite'u.

## Obecny Stan

Aktualna obsługa wejścia jest podzielona na dwa główne mechanizmy:

- `inputService` obsługuje klasyczne wejście tekstowe przez `readline.question()`.
- `KeyHandler` obsługuje pojedyncze klawisze w raw mode przez `process.stdin` i event `keypress`.

Feature'y korzystają z tego tak:

- `gameKeyHandlerService` tworzy singleton `KeyHandler` dla planszy gry.
- `settingsKeyHandlerService` tworzy singleton `KeyHandler` dla ekranu ustawień.
- `gameKeyHandler` i `settingsKeyHandler` zawierają właściwą logikę nawigacji oraz akcji.

Obecny układ działa, ale odpowiedzialności są miejscami wymieszane.

## Audyt

### 1. `KeyHandler` Ma Za Dużo Wiedzy O Nawigacji

`KeyHandler` powinien być adapterem terminala: start, stop, raw mode, listener klawiatury, cleanup.

Obecnie dodatkowo:

- przechowuje `position`,
- resetuje pozycję,
- przekazuje samego siebie do callbacka,
- oczekuje, że callback zwróci nową pozycję albo komendę tekstową.

To powoduje, że logika domenowa gry zna szczegóły infrastruktury wejścia, np. może wołać `handler.resetPosition()` albo sprawdzać `handler.running`.

Docelowo `KeyHandler` powinien wiedzieć tylko tyle:

```txt
key pressed -> normalized key -> callback
```

Nie powinien wiedzieć, czy pozycja oznacza pole planszy, pozycję w settingsach, wyjście z widoku, historię ruchów albo akcję gry.

### 2. `inputService` I `KeyHandler` Konkurują O `stdin`

`inputService` tworzy globalny `readline.Interface`, a `KeyHandler` przełącza `process.stdin` w raw mode.

Po zatrzymaniu `KeyHandler` feature-serwisy wołają `refreshInput()`, żeby odtworzyć `readline.Interface`.

To działa, ale jest kruche, bo zarządzanie trybem terminala jest rozproszone:

- `inputService` zarządza `readline`,
- `KeyHandler` zarządza raw mode,
- feature-serwisy wiedzą, że po `stop()` trzeba zrobić `refreshInput()`.

Lepszym kierunkiem jest centralny serwis wejścia terminalowego, który kontroluje oba tryby.

### 3. Typ `ReadlineKey` Jest Zbyt Optymistyczny

Obecny typ zakłada, że `key.name` zawsze jest jedną z wartości `NavKey`.

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

### 4. `waitForKeyPress()` Może Zostawić Nierozwiązany Promise

`waitForKeyPress()` przechowuje jeden resolver. Jeśli metoda zostanie wywołana drugi raz przed następnym klawiszem, poprzedni Promise może zostać zgubiony.

Jeśli `stop()` nastąpi podczas oczekiwania na klawisz, Promise również może pozostać nierozwiązany.

Obecny flow prawdopodobnie nie wywołuje tego błędu, ale API serwisu jest podatne na niepoprawne użycie.

Docelowo warto:

- blokować drugie oczekiwanie, jeśli jedno już trwa,
- albo rozwiązywać poprzednie oczekiwanie przy `stop()`,
- albo uprościć API i zamiast `waitForKeyPress()` emitować wynik przez kontroler nawigacji.

### 5. Logika Ruchu I Akcji Jest Wymieszana

W `gameKeyHandler` w jednym miejscu dzieją się różne rzeczy:

- obliczanie pozycji na planszy 3x3,
- obsługa Enter/Space,
- zapis ruchu gracza,
- reset pozycji po zakończeniu gry,
- obsługa akcji `q`, `escape`, `backspace`, `h`, `i`.

W `settingsKeyHandler` podobnie:

- ruch po liście,
- wyjście,
- przełączanie ustawień.

To są różne odpowiedzialności:

- ruch kursora to strategia nawigacji,
- akcja po klawiszu to komenda.

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
export interface NavigationStrategy<TPosition> {
  move(position: TPosition, key: NavKey): TPosition;
}
```

Przykład strategii dla planszy:

```ts
export class GridNavigationStrategy implements NavigationStrategy<number> {
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
export class ListNavigationStrategy implements NavigationStrategy<number> {
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
export interface KeyCommand<TPosition> {
  canHandle(key: NavKey): boolean;
  execute(position: TPosition): TPosition | NavKey | null;
}
```

Przykład komendy wyjścia:

```ts
export class QuitCommand implements KeyCommand<number> {
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
export class SelectFieldCommand implements KeyCommand<number> {
  canHandle(key: NavKey): boolean {
    return key === NAV_KEYS.ENTER || key === NAV_KEYS.SPACE;
  }

  execute(position: number): number | null {
    const game = getGame();

    if (game.gameStatus.status !== "running") {
      return null;
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

- trzyma aktualną pozycję,
- sprawdza, czy klawisz obsługuje jakaś komenda,
- jeśli nie, deleguje ruch do strategii,
- zwraca wynik dla widoku.

Przykład:

```ts
export class NavigationController<TPosition> {
  constructor(
    private position: TPosition,
    private readonly strategy: NavigationStrategy<TPosition>,
    private readonly commands: KeyCommand<TPosition>[],
  ) {}

  handleKey(key: NavKey): TPosition | NavKey | null {
    const command = this.commands.find((command) => command.canHandle(key));

    if (command) {
      const result = command.execute(this.position);

      if (result !== null && typeof result !== "string") {
        this.position = result;
      }

      return result;
    }

    this.position = this.strategy.move(this.position, key);
    return this.position;
  }

  getPosition(): TPosition {
    return this.position;
  }

  reset(position: TPosition): void {
    this.position = position;
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
export interface NavigationStrategy<TPosition> {
  move(position: TPosition, key: NavKey): TPosition;
}

export interface KeyCommand<TPosition> {
  canHandle(key: NavKey): boolean;
  execute(position: TPosition): TPosition | NavKey | null;
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

- logikę ruchu po planszy z `gameKeyHandler`,
- logikę ruchu po liście z `settingsKeyHandler`.

To jest najbezpieczniejszy etap, bo dotyczy głównie czystej logiki bez efektów ubocznych.

### Etap 4: Dodać `NavigationController`

Dodać:

```txt
src/services/navigationService/navigationController.ts
```

Kontroler powinien:

- przechowywać pozycję,
- używać strategii do ruchu,
- później obsługiwać komendy.

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

Po tym kroku `gameKeyHandler` i `settingsKeyHandler` powinny stać się cienkimi adapterami.

Przykładowo:

```ts
export const gameKeyHandler = ({ key }: KeyHandlerProps) => {
  return gameNavigation.handleKey(key.name);
};
```

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

To jest osobny, późniejszy etap.

Cel:

- ograniczyć ręczne wołanie `refreshInput()` w feature-serwisach,
- zamknąć zarządzanie `readline` i raw mode w jednym miejscu,
- uniknąć sytuacji, w której różne warstwy wiedzą o szczegółach `stdin`.

Możliwe kierunki:

- zostawić `inputService`, ale dodać metody trybu klawiatury,
- albo stworzyć nowy `terminalInputService`, który obsłuży i `question()`, i `keypress`.

Nie rekomenduje się robić tego równolegle z wdrożeniem Strategy + Command. Lepiej najpierw uporządkować logikę nawigacji.

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
- `gameKeyHandler` i `settingsKeyHandler` są cienkimi adapterami,
- `npm run ts:check` przechodzi,
- istnieją testy dla strategii albo przynajmniej czysta logika możliwa do łatwego testowania.

## Rekomendacja Końcowa

Nie warto robić dużego rewrite'u całego wejścia od razu.

Najpierw należy wydzielić czystą logikę nawigacji przez **Strategy**, potem spiąć ją przez prosty `NavigationController`, a dopiero później przenieść akcje do **Command**.

Taki kierunek daje lepszą strukturę bez utraty obecnego, działającego flow aplikacji.
