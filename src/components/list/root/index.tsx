import { List } from "@mui/material"
import { ReactNode } from "react"

type ListRootProps = {
    children: ReactNode
}

export const ListRoot = ({ children }: ListRootProps) => {
    return <List>
        {children}
    </List>
}