import { FC } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import cx from 'clsx'
import { colors } from 'constants/colors'

import classes from './ColorSelection.module.scss'

interface ColorSelectionProps {
  className?: string
  color?: string | null
  onChangeColor?: (color: string | null) => void
}

export const ColorSelection: FC<ColorSelectionProps> = ({ className, color, onChangeColor }) => {
  const activeColor = color ?? colors.default

  return (
    <div className={cx(classes.colors, className)}>
      {Object.keys(colors).map((key) => (
        <div
          className={cx(classes.color, { [classes.active]: activeColor && activeColor === colors[key] })}
          key={key}
          onClick={() => onChangeColor?.(colors[key])}
          style={{ color: colors[key] }}
        >
          {!!activeColor && activeColor === colors[key] && <DoneIcon />}
        </div>
      ))}
    </div>
  )
}
