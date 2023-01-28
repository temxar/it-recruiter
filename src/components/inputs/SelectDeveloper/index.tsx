import { FC } from 'react'

import { SelectSearch } from 'components/shared/SelectSearch'
import { useAppDispatch, useAppSelector } from 'store'
import { searchDevelopers, selectSearchDevelopers } from 'store/developers/actions'

interface SelectDeveloperProps {
  disabled?: boolean
  value?: number | null
  onChange?: (value: number | null) => void
}

export const SelectDeveloper: FC<SelectDeveloperProps> = ({ disabled, value, onChange }) => {
  const { data: developers, loading } = useAppSelector(selectSearchDevelopers)

  const dispatch = useAppDispatch()

  ...
}
