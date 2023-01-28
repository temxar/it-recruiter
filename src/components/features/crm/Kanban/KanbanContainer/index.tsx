import { FC, ReactNode, useEffect } from 'react'

import cx from 'clsx'
import { KanbanScrollButton } from 'components/features/crm/Kanban/KanbanScrollButton'
import { useKanbanContainer } from 'hooks/kanban/useKanbanContainer'
import { useScrollKanban } from 'hooks/kanban/useScrollKanban'
import { CrmLeadStatus } from 'interfaces/api/crm.interfaces'

import classes from './KanbanContainer.module.scss'

interface KanbanContainerProps {
  children?: ReactNode
  columns?: CrmLeadStatus[] | null
}

export const KanbanContainer: FC<KanbanContainerProps> = ({ children, columns }) => {
  const { ref, refColumns, hidePrev, hideNext, scrollPrev, scrollNext, scrollLeft } = useScrollKanban(columns)
  const { setContainer, setContainerColumns, containerProps } = useKanbanContainer()

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current)
    }
  }, [ref.current])

  useEffect(() => {
    if (refColumns.current) {
      setContainerColumns(refColumns.current)
    }
  }, [refColumns.current])

  return (
    <div className={cx(classes.wrap, { [classes.scroll0]: scrollLeft === 0 })}>
      <div className={classes.scroll} ref={ref} {...containerProps}>
        <KanbanScrollButton className={classes.scrollButtonPrev} hide={hidePrev} onClick={scrollPrev} to="prev" />
        <KanbanScrollButton className={classes.scrollButtonNext} hide={hideNext} onClick={scrollNext} to="next" />

        <div className={classes.cont} ref={refColumns}>
          {children}
        </div>
      </div>
    </div>
  )
}
