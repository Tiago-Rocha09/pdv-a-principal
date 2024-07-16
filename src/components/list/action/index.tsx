import { CustomButton } from "@/components/button"
import styles from './styles.module.scss'
import { ButtonProps } from "@mui/material"

type ListActionProps = {
    text: string
} & ButtonProps

export const ListAction = ({ text, ...rest }: ListActionProps) => {
    return <CustomButton text={text} width="10rem" className={styles.button}  {...rest} />
}