const naturalNumberRegex = /^[0-9]+$/
export const isNaturalNumber = (str: string): boolean =>
  naturalNumberRegex.test(str)
