export const delayed = <T>(
  delayMs: number,
  promise: Promise<T> | T,
): Promise<T> =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(promise)
    }, delayMs)
  })

export const randomDelay = () => 250 + Math.random() * 500
