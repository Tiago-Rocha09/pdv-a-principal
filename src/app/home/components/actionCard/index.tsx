import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

type ActionCardProps = {
  icon: ReactNode
  title: string
  disabled?: boolean
  helperText?: string
  href: string
}

export const ActionCard = ({ icon, title, href, disabled = false }: ActionCardProps) => {
  return (
    <Link href={!disabled ? href : ''} className={`${styles.item} ${disabled ? styles.disabled : ''}`}>
      {icon}
      <Typography variant="button" component="p" color="white">
        {title}
      </Typography>
    </Link>
  )
}
