import { Typography } from "@mui/material"
import React, { ReactNode } from "react"
import styles from './styles.module.scss'

type ActionCardProps = {
    icon: ReactNode
    title: string
    action: () => void
}

export const ActionCard = ({ icon, title, action }: ActionCardProps) => {
    return (
        <div
            className={styles.item}>
            {icon}
            <Typography variant="button" component="p" color="white">
                {title}
            </Typography>

        </div>
    )
}