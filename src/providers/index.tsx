'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ptBR } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/pt-br';

const theme = createTheme(
  {
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (max-width: 600px)': {
              paddingLeft: 8,
              paddingRight: 8,
            },
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1000,
        xl: 1000,
      },
    },
  },
  ptBR,
)

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
      >
        {children}
      </LocalizationProvider>
      <ToastContainer />
    </ThemeProvider>
  )
}
