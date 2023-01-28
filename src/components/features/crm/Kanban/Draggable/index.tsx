import { FC, ReactNode } from 'react'

import cx from 'clsx'
import classes from 'components/features/crm/Kanban/Draggable/Draggable.module.scss'
import { Portal } from 'components/template/Portal'
import { useDragKanbanCard } from 'hooks/kanban/useDragKanbanCard'

interface DraggableProps {
  children?: ReactNode
  isDragging?: boolean
  height?: number
}

export const Draggable: FC<DraggableProps> = ({ children, isDragging, height }) => {
  const { getContainer } = useDragKanbanCard()

  return (
    <>
      <Portal container={getContainer()} disable={!isDragging}>
        {children}
      </Portal>

      {!!height && <div className={cx(classes.placeholder, { [classes.show]: isDragging })} style={{ height }} />}
    </>
  )
}
