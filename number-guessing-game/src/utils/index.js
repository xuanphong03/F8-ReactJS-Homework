export const RANGE_NUMBER = 100;

export const MAX_TIME = (range_number = RANGE_NUMBER) =>
  Math.ceil(Math.log2(RANGE_NUMBER));
