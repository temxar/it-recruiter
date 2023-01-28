import { FC, useEffect } from 'react'

import { SelectProps } from '@mui/material'
import { Select } from 'components/shared/Select'
import { TagTypes } from 'components/shared/Tag'
import { useAppDispatch, useAppSelector } from 'store'
import { getDevelopersStatuses, selectDevelopersStatuses } from 'store/developers/actions'

interface SelectDeveloperStatusProps {
  value?: number | null
  onChange?: (value: number | null) => void
  onClose?: () => void
  variant?: SelectProps['variant']
}

export const SelectDeveloperStatus: FC<SelectDeveloperStatusProps> = ({ value, onChange, onClose, variant }) => {
  const { data: statuses } = useAppSelector(selectDevelopersStatuses)

  const dispatch = useAppDispatch()

  ...
}
