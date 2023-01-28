import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './SecondaryTitle.module.scss'

interface SecondaryTitleProps {
  className?: string
  children?: ReactNode
}

export const SecondaryTitle: FC<SecondaryTitleProps> = ({ className, children }) => (
  <span className={cx(classes.wrap, className)}>{children}</span>
)
