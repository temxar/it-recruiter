import { FC } from 'react'

import { Select } from 'components/shared/Select'
import { colors } from 'constants/colors'
import { useAppSelector } from 'store'
import { selectWorkTypes } from 'store/workTypes/actions'

interface SelectWorkTypeProps {
  value?: number | null
  onChange?: (value: number | null) => void
}

export const SelectWorkType: FC<SelectWorkTypeProps> = ({ value, onChange }) => {
  const { data: workTypes } = useAppSelector(selectWorkTypes)

  return <Select color={colors.violetDark} isTags items={workTypes} onChange={onChange} value={value} />
}
