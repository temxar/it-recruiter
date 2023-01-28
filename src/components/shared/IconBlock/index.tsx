import { FC, ReactNode } from 'react'

import cx from 'clsx'
import { IconText } from 'components/shared/IconText'

import classes from './IconBlock.module.scss'

interface IconBlockProps {
  className?: string
  children?: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

export const IconBlock: FC<IconBlockProps> = ({ className, icon, children, onClick }) => (
  <IconText className={cx(classes.wrap, className)} icon={icon} onClick={onClick}>
    {children}
  </IconText>
)
