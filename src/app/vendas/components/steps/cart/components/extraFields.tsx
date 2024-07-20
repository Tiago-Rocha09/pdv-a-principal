import { CartProduct } from "@/types/product"
import { Grid, Stack } from "@mui/material"
import { Label } from "@/components/label"
import { formatNumber } from "@/utils/mask"

export const extraFields = (item: CartProduct) => {

    return <Grid container sx={{ marginTop: "0.5rem" }}>
        <Grid item xs={6}><Label text={`V.B.: `} />{formatNumber(item?.precoVenda * item?.quantidade, 'currency')}</Grid>
        <Grid item xs={6} textAlign="right"><Label text={`Desc: `} />{formatNumber(item?.desconto, 'decimal')}%</Grid>
        <Grid item xs={3}><Label text={`Local: `} />{item?.local}</Grid>
        <Grid item xs={3} textAlign="center"><Label text={`Qtd: `} />{item?.quantidade}</Grid>
        <Grid item xs={6} textAlign="right"><Label text={`V.L.: `} />{formatNumber(item?.valorLiquido * item?.quantidade, 'currency')}</Grid>
    </Grid >
}