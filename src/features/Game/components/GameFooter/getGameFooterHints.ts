import { BOARD_LENGTH } from "../../constants/gameConstants";

export const getGameFooterHints = (
  historyMovesCount: number,
  isHistoryModeOn?: boolean,
  showHistory?: boolean,
) => {
  const selectHint =
    isHistoryModeOn && showHistory
      ? `Select previous move (0-${historyMovesCount}). 0 is start from the beginning`
      : `Select the number of the field (1-${BOARD_LENGTH})`;

  const toggleHistoryHint =
    showHistory && historyMovesCount > 0
      ? `h ${isHistoryModeOn ? "Hide" : "Show"} history`
      : null;

  const exitHint = "esc Back to Menu";

  const hints = [
    selectHint,
    ...(toggleHistoryHint ? [toggleHistoryHint] : []),
    exitHint,
  ];

  const arrowNavHints =
    isHistoryModeOn && showHistory
      ? [
          "↑↓ Navigate history",
          ...(toggleHistoryHint ? [toggleHistoryHint] : []),
          "Enter Select move",
          exitHint,
        ]
      : [
          "↑↓ Use arrow keys to navigate",
          ...(toggleHistoryHint ? [toggleHistoryHint] : []),
          "Enter to confirm\n",
          exitHint,
        ];

  return { hints, arrowNavHints };
};
