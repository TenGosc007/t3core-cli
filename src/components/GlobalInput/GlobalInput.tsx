import { Box, Text } from "ink";
import { useState } from "react";
import z from "zod";

import { beep, useSettingsStore } from "@/services/settings";

import { TextInput } from "../TextInput";

type GlobalInputError = string | string[] | undefined;

type Props = {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  hints?: string[];
  validationSchema?: z.ZodCoercedNumber<unknown>;
  error?: GlobalInputError;
};

const errorHelper = (error: GlobalInputError) => {
  return Array.isArray(error) ? error?.join(" · ") : error;
};

export const GlobalInput = ({
  onSubmit,
  onChange,
  placeholder,
  hints = [],
  error: errorProp = "",
  validationSchema,
}: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<GlobalInputError>(errorProp);
  const errorMessage = errorHelper(error || errorProp);
  const arrowKeyNavigation = useSettingsStore((s) => s.arrowKeyNavigation);

  const handleChange = (v: string) => {
    setValue(v);
    onChange?.(v);
    setError("");
  };

  const handleSubmit = (v: string) => {
    setValue("");
    setError("");

    if (!validationSchema) {
      onSubmit?.(v);
      return;
    }

    const result = validationSchema?.safeParse(value);
    if (result?.success) {
      onSubmit?.(result.data.toString());
      return;
    }

    beep();
    const resultError = z.flattenError(result.error);
    setError(resultError.formErrors);
  };

  if (arrowKeyNavigation) {
    return null;
  }

  return (
    <>
      <Box height={1} paddingX={1}>
        <Text color="red">{errorMessage}</Text>
      </Box>
      <Box
        borderStyle="single"
        borderColor="gray"
        borderLeft={false}
        borderRight={false}
        borderDimColor
        paddingX={1}
        width="100%"
      >
        <Text bold>❯ </Text>
        <TextInput
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          placeholder={placeholder}
        />
      </Box>
      <Box paddingX={1} flexDirection="column">
        {hints?.map((hint, index) => (
          <Text key={index} dimColor>
            · {hint}
          </Text>
        ))}
      </Box>
    </>
  );
};
