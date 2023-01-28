import { createTheme } from '@mui/material/styles'
import { colors } from 'constants/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    text: {
      primary: '#515360',
      secondary: colors.default,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: '#f59e32',
    },
    success: {
      main: '#1aab7f',
    },
  },

  typography: {
    fontFamily: '"Public Sans", "Roboto", sans-serif',
  },
})
