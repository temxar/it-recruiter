import { useMemo } from 'react'

export const useKanbanContainerRef = () => {
  const { getContainer, setContainer } = useMemo(() => {
    let container: HTMLDivElement | null = null
    return {
      getContainer: () => container,
      setContainer: (newContainer: HTMLDivElement | null) => {
        container = newContainer
      },
    }
  }, [])

  return { getContainer, setContainer }
}
