export type RenderSegments = {
  before: string;
  cursorChar: string;
  after: string;
  isPlaceholder: boolean;
};

export const getRenderSegments = (
  value: string,
  cursor: number,
  placeholder: string,
): RenderSegments => {
  const beforeCursor = value.slice(0, cursor);
  const afterCursor = value.slice(cursor);
  const remaining = afterCursor.slice(1);

  return {
    before: beforeCursor,
    cursorChar: afterCursor[0] ?? " ",
    after: remaining || (!value ? placeholder : ""),
    isPlaceholder: !value,
  };
};
