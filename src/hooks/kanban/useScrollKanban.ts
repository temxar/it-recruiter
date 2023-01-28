import { useContext, useEffect, useRef, useState } from 'react'

import { useScroll } from 'ahooks'
import { KanbanContext } from 'contexts/KanbanContext'
import { useScrollKanbanEvents } from 'hooks/kanban/useScrollKanbanEvents'
import { CrmLeadStatus } from 'interfaces/api/crm.interfaces'
import { Orientation, scrollTo } from 'utils/scrollTo'

export const useScrollKanban = (columns?: CrmLeadStatus[] | null) => {
  const [ready, setReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const refColumns = useRef<HTMLDivElement>(null)
  const scroll = useScroll(ref)
  const scrollLeft = scroll?.left ?? 0
  const scrollRight =
    ready && ref.current && scroll ? ref.current.scrollWidth - (scroll.left + ref.current.offsetWidth) : 0
  const incrementColumns = 1
  const hidePrev = !scrollLeft
  const hideNext = !scrollRight

  const { columnWidth } = useContext(KanbanContext)
  useScrollKanbanEvents(ref)

  const getMaxColumnIndex = () => {
   ...
    return maxColumnIndex < 0 ? 0 : maxColumnIndex
  }

  const scrollOnClickButton = (indexColumn: number) => {
    const maxColumnIndex = getMaxColumnIndex()
    scrollTo({
      ...
    })
  }

  const scrollNext = () => {
    let indexColumn
    const maxColumnIndex = getMaxColumnIndex()
    ...
    scrollOnClickButton(indexColumn)
  }

  const scrollPrev = () => {
    let indexColumn
    const current = Math.floor(scrollLeft / columnWidth)
    if (current - incrementColumns <= 0) {
      indexColumn = 0
    } else {
      indexColumn = current - incrementColumns
    }
    scrollOnClickButton(indexColumn)
  }

  useEffect(() => {
    if (columns) {
      setReady(true)
    }
  }, [!!columns])

  return { ref, refColumns, hidePrev, hideNext, scrollPrev, scrollNext, scrollLeft }
}
