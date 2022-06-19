type Debounceable = (...args: any[]) => void

function debounce<T extends Debounceable>(
  functionToDebounce: T,
  wait:number = 300,
): T {
  let timeoutId: number | undefined = undefined

  return ((...args: any[]): void => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      timeoutId = undefined
      functionToDebounce(...args)
    }, wait)
  }) as T
}

export { Debounceable, debounce }
