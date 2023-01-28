import { FC, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { theme } from 'constants/theme'
import { toastsProps } from 'constants/toasts'
import { ru } from 'date-fns/locale'
import { store } from 'store'

/**
 * Wraps Component into providers
 * @param Component Component
 * @returns Wrapped Component
 */
export function withProviders<T = any>(Component: FC<T>) {
  return (props: JSX.IntrinsicAttributes & T): ReactElement => (
    <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <Helmet htmlAttributes={{ lang: 'ru' }} />
            <BrowserRouter>
              <Component {...props} />
              <ToastContainer {...toastsProps} />
            </BrowserRouter>
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}
