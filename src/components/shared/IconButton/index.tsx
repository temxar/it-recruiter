import { forwardRef, ReactNode } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import { IconButton as MuiIconButton } from '@mui/material'

import classes from './IconButton.module.scss'

interface IconButtonProps {
  isFilled?: boolean
  onOpen?: () => void
  children?: ReactNode
  className?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ isFilled, onOpen, children }, ref) => (
  <MuiIconButton className={classes.wrap} disableRipple onClick={onOpen} ref={ref}>
    {isFilled && <CircleIcon className={classes.circle} />}
    {children}
  </MuiIconButton>
))
