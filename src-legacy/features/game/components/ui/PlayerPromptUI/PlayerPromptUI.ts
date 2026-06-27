import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

export type PlayerPromptUIProps = {
  currentPlayer: string;
};

export const PlayerPromptUI = ({ currentPlayer }: PlayerPromptUIProps) => {
  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(currentPlayer)})`,
  );
  console.log(`\t`);
};
