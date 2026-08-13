# t3core-cli

Interactive Tic Tac Toe game for your terminal, powered by [t3core](https://github.com/TenGosc007/t3core).

## Play instantly — no installation needed

```bash
npx t3core-cli
```

## Or install globally

```bash
npm install -g t3core-cli
t3core-cli
```

## Screenshots

![Menu](docs/menuv2.png)
![Game](docs/gamev2.png)

## Features

- Two-player Tic Tac Toe in the terminal
- Interactive menu with settings and an About screen
- Optional arrow-key navigation in interactive terminals
- Colored symbols and styled board
- Sound toggle, game history toggle, and reset-to-default settings
- Move history view with navigation and rollback support (opt-in via settings)
- Optional game info panel
- Win and draw detection
- Play again prompt
- Exit confirmation prompt on the home screen
- CLI flags for overriding settings and choosing the initial screen

## Controls

### Game

- Enter a field number from `1` to `9` to place a move.
- When arrow-key navigation is enabled, use arrow keys to choose a field and `Enter` to confirm.
- Press `h` to show or hide move history after at least one move (only when Show Game History is enabled).
- In history mode, use `↑`/`↓` to navigate moves and `Enter` to roll back to the selected move. Enter `0` to start from the beginning.
- Press `i` to show or hide game info.
- Press `q` or `Esc` to return to the main menu.

## CLI flags

```bash
t3core-cli [options]
```

- `--screen` — initial screen to show (`home`, `settings`, `game`, `about`). Defaults to `home`.
- `--sound` — enable or disable sound (`true`/`false`). Defaults to `true`.
- `--arrowNav` — enable or disable arrow-key navigation (`true`/`false`). Defaults to `true`.
- `--showHistory` — enable or disable the game history feature (`true`/`false`). Defaults to `false`.
- `--mobile` — mobile mode, disables arrow-key navigation.

Examples:

```bash
t3core-cli --screen=settings
t3core-cli --sound=false --arrowNav=false --showHistory=true
t3core-cli --mobile
```

## Requirements

- Node.js >= 20.0.0

## Related

- [t3core](https://www.npmjs.com/package/t3core) — the reusable TypeScript core library used by this CLI (also works with React, Next.js, and any JavaScript project)
