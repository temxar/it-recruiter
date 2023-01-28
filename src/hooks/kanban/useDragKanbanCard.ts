import { MouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { useGetState } from 'ahooks'
import { KanbanContext } from 'contexts/KanbanContext'
import { DragPosition } from 'interfaces/kanban.interfaces'

export const useDragKanbanCard = (readyColumn?: boolean, indexColumn?: number) => {
  const [ready, setReady] = useState(false)
  const [readyByColumn, setReadyByColumn] = useState(false)
  const [isDragging, setIsDragging, getIsDragging] = useGetState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [, setActiveColumnState, getActiveColumn] = useGetState<number | null>(null)

  const [positionContainer, setPositionContainer, getPositionContainer] = useGetState<DragPosition | null>(null)
  const [positionClicked, setPositionClicked, getPositionClicked] = useGetState<DragPosition | null>(null)
  const [, setPositionStartMove, getPositionStartMove] = useGetState<DragPosition | null>(null)
  const [position, setPosition] = useState<DragPosition | null>(null)
  const composePosition = position
    ? {
        x: position.x - (positionContainer?.x || 0) - (positionClicked?.x || 0),
        y: position.y - (positionContainer?.y || 0) - (positionClicked?.y || 0),
      }
    : null

  const { columnWidth, getContainer } = useContext(KanbanContext)
  const ref = useRef<HTMLDivElement>(null)

  const gap = 3
  const paddingColumn = 20

  const setActiveColumn = (index: number | null) => {
    const dragEvent = new CustomEvent<number | null>('set-active-column', { detail: index })
    window.dispatchEvent(dragEvent)
    setActiveColumnState(index)
  }

  const onStart = (event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) {
      return
    }
    ...
  }

  const onDrag = useCallback(
    ((event: CustomEvent<{ x: number; y: number }>) => {
      ...
    }) as EventListener,
    [],
  )

  const onDragStop = useCallback(() => {
    setIsDragging(false)
    setIsClicked(false)
    setPosition(null)
    ...
  }, [])

  let fnStop: (indexColumn: number | null) => void = () => {}
  const onStop = (fn: (indexColumn: number | null) => void) => {
    fnStop = fn
  }

  useEffect(() => {
    ...
  }, [isClicked])

  useEffect(
    ...
    [],
  )

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
      if (readyColumn) {
        setReadyByColumn(true)
      }
    })
  }, [])

  useEffect(() => {
    setReadyByColumn(false)
  }, [indexColumn])

  return {
    isDragging,
    getContainer,
    height,
    onStop,
    ready,
    readyByColumn,
    childrenProps: {
      onMouseDown: onStart,
      onMouseUp: () => fnStop(getActiveColumn()),
      ref,
      style: {
        left: composePosition?.x,
        top: composePosition?.y,
        width: isDragging ? width : 'auto',
      },
    },
  }
}
