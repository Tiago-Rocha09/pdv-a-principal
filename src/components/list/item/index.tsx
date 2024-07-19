import { ReactNode } from "react";
import { Avatar, Card, CardContent, CardProps, Grid, ListItem, ListItemAvatar, Stack } from "@mui/material"
import styles from './styles.module.scss'
import { SimpleInfo, SimpleInfoProps } from "@/components/simpleInfo";

type CustomListItemProps = {
    info: { [key: string]: string | number | null };
    image?: string;
    children?: ReactNode,
    showLines?: SimpleInfoProps['showLines']
} & CardProps

export const CustomListItem = ({ info, image, children, showLines, ...rest }: CustomListItemProps) => {

    return <ListItem className={styles.container}>
        <Card className={styles.card} {...rest}>
            <CardContent>
                <Grid container spacing={1}>

                    {image && <Grid item xs={3}>
                        <ListItemAvatar>
                            <Avatar alt="Imagem produto" src={image} variant="square" className={styles.avatar} />
                        </ListItemAvatar>
                    </Grid>
                    }
                    <Grid item xs={!!image ? 9 : 12}>
                        {Object.entries(info).map(([key, value]) => (
                            <SimpleInfo label={key} value={value} key={`${key}_${value}`} showLines={showLines} />
                        ))}
                    </Grid>
                </Grid>
                {children || null}
            </CardContent>
        </Card>

    </ListItem>
}