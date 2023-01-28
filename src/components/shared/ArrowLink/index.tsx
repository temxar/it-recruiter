import { FC } from 'react'

import ArrowIcon from '@mui/icons-material/ArrowForwardRounded'
import cx from 'clsx'

import classes from './ArrowLink.module.scss'

interface ArrowLinkProps {
  className?: string
}

export const ArrowLink: FC<ArrowLinkProps> = ({ className }) => (
  <div className={cx(classes.arrow, className)}>
    <ArrowIcon />
  </div>
)
