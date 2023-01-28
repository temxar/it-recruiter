import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { Button, ButtonColors } from 'components/shared/Button'
import { colors } from 'constants/colors'

interface EditButtonProps {
  className?: string
  children?: ReactNode
  fullWidth?: boolean
  color?: ButtonColors
  onClick?: (event: MouseEvent) => void
  loading?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const EditButton: FC<EditButtonProps> = ({
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
    icon={<EditTwoToneIcon sx={{ color: colors.blue }} />}
    loading={loading}
    onClick={onClick}
  >
    {children}
  </Button>
)
