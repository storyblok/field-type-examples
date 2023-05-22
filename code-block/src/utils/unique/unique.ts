export const unique = (arr: string[]): string[] =>
  arr.filter((value, index, array) => array.indexOf(value) === index)
