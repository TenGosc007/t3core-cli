import type { Key } from "ink";

export type TextInputState = {
  value: string;
  cursor: number;
};

export type TextInputResult =
  | { type: "submit" }
  | { type: "update"; state: TextInputState }
  | { type: "noop" };

const isInsertable = (input: string, key: Key) =>
  input && !key.ctrl && !key.meta;

export const moveLeft = (cursor: number): number => Math.max(0, cursor - 1);

export const moveRight = (cursor: number, length: number): number =>
  Math.min(length, cursor + 1);

export const deleteAtCursor = (
  value: string,
  cursor: number,
): TextInputState => ({
  value: value.slice(0, cursor) + value.slice(cursor + 1),
  cursor,
});

export const backspaceAtCursor = (
  value: string,
  cursor: number,
): TextInputState | null => {
  if (cursor === 0) return null;
  return {
    value: value.slice(0, cursor - 1) + value.slice(cursor),
    cursor: cursor - 1,
  };
};

export const insertAtCursor = (
  value: string,
  cursor: number,
  char: string,
): TextInputState => ({
  value: value.slice(0, cursor) + char + value.slice(cursor),
  cursor: cursor + char.length,
});

export const handleTextInputInput = (
  input: string,
  key: Key,
  { value, cursor }: TextInputState,
): TextInputResult => {
  if (key.return) return { type: "submit" };
  if (key.leftArrow)
    return { type: "update", state: { value, cursor: moveLeft(cursor) } };
  if (key.rightArrow)
    return {
      type: "update",
      state: { value, cursor: moveRight(cursor, value.length) },
    };
  if (key.delete)
    return { type: "update", state: deleteAtCursor(value, cursor) };
  if (key.backspace) {
    const next = backspaceAtCursor(value, cursor);
    return next ? { type: "update", state: next } : { type: "noop" };
  }
  if (isInsertable(input, key))
    return { type: "update", state: insertAtCursor(value, cursor, input) };
  return { type: "noop" };
};
