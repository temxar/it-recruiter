import { createContext } from 'react'

interface KanbanContextType {
  columnWidth: number
  getContainer: () => HTMLDivElement | null
  setContainer: (newContainer: HTMLDivElement | null) => void
  getContainerColumns: () => HTMLDivElement | null
  setContainerColumns: (newContainer: HTMLDivElement | null) => void
  getColumnsElements: () => HTMLDivElement[]
  setColumnsElements: (elements: HTMLDivElement[]) => void
}

export const KanbanContext = createContext<KanbanContextType>({
  columnWidth: 0,
  getContainer: () => null,
  setContainer: () => {},
  getContainerColumns: () => null,
  setContainerColumns: () => {},
  getColumnsElements: () => [],
  setColumnsElements: () => {},
})
