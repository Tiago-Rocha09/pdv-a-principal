import { SimpleInfo } from "@/components/simpleInfo"
import { ProductStockItem } from "@/types/product"
import { Grid, Typography } from "@mui/material"
import styles from '../styles.module.scss'
import { FaArrowRight, FaHandPointer } from "react-icons/fa"
import colors from '@/styles/variables.module.scss'
import { useProduct } from "@/hooks/useProduct"

const getValue = (value: number) => {
    if (isNaN(Number(value)) || !Number(value)) {
        return <Typography sx={{ color: colors.errorColor, fontWeight: 'bold' }}>0</Typography>
    }
    return <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
}

type ItemLocalStockProps = { item: ProductStockItem }
export const ItemLocalStock = ({ item }: ItemLocalStockProps) => {
    const { handleSelectProductFromDifferentLocal } = useProduct()

    return <Grid container className={styles.containerItemStock} onClick={() => handleSelectProductFromDifferentLocal(item)}>
        <Grid item xs={10}>
            <SimpleInfo label={item.nomeLocal} value={getValue(item.estoque)} className={styles.itemStockContent} />
        </Grid>
        <Grid item xs={2} textAlign="right">
            <FaArrowRight color={colors.blackColor} />
        </Grid>
    </Grid>
}