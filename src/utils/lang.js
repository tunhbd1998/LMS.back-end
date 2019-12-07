export const convertToInt = (val, defaultValue = null, radix = 10) => {
  try {
    return parseInt(val, radix) || defaultValue;
  } catch (err) {
    return defaultValue;
  }
};
