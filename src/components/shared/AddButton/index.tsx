import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'

import AddIcon from '@mui/icons-material/AddCircleOutline'
import { Button, ButtonColors, ButtonSizes } from 'components/shared/Button'

import classes from './AddButton.module.scss'

interface AddButtonProps {
  className?: string
  children?: ReactNode
  fullWidth?: boolean
  color?: ButtonColors
  onClick?: (event: MouseEvent) => void
  loading?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  size?: ButtonSizes
}

export const AddButton: FC<AddButtonProps> = ({
  className,
  children,
  fullWidth,
  color = ButtonColors.Default,
  onClick,
  loading,
  htmlType,
  size,
}) => (
  <Button
    className={className}
    color={color}
    fullWidth={fullWidth}
    htmlType={htmlType}
    icon={<AddIcon className={classes.icon} />}
    loading={loading}
    onClick={onClick}
    size={size}
  >
    {children}
  </Button>
)
