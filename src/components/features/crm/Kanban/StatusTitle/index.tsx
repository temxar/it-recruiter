import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './StatusTitle.module.scss'

interface StatusTitleProps {
  className?: string
  children?: ReactNode
  color?: string | null
}

export const StatusTitle: FC<StatusTitleProps> = ({ className, children, color }) => (
  <span className={cx(classes.title, className)} style={{ color: color ?? undefined }}>
    <span>{children}</span>
  </span>
)
