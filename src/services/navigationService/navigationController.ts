import type { KeyCommand, NavigationResult, NavigationStrategy } from "./types";
import type { NavKey } from "@/global/navigationKeys";

export class NavigationController {
  constructor(
    private _position: number,
    private readonly _strategy: NavigationStrategy,
    private readonly _commands: KeyCommand[] = [],
  ) {}

  get position(): number {
    return this._position;
  }

  handleKey(key: NavKey): NavigationResult {
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

  reset(position: number): void {
    this._position = position;
  }
}
