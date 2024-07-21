import { Stack, Typography } from "@mui/material"
import styles from './styles.module.scss'
import { Label } from "../label"

export type SimpleInfoProps = {
    label: string
    value: string | number | null | JSX.Element
    vertical?: boolean
    showLines?: boolean
    className?: string
}

export const SimpleInfo = ({ label, value, vertical = false, showLines = false, className }: SimpleInfoProps) => {
    const classes = [styles.container]
    if (vertical) {
        classes.push(styles.vertical)
    }
    if (showLines) {
        classes.push(styles.showLines)
    }
    if (className) {
        classes.push(className)
    }

    return <Stack
        key={`${label}_${value}`}
        className={classes.join(' ')}
    >
        <Label text={label} />
        {value && <Typography sx={{ fontSize: '0.9rem' }} className={styles.textValue} gutterBottom>
            {value}
        </Typography>}
    </Stack>
}