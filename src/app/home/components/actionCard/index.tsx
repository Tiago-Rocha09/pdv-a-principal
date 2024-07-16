import { Typography } from "@mui/material"
import React, { ReactNode } from "react"
import styles from './styles.module.scss'
import Link from "next/link"

type ActionCardProps = {
    icon: ReactNode
    title: string
    helperText?: string
    href: string
}

export const ActionCard = ({ icon, title, href }: ActionCardProps) => {
    return (
        <Link
            href={href}
            className={styles.item}>
            {icon}
            <Typography variant="button" component="p" color="white">
                {title}
            </Typography>

        </Link>
    )
}