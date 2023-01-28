import { FC } from 'react'

import { SelectProps } from '@mui/material'
import { MultiSelect } from 'components/shared/MultiSelect'
import { colors } from 'constants/colors'
import { useAppSelector } from 'store'
import { selectGrades } from 'store/grades/actions'

interface SelectGradesProps {
  value?: number[] | null
  onChange?: (value: number[] | null) => void
  onClose?: () => void
  variant?: SelectProps['variant']
}

export const SelectGrades: FC<SelectGradesProps> = ({ value, onChange, onClose, variant }) => {
  const { data: items } = useAppSelector(selectGrades)

  return (
    <MultiSelect
      color={colors.orange}
      isTags
      items={items}
      onChange={onChange}
      onClose={onClose}
      value={value}
      variant={variant}
    />
  )
}
