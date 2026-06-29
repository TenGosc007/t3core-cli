export const validateFieldRange = (
  index: number,
  range: number,
  start: number = 1,
): string | null => {
  const isFieldOutOfRange = index < start || index > range;
  if (Number.isNaN(index) || isFieldOutOfRange) {
    return `Please enter a valid number (${start}-${range}) and press enter`;
  }
  return null;
};
