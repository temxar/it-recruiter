import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './ScrollBox.module.scss'

interface ScrollBoxProps {
  className?: string
  children?: ReactNode
}

export const ScrollBox: FC<ScrollBoxProps> = ({ className, children }) => (
  <div className={cx(classes.wrap, 'scroll', className)}>{children}</div>
)
