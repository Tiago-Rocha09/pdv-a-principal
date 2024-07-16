import { Button, ButtonProps, CircularProgress } from "@mui/material"
import colors from '@/styles/variables.module.scss'
import styles from './styles.module.scss'

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
    width = "400px",
    isLoading = false,
    className = "",
    ...rest
}: CustomButtonProps) => {
    return <Button
        {...rest}
        variant={variant}
        className={`${styles.button} ${className}`}
        disabled={isLoading}
        sx={{
            width,
            backgroundColor: bgColor,
            ':hover': {
                backgroundColor: bgColor,
                opacity: 0.8
            }
        }}>
        {text}
        {isLoading && <CircularProgress size={20} />}
    </Button>
}