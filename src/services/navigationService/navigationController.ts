import type { KeyCommand, NavigationStrategy } from "./types";
import type { NavKey } from "@/global/navigationKeys";

export class NavigationController<TPosition> {
  constructor(
    private _position: TPosition,
    private readonly _strategy: NavigationStrategy<TPosition>,
    private readonly _commands: KeyCommand<TPosition>[] = [],
  ) {}

  get position(): TPosition {
    return this._position;
  }

  handleKey(key: NavKey): TPosition | NavKey | null {
    const command = this._commands.find((command) => command.canHandle(key));

    if (command) {
      const result = command.execute(this._position);

      if (result != null && typeof result !== "string") {
        this._position = result;
      }

      return result;
    }

    this._position = this._strategy.move(this._position, key);
    return this._position;
  }

  reset(position: TPosition): void {
    this._position = position;
  }
}
