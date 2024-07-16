import { Container, Stack } from '@mui/material'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

export const FixedFooterActions = ({ children }: { children: ReactNode }) => {
    return <Container className={styles.container}>
        {children}
    </Container>
}