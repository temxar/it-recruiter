import { FC } from 'react'

import { Select } from 'components/shared/Select'
import { colors } from 'constants/colors'
import { ResourceTypes } from 'interfaces/api/resourceTypes.interfaces'
import { useAppSelector } from 'store'
import { selectResourceTypes } from 'store/resourceTypes/actions'

interface SelectTypeProps {
  value?: number | null
  onChange?: (value: number | null) => void
}

export const SelectType: FC<SelectTypeProps> = ({ value, onChange }) => {
  const { data: resourceTypes } = useAppSelector(selectResourceTypes)

  return (
    <Select
      isTags
      items={resourceTypes?.map((item) => ({
        ...item,
        color: item.code === ResourceTypes.Supply ? colors.blueDark : colors.turquoise,
      }))}
      onChange={onChange}
      value={value}
    />
  )
}
