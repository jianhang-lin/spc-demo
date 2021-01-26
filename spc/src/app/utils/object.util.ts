export const isEmptyArray = <T>(array: T[]): boolean => {
  return !!(array && array.length);
};

export const isNullObject = <T>(T): boolean => {
  return T && Object.keys(T).length !== 0;
};

export const isZeroLength = <T>(T): boolean => {
  return T && T.length === 0;
};
