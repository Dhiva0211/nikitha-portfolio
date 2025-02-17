const trimAndSpacesFilled = (str: string): string =>
  str.trim().toLowerCase().replace(/\s/g, '-');

export default trimAndSpacesFilled;
