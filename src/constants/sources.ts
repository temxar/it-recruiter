import { Source } from 'interfaces/api/sources.interfaces'
import { MuiColumn } from 'interfaces/common.interfaces'

export const sourcesColumns: readonly MuiColumn<keyof Source>[] = [
  {
    key: 'appId',
    label: 'ID приложения',
    width: 150,
  },

  {
    key: 'sourceType',
    label: 'Тип источника',
    getValue: (value) => value.name,
    width: 250,
  },

  {
    key: 'name',
    label: 'Название источника',
  },
]
