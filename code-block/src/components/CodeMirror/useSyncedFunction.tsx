import { useCallback, useEffect, useRef } from 'react'

/**
 * Returns a function whose reference never changes.
 *  When invoked, this function will call the function that was most recently passed to this hook.
 *  This function is needed because the components from react-codemirror2 only recognized those functions
 *  that were passed on the initial render.
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const useSyncedFunction = <C extends undefined | Function>(
  callback: C,
): NonNullable<C> => {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useCallback<NonNullable<C>>((...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    callbackRef.current?.(...args)
  }, [])
}
