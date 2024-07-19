import styles from './styles.module.scss'
import { FormLabel, FormLabelProps } from "@mui/material"

type LabelProps = {
    text: string,
} & FormLabelProps

export const Label = ({ text, ...rest }: LabelProps) => {

    return <FormLabel className={styles.label} {...rest}>{text}</FormLabel>

}