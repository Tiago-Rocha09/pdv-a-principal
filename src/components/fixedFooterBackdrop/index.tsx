import { Container } from '@mui/material'
import styles from './styles.module.scss'

type FixedFooterBackdropProps = {
    height?: string
}

export const FixedFooterBackdrop = ({
    height = "calc(40px + 2.25rem)"
}: FixedFooterBackdropProps) => {
    return <Container
        className={styles.container}
        sx={{
            height
        }}
    />
}