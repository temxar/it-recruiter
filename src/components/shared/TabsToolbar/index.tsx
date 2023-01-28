import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './TabsToolbar.module.scss'

interface RightToolbarProps {
  className?: string
  children?: ReactNode
  rightContent?: ReactNode
}

export const TabsToolbar: FC<RightToolbarProps> = ({ className, children, rightContent }) => (
  <div className={cx(classes.wrap, className)}>
    {children}
    {rightContent}
  </div>
)
