import type { KeyCommand, NavigationResult, NavigationStrategy } from "./types";
import type { NavKey } from "@/global/navigationKeys";

export class NavigationController {
  constructor(
    private readonly _strategy: NavigationStrategy,
    private readonly _commands: KeyCommand[] = [],
  ) {}

  handleKey(position: number, key: NavKey): NavigationResult {
    const command = this._commands.find((command) => command.canHandle(key));

    if (command) {
      return command.execute(position);
    }

    return this._strategy.move(position, key);
  }
}
