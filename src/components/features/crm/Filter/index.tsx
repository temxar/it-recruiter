import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Popover } from '@mui/material'
import { IconButton } from 'components/shared/IconButton'
import { usePage } from 'hooks/usePage'

import classes from './Filter.module.scss'

interface FilterProps {
  children: ReactNode
  filters?: Partial<Record<string, any>>
}

export const Filter: FC<FilterProps> = ({ children, filters }) => {
  const [open, setOpen] = useState(false)

  const isFilled =
    !!filters &&
    !!Object.keys(filters).filter((key) => {
      const item = filters[key]
      return item && Array.isArray(item) ? item.length : !!item
    }).length

  const anchorEl = useRef<HTMLButtonElement>(null)

  const { changePage } = usePage()

  useEffect(() => {
    changePage(1)
  }, [filters])

  return (
    <>
      <IconButton isFilled={isFilled} onOpen={() => setOpen(true)} ref={anchorEl}>
        <FilterAltOutlinedIcon className={classes.icon} />
      </IconButton>

      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{ paper: classes.popover }}
        onClose={() => setOpen(false)}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.cont}>{children}</div>
      </Popover>
    </>
  )
}
