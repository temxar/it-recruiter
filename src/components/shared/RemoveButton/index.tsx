import { FC, MouseEvent, ReactNode } from 'react'

import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { Button, ButtonColors } from 'components/shared/Button'

interface SaveButtonProps {
  className?: string
  children?: ReactNode
  fullWidth?: boolean
  color?: ButtonColors
  onClick?: (event: MouseEvent) => void
  loading?: boolean
}

export const RemoveButton: FC<SaveButtonProps> = ({
  className,
  children,
  fullWidth,
  color = ButtonColors.Error,
  onClick,
  loading,
}) => (
  <Button
    className={className}
    color={color}
    fullWidth={fullWidth}
    icon={<DeleteIcon />}
    loading={loading}
    onClick={onClick}
  >
    {children}
  </Button>
)
