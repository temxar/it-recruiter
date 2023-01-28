import { forwardRef } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { IconButton } from '@mui/material'

import classes from './FilterIcon.module.scss'

interface FilterIconProps {
  isFilled?: boolean
  onOpen?: () => void
}

export const FilterIcon = forwardRef<HTMLButtonElement, FilterIconProps>(({ isFilled, onOpen }, ref) => (
  <IconButton className={classes.wrap} disableRipple onClick={onOpen} ref={ref}>
    {isFilled && <CircleIcon className={classes.circle} />}
    <FilterAltIcon className={classes.icon} />
  </IconButton>
))
