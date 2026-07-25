import { Box, Text } from "ink";
import { useState } from "react";
import z from "zod";

import { beep } from "@/services/settings";

import { TextInput } from "../TextInput";
import { GlobalInputError } from "./GlobalInputError";
import { GlobalInputHint } from "./GlobalInputHint";

type Props = {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  hints?: string[];
  validationSchema?: z.ZodCoercedNumber<unknown>;
  error?: GlobalInputError;
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

  return (
    <>
      <GlobalInputError error={error || errorProp} />
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
      <GlobalInputHint hints={hints} />
    </>
  );
};
