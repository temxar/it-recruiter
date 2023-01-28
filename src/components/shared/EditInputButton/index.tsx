import { FC } from 'react'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import cx from 'clsx'
import { Button, ButtonColors, ButtonSizes } from 'components/shared/Button'
import { colors } from 'constants/colors'

import classes from './EditInputButton.module.scss'

interface EditInputButtonProps {
  className?: string
  onClick?: () => void
}

export const EditInputButton: FC<EditInputButtonProps> = ({ className, onClick }) => (
  <Button
    className={cx(classes.button, className)}
    color={ButtonColors.White}
    icon={<EditTwoToneIcon sx={{ color: colors.default }} />}
    onClick={onClick}
    size={ButtonSizes.Small}
  />
)
