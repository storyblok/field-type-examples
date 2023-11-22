import { State } from '../state/types/State'
import { isLoadingItems } from './isLoadingItems'

export const isPageEmpty = (state: State): boolean =>
  !isLoadingItems(state) && state.items.length === 0
