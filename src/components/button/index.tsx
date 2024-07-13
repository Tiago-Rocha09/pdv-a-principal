import { Button, ButtonProps } from "@mui/material"
import colors from '@/styles/variables.module.scss'
import styles from './styles.module.scss'
import { ClipLoader } from "react-spinners"

type CustomButtonProps = {
    text: string,
    bgColor?: string,
    width?: string,
    isLoading?: boolean
} & ButtonProps

export const CustomButton = ({
    text,
    bgColor = colors.pinkStrongColor,
    variant = 'contained',
    width = "fit-content",
    isLoading = false,
    ...rest
}: CustomButtonProps) => {
    return <Button
        {...rest}
        variant={variant}
        className={styles.button}
        sx={{
            width,
            backgroundColor: bgColor,
            ':hover': {
                backgroundColor: bgColor,
                opacity: 0.8
            }
        }}>
        {text}
        {isLoading && <ClipLoader size={20}/>}
    </Button>
}