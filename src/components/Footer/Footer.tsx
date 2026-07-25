import type z from "zod";

import { Box, Text } from "ink";

import { useExitApp } from "@/hooks/useExitApp";

import { GlobalInput } from "../GlobalInput";

type Props = {
  onSubmit: (value: string) => void;
  hints: string[];
  validationSchema: z.ZodCoercedNumber<unknown>;
};

export const Footer = ({ onSubmit, hints, validationSchema }: Props) => {
  const { confirming } = useExitApp();

  return (
    <>
      {confirming ? (
        <Box padding={1}>
          <Text bold color="yellow">
            Are you sure you want to quit? Y/N
          </Text>
        </Box>
      ) : (
        <GlobalInput
          onSubmit={onSubmit}
          hints={hints}
          validationSchema={validationSchema}
        />
      )}
    </>
  );
};
