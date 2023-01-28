import { useCallback, useEffect, useState } from 'react'

export const useActiveColumn = (indexColumn?: number) => {
  const [isActiveColumn, setIsActiveColumn] = useState(false)

  const onChangeActiveColumn = useCallback(
    ((event: CustomEvent<number | null>) => {
      setIsActiveColumn(event.detail !== null && event.detail === indexColumn)
    }) as EventListener,
    [indexColumn],
  )

  useEffect(() => {
    ...
  }, [indexColumn])

  useEffect(() => () => window.removeEventListener('set-active-column', onChangeActiveColumn), [indexColumn])

  return { isActiveColumn }
}
