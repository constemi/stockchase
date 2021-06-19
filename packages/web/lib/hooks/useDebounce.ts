import * as React from 'react'

/**
 * Debounce a function by n(ms)
 * @param {Function} func
 * @param {Number} delay
 */
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (value) {
        setDebouncedValue(value)
      }
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
