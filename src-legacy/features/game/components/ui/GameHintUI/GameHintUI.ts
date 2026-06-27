import { s } from "@/utils/styledLabel";

const getHistoryInstruction = ({
  movesCount,
  useArrowKeys,
}: {
  movesCount: number;
  useArrowKeys: boolean;
}) => {
  return useArrowKeys
    ? "Select previous move"
    : `Back to previous move from 0 to ${movesCount}.
(0 is start from the beginning)`;
};

const showInstructionMessage = ({
  movesCount,
  isKeyHandlerRunning,
  isHistoryMode,
}: {
  movesCount: number;
  isKeyHandlerRunning: boolean;
  isHistoryMode: boolean;
}) => {
  const useArrowKeys = isKeyHandlerRunning && !isHistoryMode;

  const instruction = isHistoryMode
    ? getHistoryInstruction({
        movesCount,
        useArrowKeys,
      })
    : useArrowKeys
      ? "Use arrow keys to navigate,\nEnter to confirm"
      : "Select the number of the field (1-9)";

  console.log(s.white(instruction));
};

const showHistoryHint = ({
  isHistoryMode,
  movesCount,
}: {
  isHistoryMode: boolean;
  movesCount: number;
}) => {
  if (movesCount > 0)
    console.log(
      s.dim(`Press "h" to ${isHistoryMode ? "hide" : "show"} game history`),
    );
};

export type GameHintUIProps = {
  movesCount: number;
  isKeyHandlerRunning: boolean;
  isHistoryMode: boolean;
};

export const GameHintUI = ({
  movesCount,
  isKeyHandlerRunning,
  isHistoryMode,
}: GameHintUIProps) => {
  showInstructionMessage({ isHistoryMode, isKeyHandlerRunning, movesCount });
  showHistoryHint({ isHistoryMode, movesCount });
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log(`\t`);
};
