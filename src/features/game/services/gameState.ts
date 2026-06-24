type GameState = {
  info: boolean;
  historyMode: boolean;
  inputError: string | null;
};

const createInitialGameState = (): GameState => ({
  info: false,
  historyMode: false,
  inputError: null,
});

export class GameStateManager {
  private _state: GameState;

  constructor(initialState?: Partial<GameState>) {
    this._state = { ...createInitialGameState(), ...initialState };
  }

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
    this._state.inputError = null;
    this._state.info = !this._state.info;
  }

  toggleHistoryMode(): void {
    this._state.inputError = null;
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
export const gameStateManager = new GameStateManager();
