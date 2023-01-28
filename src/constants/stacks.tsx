import { Tag } from 'components/shared/Tag'
import { colors } from 'constants/colors'
import { Stack } from 'interfaces/api/stacks.interfaces'
import { MuiColumn } from 'interfaces/common.interfaces'

export const stacksColumns: readonly MuiColumn<keyof Stack>[] = [
  {
    key: 'id',
    label: 'ID',
    width: 100,
  },
  {
    key: 'name',
    label: 'Наименование',
    getValue: (value) => <Tag color={colors.blue}>{value}</Tag>,
  },
]
