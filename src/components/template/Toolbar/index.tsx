import { FC, ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { LinearProgress, Toolbar as ToolbarNative } from '@mui/material'
import cx from 'clsx'
import { useAppDispatch, useAppSelector } from 'store'
import { updateLoadingToolbar } from 'store/layout/actions'
import { selectLoadingToolbar } from 'store/layout/selectors'

import classes from './Toolbar.module.scss'

interface ToolbarProps {
  className?: string
  title?: string
  children?: ReactNode
}

export const Toolbar: FC<ToolbarProps> = ({ className, title, children }) => {
  const loading = useAppSelector(selectLoadingToolbar)
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateLoadingToolbar(false))
  }, [location.pathname])

  return (
    <ToolbarNative className={cx(classes.wrap, className)}>
      <h1 className={classes.title}>{title}</h1>
      {loading && <LinearProgress classes={{ bar: classes.bar }} className={classes.progress} />}
      {children}
    </ToolbarNative>
  )
}
