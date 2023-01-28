import { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import cx from 'clsx'

import classes from './Close.module.scss'

export enum CloseTypes {
  Default = 'default',
  Mini = 'mini',
  Micro = 'micro',
}

interface CloseProps {
  className?: string
  onClick?: () => void
  type?: CloseTypes
}

export const Close: FC<CloseProps> = ({ className, onClick, type = CloseTypes.Default }) => (
  <IconButton
    aria-label="close"
    className={cx(classes.close, className, classes[type])}
    disableRipple
    onClick={onClick}
    size={type === CloseTypes.Micro || type === CloseTypes.Mini ? 'small' : 'medium'}
    sx={{
      color: (theme) => theme.palette.grey[500],
    }}
  >
    <CloseIcon />
  </IconButton>
)
