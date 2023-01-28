import { FC, ReactNode } from 'react'

import { Tooltip } from '@mui/material'
import cx from 'clsx'

import classes from './IconText.module.scss'

interface IconTextProps {
  className?: string
  children?: ReactNode
  icon?: ReactNode
  tooltip?: string
  openTooltip?: boolean
  disableTooltip?: boolean
  onClick?: () => void
  enablePortal?: boolean
}

export const IconText: FC<IconTextProps> = ({
  className,
  children,
  icon,
  tooltip,
  openTooltip,
  disableTooltip,
  onClick,
  enablePortal = false,
}) => (
  <div className={cx(classes.wrap, className)} onClick={onClick}>
    <Tooltip
      disableInteractive
      open={openTooltip ?? (disableTooltip ? false : undefined)}
      placement="top"
      PopperProps={{ disablePortal: !enablePortal }}
      title={tooltip}
    >
      <div className={classes.cont}>
        {icon && <span className={classes.icon}>{icon}</span>}
        <span className={classes.text}>{children}</span>
      </div>
    </Tooltip>
  </div>
)
