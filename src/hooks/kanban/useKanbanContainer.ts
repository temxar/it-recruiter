import { MouseEvent, useContext } from 'react'

import { KanbanContext } from 'contexts/KanbanContext'
import { DragPosition } from 'interfaces/kanban.interfaces'

export const useKanbanContainer = () => {
  const { setContainer, setContainerColumns } = useContext(KanbanContext)

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    ...
    window.dispatchEvent(dragEvent)
  }

  const onMouseUp = () => {
    ...
  }

  return {
    setContainer,
    setContainerColumns,
    containerProps: {
      onMouseMove,
      onMouseUp,
    },
  }
}
