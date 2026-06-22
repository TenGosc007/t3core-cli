import type { NavigationStrategy } from "../types";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";

type GridPosition = { col: number; row: number };

export class GridNavigationStrategy implements NavigationStrategy<number> {
  constructor(
    private readonly rows: number,
    private readonly cols: number,
  ) {}

  move(position: number, key: NavKey): number {
    const current = this.getGridPosition(position);
    let nextRow = current.row;
    let nextCol = current.col;

    switch (key) {
      case NAV_KEYS.UP:
        nextRow = (current.row - 1 + this.rows) % this.rows;
        break;
      case NAV_KEYS.DOWN:
        nextRow = (current.row + 1) % this.rows;
        break;
      case NAV_KEYS.LEFT:
        nextCol = (current.col - 1 + this.cols) % this.cols;
        break;
      case NAV_KEYS.RIGHT:
        nextCol = (current.col + 1) % this.cols;
        break;
    }

    return this.getIndex({ col: nextCol, row: nextRow });
  }

  private getGridPosition(index: number): GridPosition {
    return {
      col: index % this.cols,
      row: Math.floor(index / this.cols),
    };
  }

  private getIndex(position: GridPosition): number {
    return position.row * this.cols + position.col;
  }
}
