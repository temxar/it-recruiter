import { TextFieldProps } from '@mui/material'

export const dateInputProps = (params: TextFieldProps): TextFieldProps => ({
  ...params,
  inputProps: {
    ...params.inputProps,
    placeholder: 'dd.mm.yyyy',
  },
})
