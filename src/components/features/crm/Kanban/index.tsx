import { FC } from 'react'

import { KanbanBoard } from 'components/features/crm/Kanban/KanbanBoard'
import { KanbanContext } from 'contexts/KanbanContext'
import { useKanbanColumnsRefs } from 'hooks/kanban/useKanbanColumnsRefs'
import { useKanbanContainerColumnsRef } from 'hooks/kanban/useKanbanContainerColumnsRef'
import { useKanbanContainerRef } from 'hooks/kanban/useKanbanContainerRef'
import { CrmStatusForm } from 'interfaces/api/crm.interfaces'
import { KanbanCardComponent, KanbanStatus } from 'interfaces/kanban.interfaces'

interface KanbanProps<T = any> {
  columns?: KanbanStatus[] | null
  items?: T[][] | null
  loading?: boolean
  loadingStatus?: number | null
  component?: FC<KanbanCardComponent<T>>
  onChangeColumn?: (itemId: number, newIndexColumn: number) => void
  onChangeColumnOrder?: (oldIndex: number, newIndex: number) => void
  onPaginate?: (statusId: number) => void
  updateStatus?: (data: CrmStatusForm) => void
  removeStatus?: (statusId: number) => Promise<void>
}

export const Kanban: FC<KanbanProps> = ({
  ...
  )
}
