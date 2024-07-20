import { Product } from "@/types/product"
import styles from '../styles.module.scss'
import { Grid } from "@mui/material"
import { Label } from "@/components/label"

export const extraFields = (item: Product) => {
    return <Grid container sx={{ marginTop: "0.5rem" }}>
        {item.textoPromocao && <Grid className={styles.promotionText}><Label text={item.textoPromocao} /></Grid>}
        <Grid item xs={4} className={item.estoque < 1 ? styles.colorRed : ''}><Label text={`Estoque: ${item.estoque}`} /></Grid>
        <Grid item xs={4} className={item.estoqueTotal < 1 ? styles.colorRed : ''}><Label text={`Estoque total ${item.estoqueTotal}`} /></Grid>
        <Grid item xs={4} sx={{ fontWeight: 'bold', textAlign: 'right' }}>{item.textoValorVenda}</Grid>
    </Grid>
}