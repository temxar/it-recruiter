import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import cx from 'clsx'
import { useIsMountedAnimation } from 'hooks/useIsMountedAnimation'

import classes from './Button.module.scss'

export enum ButtonColors {
  Default = 'defaultColor',
  Primary = 'primary',
  White = 'white',
  Blue = 'blue',
  BlueDark = 'blueDark',
  Green = 'green',
  GreenDark = 'greenDark',
  Turquoise = 'turquoise',
  Brown = 'brown',
  Orange = 'orange',
  DarkOrange = 'darkOrange',
  OrangeRed = 'orangeRed',
  Red = 'red',
  Error = 'error',
  Purple = 'purple',
  PurpleDark = 'purpleDark',
  Violet = 'violet',
}

export enum ButtonSizes {
  Default = 'default',
  Small = 'small',
  Mini = 'mini',
  Medium = 'medium',
}

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'onMouseDown' | 'onMouseUp'> {
  className?: string
  children?: ReactNode
  icon?: ReactNode
  size?: ButtonSizes
  color?: ButtonColors
  fullWidth?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  stopPropagation?: boolean
  onClick?: (event: MouseEvent) => void
  onMouseDown?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  loading?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  icon,
  size = ButtonSizes.Default,
  color = ButtonColors.Default,
  fullWidth,
  htmlType,
  onClick,
  onMouseDown,
  onMouseUp,
  stopPropagation,
  loading,
  ...props
}) => {
  const { isMounted: isMountedLoader, openClass: openClassLoader } = useIsMountedAnimation(loading, true)

  const onClickInternal = (event: MouseEvent) => {
    if (stopPropagation) {
      event.stopPropagation()
    }
    onClick?.(event)
  }

  const onMouseDownInternal = (event: MouseEvent) => {
    if (stopPropagation) {
      event.stopPropagation()
    }
    onMouseDown?.(event)
  }

  const onMouseUpInternal = (event: MouseEvent) => {
    if (stopPropagation) {
      event.stopPropagation()
    }
    onMouseUp?.(event)
  }

  return (
    <button
      className={cx(className, classes.button, classes[color], classes[size], {
        [classes.fullWidth]: fullWidth,
        [classes.loading]: loading,
        [classes.noIcon]: !icon,
      })}
      onClick={onClickInternal}
      onMouseDown={onMouseDownInternal}
      onMouseUp={onMouseUpInternal}
      type={htmlType ?? 'button'}
      {...props}
    >
      {icon && (
        <span className={classes.icon}>
          {isMountedLoader && <CircularProgress className={cx(classes.loader, openClassLoader)} size="1em" />}
          <span className={classes.iconSvg}>{icon}</span>
        </span>
      )}
      {children && <span className={classes.text}>{children}</span>}
      {!icon && isMountedLoader && <CircularProgress className={cx(classes.loader, openClassLoader)} size="1em" />}
    </button>
  )
}
