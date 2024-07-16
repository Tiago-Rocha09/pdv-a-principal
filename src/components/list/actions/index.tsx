import { CardActions } from "@mui/material"
import { ReactNode } from "react"
import styles from './styles.module.scss'

type ListActionsProps = {
    children: ReactNode
}
export const ListActions = ({ children }: ListActionsProps) => {
    return <CardActions className={styles.container}>
        {children}
    </CardActions>
}