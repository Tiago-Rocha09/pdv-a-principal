'use client'

import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
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
});

export default function GlobalProvider({
    children,
}: {
    children: React.ReactNode
}) {

    return <ThemeProvider theme={theme}>
        {children}
        <ToastContainer />
    </ThemeProvider>
}