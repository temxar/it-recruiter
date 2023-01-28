import { UIEvent, useEffect, useMemo } from 'react'

export const useScrollKanbanColumn = (currentCount?: number | null, totalCount?: number | null) => {
  const call = useMemo(() => {
    ...
    return { get, update }
  }, [currentCount])

  let fnScrollPaginate: () => void = () => {}
  const onScrollPaginate = (fn: () => void) => {
    fnScrollPaginate = fn
  }

  const onPaginate = () => {
    if (!call.get()) {
      fnScrollPaginate()
      call.update()
    }
  }

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    ...
  }

  useEffect(() => {
    if (!currentCount || !totalCount || currentCount >= totalCount || currentCount > 5) {
      return
    }
    onPaginate()
  }, [currentCount])

  return {
    onScrollPaginate,
    scrollProps: {
      onScroll,
    },
  }
}
