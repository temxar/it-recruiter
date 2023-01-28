import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import { Button, ButtonColors } from 'components/shared/Button'

interface SaveButtonProps {
  className?: string
  children?: ReactNode
  fullWidth?: boolean
  color?: ButtonColors
  onClick?: (event: MouseEvent) => void
  loading?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const SaveButton: FC<SaveButtonProps> = ({
  className,
  children,
  fullWidth,
  color = ButtonColors.Blue,
  onClick,
  loading,
  htmlType,
}) => (
  <Button
    className={className}
    color={color}
    fullWidth={fullWidth}
    htmlType={htmlType}
    icon={<DoneIcon />}
    loading={loading}
    onClick={onClick}
  >
    {children}
  </Button>
)
