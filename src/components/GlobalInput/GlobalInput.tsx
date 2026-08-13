import type { z } from "zod";

import { Box, Text } from "ink";
import { useState } from "react";

import { TextInput } from "../TextInput";
import { GlobalInputError } from "./GlobalInputError";
import { GlobalInputHint } from "./GlobalInputHint";
import { validateSubmission } from "./validateSubmission";

type Props = {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  hints?: string[];
  validationSchema?: z.ZodType<unknown>;
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

    const result = validateSubmission(v, validationSchema);
    if (result.type === "success") onSubmit?.(result.value);
    if (result.type === "error") setError(result.errors);
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
