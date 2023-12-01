export const initials = (text: string): string =>
  text
    .split(' ')
    .map((word) => word[0])
    .slice(0, 3)
    .join('')
    .toUpperCase()
