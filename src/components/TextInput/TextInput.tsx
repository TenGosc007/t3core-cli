import type { ComponentProps } from "react";

import { Text, useInput } from "ink";
import { useState } from "react";

type Props = Omit<ComponentProps<typeof Text>, "children"> & {
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
}: Props) => {
  const [cursorIndex, setCursorIndex] = useState(value.length);
  const cursor = Math.min(cursorIndex, value.length);

  useInput(
    (input, key) => {
      if (key.return) {
        onSubmit?.(value);
        return;
      }

      if (key.leftArrow) {
        setCursorIndex((index) => Math.max(0, index - 1));
        return;
      }

      if (key.rightArrow) {
        setCursorIndex((index) => Math.min(value.length, index + 1));
        return;
      }

      if (key.delete) {
        onChange(value.slice(0, cursor) + value.slice(cursor + 1));
        return;
      }

      if (key.backspace) {
        if (cursor === 0) return;

        onChange(value.slice(0, cursor - 1) + value.slice(cursor));
        setCursorIndex(cursor - 1);
        return;
      }

      if (input && !key.ctrl && !key.meta) {
        onChange(value.slice(0, cursor) + input + value.slice(cursor));
        setCursorIndex(cursor + input.length);
      }
    },
    { isActive: focus },
  );

  const beforeCursor = value.slice(0, cursor);
  const afterCursor = value.slice(cursor);
  const displayValue = value || placeholder;

  if (!focus) {
    return (
      <Text dimColor={!value} {...textProps}>
        {displayValue}
      </Text>
    );
  }

  return (
    <Text dimColor={!value} {...textProps}>
      {beforeCursor}
      <Text inverse>{afterCursor[0] ?? " "}</Text>
      {afterCursor.slice(1) || (!value ? placeholder : "")}
    </Text>
  );
};
