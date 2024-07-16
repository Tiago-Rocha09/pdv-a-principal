import { Stack, Typography } from "@mui/material"
import styles from './styles.module.scss'

type SimpleInfoProps = {
    label: string
    value: string
}

export const SimpleInfo = ({ label, value }: SimpleInfoProps) => {
    return <Stack key={`${label}_${value}`} className={styles.container}>
        <Typography className={styles.textKey} gutterBottom>
            {label}
        </Typography>
        {value && <Typography className={styles.textValue} gutterBottom>
            {value}
        </Typography>}
    </Stack>
}