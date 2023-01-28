import { Menu } from '@mui/material'
import { MenuProps } from '@mui/material/Menu'

import classes from './ContextMenu.module.scss'

export const ContextMenu = (props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    elevation={0}
    PaperProps={{
      className: classes.wrap,
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
)
