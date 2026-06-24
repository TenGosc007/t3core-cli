export class GameStateManager {
  private _state = {
    info: false,
    historyMode: false,
    inputError: null as string | null,
  };

  // Getters for read-only access
  get info() {
    return this._state.info;
  }
  get historyMode() {
    return this._state.historyMode;
  }
  get inputError() {
    return this._state.inputError;
  }

  // State modifiers
  toggleInfo(): void {
    this._state.info = !this._state.info;
  }

  toggleHistoryMode(): void {
    this._state.historyMode = !this._state.historyMode;
  }

  setInputError(error: string | null): void {
    this._state.inputError = error;
  }

  reset(): void {
    this._state.info = false;
    this._state.historyMode = false;
    this._state.inputError = null;
  }
}

// Singleton instance
export const gameState = new GameStateManager();
