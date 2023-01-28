import { CSSProperties, MouseEvent, useCallback, useContext, useEffect, useState } from 'react'

import { useGetState } from 'ahooks'
import { KanbanContext } from 'contexts/KanbanContext'
import { CrmLeadStatus } from 'interfaces/api/crm.interfaces'
import { DragPosition } from 'interfaces/kanban.interfaces'

export const useDragKanbanColumn = (indexColumn = 0, isStatic?: boolean, columns?: CrmLeadStatus[] | null) => {
  const [isDragging, setIsDragging, getIsDragging] = useGetState(false)
  const [hideCont, setHideCont] = useState(false)
  const [, setPositionStartMove] = useState<DragPosition | null>(null)
  const [, setPositionContainer, getPositionContainer] = useGetState<DragPosition | null>(null)
  const [, setPositionClicked, getPositionClicked] = useGetState<DragPosition | null>(null)
  const [position, setPosition] = useState<DragPosition | null>(null)
  const [positionLeftPlaceholder, setPositionLeftPlaceholder] = useState<number | null>(null)
  const [, setActiveColumn, getActiveColumn] = useGetState<number | null>(null)
  const isDraggingCompose = isDragging && position !== null
  const maxIndexColumn = (columns?.length || 1) - 1

  const { getColumnsElements, columnWidth, getContainer, getContainerColumns } = useContext(KanbanContext)

  const style: CSSProperties = {
    left: isDraggingCompose ? position?.x : undefined,
    top: isDraggingCompose ? position?.y : undefined,
  }
  const stylePlaceholder: CSSProperties = {
    left: isDraggingCompose && positionLeftPlaceholder !== null ? positionLeftPlaceholder : indexColumn * columnWidth,
  }

  const onStart = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      ...
    },
    [indexColumn],
  )

  const onDrag = useCallback(
    ((event: CustomEvent<{ x: number; y: number }>) => {
      ...
    }) as EventListener,
    [indexColumn],
  )

  const onDragStop = useCallback(() => {
    setIsDragging(false)
    setPosition(null)
    setPositionLeftPlaceholder(null)
    setPositionContainer(null)
    setPositionClicked(null)
    setPositionStartMove(null)

    ...

    setTimeout(() => {
      setHideCont(false)

      const containerColumns = getContainerColumns()
      if (containerColumns) {
        containerColumns.removeAttribute('style')
      }
    })
  }, [indexColumn])

  let fnStop: (indexColumn: number | null) => void = () => {}
  const onStop = (fn: (indexColumn: number | null) => void) => {
    fnStop = fn
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('drag-kanban', onDrag)
      window.addEventListener('drag-stop-kanban', onDragStop)
    } else {
      window.removeEventListener('drag-kanban', onDrag)
      window.removeEventListener('drag-stop-kanban', onDragStop)
    }
  }, [isDragging, indexColumn])

  useEffect(
    () => () => {
      window.removeEventListener('drag-kanban', onDrag)
      window.removeEventListener('drag-stop-kanban', onDragStop)
    },
    [indexColumn],
  )

  return {
    isDragging,
    hideCont,
    onStop,
    topColumnProps: {
      onMouseDown: onStart,
      onMouseUp: () => fnStop(getActiveColumn()),
    },
    columnProps: {
      style,
    },
    placeholderProps: {
      style: stylePlaceholder,
    },
  }
}
