import { State } from '../state/types/State'

export const isLoadingItems = (state: State): boolean =>
  state.loadingState !== 'notLoading'
