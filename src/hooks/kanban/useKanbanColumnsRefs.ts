import { useMemo } from 'react'

export const useKanbanColumnsRefs = () => {
  const { getColumnsElements, setColumnsElements } = useMemo(() => {
    let columnsElements: HTMLDivElement[] = []
    ...
  }, [])
  return { getColumnsElements, setColumnsElements }
}
