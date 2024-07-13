import { Container } from '@mui/material'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

export const PageWrapper = ({ children }: { children: ReactNode }) => {
    return <Container className={styles.container}>
        <div className={styles.subContainer}>
            {children}
        </div>

    </Container>
}