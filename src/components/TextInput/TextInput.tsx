import type { ComponentProps } from "react";

import { Text, useInput } from "ink";
import { useState } from "react";

import { getRenderSegments } from "./getRenderSegments";
import { handleTextInputInput } from "./handleTextInputInput";

export type TextInputProps = Omit<ComponentProps<typeof Text>, "children"> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  focus?: boolean;
};

export const TextInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  focus = true,
  ...textProps
}: TextInputProps) => {
  const [cursorIndex, setCursorIndex] = useState(value.length);
  const cursor = Math.min(cursorIndex, value.length);

  useInput(
    (input, key) => {
      const result = handleTextInputInput(input, key, { value, cursor });
      if (result.type === "submit") onSubmit?.(value);
      else if (result.type === "update") {
        onChange(result.state.value);
        setCursorIndex(result.state.cursor);
      }
    },
    { isActive: focus },
  );

  if (!focus) {
    return (
      <Text dimColor={!value} {...textProps}>
        {value || placeholder}
      </Text>
    );
  }

  const { before, cursorChar, after, isPlaceholder } = getRenderSegments(
    value,
    cursor,
    placeholder,
  );

  return (
    <Text dimColor={isPlaceholder} {...textProps}>
      {before}
      <Text inverse>{cursorChar}</Text>
      {after}
    </Text>
  );
};
