import { FC } from 'react'

import { SelectProps } from '@mui/material'
import { MultiSelect } from 'components/shared/MultiSelect'
import { colors } from 'constants/colors'
import { useAppSelector } from 'store'
import { selectWorkTypes } from 'store/workTypes/actions'

interface SelectWorkTypesProps {
  value?: number[] | null
  onChange?: (value: number[] | null) => void
  onClose?: () => void
  variant?: SelectProps['variant']
}

export const SelectWorkTypes: FC<SelectWorkTypesProps> = ({ value, onChange, onClose, variant }) => {
  const { data: workTypes } = useAppSelector(selectWorkTypes)

  return (
    <MultiSelect
      color={colors.violetDark}
      isTags
      items={workTypes}
      onChange={onChange}
      onClose={onClose}
      value={value}
      variant={variant}
    />
  )
}
