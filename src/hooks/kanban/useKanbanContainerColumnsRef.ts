import { useMemo } from 'react'

export const useKanbanContainerColumnsRef = () => {
  const { getContainerColumns, setContainerColumns } = useMemo(() => {
    let container: HTMLDivElement | null = null
    return {
      getContainerColumns: () => container,
      setContainerColumns: (newContainer: HTMLDivElement | null) => {
        container = newContainer
      },
    }
  }, [])

  return { getContainerColumns, setContainerColumns }
}
