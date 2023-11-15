/**
 *
 * @param list
 * @param page counted from 1, not 0
 * @param pageSize
 */
export const getPage = <T>(list: T[], page: number, pageSize: number): T[] =>
  list.slice(pageSize * (page - 1), page * pageSize)
