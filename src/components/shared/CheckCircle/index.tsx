import { FC } from 'react'

import CheckIcon from '@mui/icons-material/Check'
import { Tooltip } from '@mui/material'
import cx from 'clsx'

import classes from './CheckCircle.module.scss'

interface CheckCircleProps {
  className?: string
  color?: string | null
  checked?: boolean
  onChange?: (value: boolean) => void
}

export const CheckCircle: FC<CheckCircleProps> = ({ className, color, checked, onChange }) => (
  <Tooltip disableInteractive placement="top" title={checked ? 'Дефолтный статус' : 'Назначить дефолтным'}>
    <div className={cx(classes.wrap, className, { [classes.checked]: checked })} onClick={() => onChange?.(!checked)}>
      <div className={classes.cont} style={{ color: color ?? undefined }}>
        <CheckIcon />
      </div>
    </div>
  </Tooltip>
)
