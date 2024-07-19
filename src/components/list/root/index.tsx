import { List } from "@mui/material"
import { ReactNode } from "react"
import styles from './styles.module.scss'

type ListRootProps = {
    children: ReactNode
}

export const ListRoot = ({ children }: ListRootProps) => {
    return <List className={styles.container}>
        {children}
    </List>
}