import { Box, Newline, Text } from "ink";

import { Container } from "@/components/Container";

type GameInfoProps = {
  showInfo: boolean;
};

export const GameInfo = ({ showInfo }: GameInfoProps) => {
  return (
    <Box
      flexDirection="column"
      borderTop={false}
      borderLeft={false}
      borderRight={false}
      borderStyle="classic"
      borderColor="yellow"
    >
      <Container>
        {showInfo ? (
          <>
            <Text dimColor italic>
              Tic-tac-toe is a simple two-player game played on a 3x3 grid.
              Players take turns marking a square with X or O, trying to get
              three in a row horizontally, vertically, or diagonally. The game
              ends when one player wins or all squares are filled, resulting in
              a draw.
            </Text>
            <Newline />
            <Text italic={false} dimColor>
              Press "i" to hide game info
            </Text>
          </>
        ) : (
          <Text dimColor>Press "i" to show game info</Text>
        )}
      </Container>
    </Box>
  );
};
