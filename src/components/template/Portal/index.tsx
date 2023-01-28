import { FC, ReactElement, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useIsClient } from 'usehooks-ts'

interface PortalProps {
  width?: number
  windowWidth?: number
  disable?: boolean
  children?: ReactNode
  container?: HTMLElement | null
}

export const Portal: FC<PortalProps> = ({ children, width, windowWidth, disable, container }) => {
  const isClient = useIsClient()
  const [containerPortal, setContainerPortal] = useState<HTMLDivElement | null>(null)
  const element = container ?? document.body

  useEffect(() => {
    setContainerPortal(document.createElement('div'))
  }, [isClient])

  useEffect(() => {
    if (!containerPortal) {
      return
    }
    if (disable && containerPortal) {
      try {
        element.removeChild(containerPortal)
      } catch (e) {}
      return
    }
    element.appendChild(containerPortal)

    return () => {
      try {
        element.removeChild(containerPortal)
      } catch (e) {}
    }
  }, [containerPortal, disable])

  if (!isClient || !containerPortal) {
    return null
  }

  if (disable) {
    return children as ReactElement
  }

  if (width) {
    if (!windowWidth) {
      return null
    }
    return windowWidth > width ? (children as ReactElement) : createPortal(children, containerPortal)
  }

  return createPortal(children, containerPortal)
}
