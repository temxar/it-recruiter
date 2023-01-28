import { FC, ReactNode } from 'react'

import { uncapitalize } from '@@@/sdd-helper'
import { Tooltip } from '@mui/material'
import cx from 'clsx'
import { colors } from 'constants/colors'

import classes from './Tag.module.scss'

export enum TagTypes {
  Default = 'default',
  Status = 'status',
  Mini = 'mini',
}

interface TagProps {
  className?: string
  classNameChildren?: string
  children?: ReactNode
  type?: TagTypes
  color?: string | null
  tooltip?: string
  openTooltip?: boolean
  disableTooltip?: boolean
  onClick?: () => void
  clickable?: boolean
  isBox?: boolean
}

export const Tag: FC<TagProps> = ({
  className,
  children,
  classNameChildren,
  type = TagTypes.Default,
  color = colors.default,
  tooltip,
  openTooltip,
  disableTooltip,
  onClick,
  clickable,
  isBox,
}) => (
  <Tooltip
    disableInteractive
    open={openTooltip ?? (disableTooltip ? false : undefined)}
    placement="top"
    PopperProps={{
      disablePortal: true,
    }}
    title={tooltip}
  >
    <span
      className={cx(classes.tag, className, classes[type], {
        [classes.clickable]: (onClick && typeof clickable === 'undefined') || clickable,
        [classes.isBox]: isBox,
      })}
      style={{ color: color ?? colors.default }}
    >
      <span className={cx(classes.children, classNameChildren)}>
        {typeof children === 'string' && !isBox
          ? type === TagTypes.Status
            ? uncapitalize(children)
            : children.toLowerCase()
          : children}
      </span>
    </span>
  </Tooltip>
)
