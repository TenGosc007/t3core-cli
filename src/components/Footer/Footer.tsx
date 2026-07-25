import type z from "zod";

import { Box, Text } from "ink";

import { useExitConfirm } from "@/hooks/useExitConfirm";

import { GlobalInput } from "../GlobalInput";

type Props = {
  onSubmit: (value: string) => void;
  hints: string[];
  validationSchema: z.ZodCoercedNumber<unknown>;
};

export const Footer = ({ onSubmit, hints, validationSchema }: Props) => {
  const { confirming } = useExitConfirm();

  if (confirming) {
    return (
      <Box padding={1}>
        <Text bold>Are you sure you want to quit? Y/N</Text>
      </Box>
    );
  }

  return (
    <GlobalInput
      onSubmit={onSubmit}
      hints={hints}
      validationSchema={validationSchema}
    />
  );
};
