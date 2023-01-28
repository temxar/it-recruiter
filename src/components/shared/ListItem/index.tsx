import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './ListItem.module.scss'

interface ListItemProps {
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export const ListItem: FC<ListItemProps> = ({ className, children, onClick }) => (
  <div className={cx(classes.wrap, className)} onClick={onClick}>
    {children}
  </div>
)
