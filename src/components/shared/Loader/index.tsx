import { FC } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import cx from 'clsx'

import classes from './Loader.module.scss'

interface LoaderProps {
  classNameContainer?: string
  className?: string
}

export const Loader: FC<LoaderProps> = ({ classNameContainer, className }) => (
  <div className={cx(classes.wrap, classNameContainer)}>
    <div className={classes.overlay} />
    <CircularProgress className={cx(classes.loader, className)} />
  </div>
)
