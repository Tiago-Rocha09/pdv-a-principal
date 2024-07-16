import { ReactNode } from "react";
import { Card, CardContent, ListItem, ListItemText, Typography } from "@mui/material"
import styles from './styles.module.scss'

type CustomListItemProps = {
    info: { [key: string]: string | number | null };
    children?: ReactNode
}

export const CustomListItem = ({ info, children }: CustomListItemProps) => {
    return <ListItem className={styles.container}>
        <Card className={styles.card}>
            <CardContent>
                {Object.entries(info).map(([key, value]) => (
                    <div key={`${key}_${value}`} className={styles.itemInfo}>
                        <Typography className={styles.textKey} gutterBottom>
                            {key}
                        </Typography>
                        {value && <Typography className={styles.textValue} gutterBottom>
                            {value}
                        </Typography>}
                    </div>
                ))}
                {children || null}
            </CardContent>
        </Card>

    </ListItem>
}