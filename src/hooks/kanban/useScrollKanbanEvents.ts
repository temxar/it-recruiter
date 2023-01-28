import { RefObject, useCallback, useEffect } from 'react'

import { Orientation, scrollTo } from 'utils/scrollTo'

const getterPositionScroll = () => {
  let position = 'stop'
  const setPosition = (value: string) => (position = value)
  const getPosition = () => position
  return { setPosition, getPosition }
}

export const useScrollKanbanEvents = (ref: RefObject<HTMLDivElement>) => {
  const { setPosition, getPosition } = getterPositionScroll()

  const increment = 7

  const scroll = () => {
    const position = getPosition()
    ...
    setTimeout(scroll, 10)
  }

  const onScrollLeft = useCallback(() => {
    const position = getPosition()
    setPosition('left')
    if (position === 'stop') {
      scroll()
    }
  }, [])

  const onScrollRight = useCallback(() => {
    const position = getPosition()
    setPosition('right')
    if (position === 'stop') {
      scroll()
    }
  }, [])

  const onScrollStop = useCallback(() => {
    setPosition('stop')
  }, [])

  const scrollToEnd = useCallback(() => {
    window.requestAnimationFrame(() => {
      scrollTo({
        element: ref.current,
        to: ref.current?.scrollWidth,
        orientation: Orientation.Horizontal,
      })
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll-left-kanban', onScrollLeft)
    window.addEventListener('scroll-right-kanban', onScrollRight)
    window.addEventListener('scroll-stop-kanban', onScrollStop)
    window.addEventListener('scroll-end-kanban', scrollToEnd)

    return () => {
      window.removeEventListener('scroll-left-kanban', onScrollLeft)
      window.removeEventListener('scroll-right-kanban', onScrollRight)
      window.removeEventListener('scroll-stop-kanban', onScrollStop)
      window.removeEventListener('scroll-end-kanban', scrollToEnd)
    }
  }, [])
}
