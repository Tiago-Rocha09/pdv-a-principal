import { Stack, Typography } from "@mui/material"
import styles from './styles.module.scss'
import { Label } from "../label"

export type SimpleInfoProps = {
    label: string
    value: string | number | null
    vertical?: boolean
    showLines?: boolean
}

export const SimpleInfo = ({ label, value, vertical = false, showLines = false }: SimpleInfoProps) => {
    return <Stack key={`${label}_${value}`} className={`${styles.container} ${vertical ? styles.vertical : ''} ${showLines ? styles.showLines : ''}`}>
        <Label text={label} />
        {value && <Typography sx={{ fontSize: '0.9rem' }} className={styles.textValue} gutterBottom>
            {value}
        </Typography>}
    </Stack>
}