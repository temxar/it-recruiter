import { FC, ReactNode } from 'react'

import cx from 'clsx'

import classes from './SecondaryText.module.scss'

interface SecondaryTextProps {
  className?: string
  children?: ReactNode
}

export const SecondaryText: FC<SecondaryTextProps> = ({ className, children }) => (
  <span className={cx(classes.wrap, className)}>{children}</span>
)
