export const convertCurrencyToNumber = (value: string) =>
  Number(value.replace(/[^0-9\.-]+/g, ""));
