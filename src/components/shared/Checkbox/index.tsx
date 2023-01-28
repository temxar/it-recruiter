import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Checkbox as CheckboxNative, FormControlLabel } from '@mui/material'

interface CheckboxProps {
  value?: boolean
  onChange?: (value: boolean) => void
  label?: string
}

export const Checkbox: FC<CheckboxProps> = ({ value, onChange, label }) => {
  const [valueInternal, setValueInternal] = useState(!!value)

  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setValueInternal(checked)
    onChange?.(checked)
  }

  useEffect(() => {
    setValueInternal(!!value)
  }, [value])

  return (
    <FormControlLabel
      control={<CheckboxNative checked={valueInternal} onChange={onChangeInternal} sx={{ marginRight: '5px' }} />}
      label={label}
      sx={{ marginLeft: '-6px' }}
    />
  )
}
