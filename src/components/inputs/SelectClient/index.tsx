import { FC } from 'react'

import { SelectSearch } from 'components/shared/SelectSearch'
import { useAppDispatch, useAppSelector } from 'store'
import { searchClients, selectSearchClients } from 'store/crm/actions'

interface SelectClientProps {
  value?: number | null
  onChange?: (value: number | null) => void
  disabled?: boolean
}

export const SelectClient: FC<SelectClientProps> = ({ disabled, value, onChange }) => {
  const { data: clients, loading } = useAppSelector(selectSearchClients)

  const dispatch = useAppDispatch()

  const onChangeInput = (valueInput: string) => {
    dispatch(searchClients(valueInput))
  }

  return (
    <SelectSearch
      disabled={disabled}
      items={clients}
      loading={loading}
      onChange={onChange}
      onChangeInput={onChangeInput}
      value={value}
    />
  )
}
