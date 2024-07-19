
import List from "@/components/list"
import { FaArrowLeft, FaBullseye, FaCheck } from "react-icons/fa"
import { ProductSearch } from "@/components/productSearch"
import { CartProduct, Product } from "@/types/product"
import styles from './styles.module.scss'
import colors from '@/styles/variables.module.scss'
import { FixedFooterActions } from "@/components/fixedFooterActions"
import { CustomButton } from "@/components/button"
import { useSale } from "@/hooks/useSale"
import { FixedFooterBackdrop } from "@/components/fixedFooterBackdrop"
import { Grid } from "@mui/material"
import { Label } from "@/components/label"
import { useCart } from "@/hooks/useCart"

const listActions = (
    item: Product, 
    handleSelectProduct: (item: Product) => void
) => {
    return (<List.Actions>
        <List.Action
            text='Detalhes'
            endIcon={<FaBullseye color={colors.pinkStrongColor} />}
            type="button"
            className={styles.outlined}
            variant="outlined"
            onClick={() => { }}
        />
        <List.Action
            text='Adicionar'
            endIcon={<FaCheck color={colors.pinkStrongColor} />}
            type="button"
            className={styles.outlined}
            variant="outlined"
            onClick={() => handleSelectProduct(item)}
        />
    </List.Actions>)
}

const extraFields = (item: Product) => {
    return <Grid container sx={{ marginTop: "0.5rem" }}>
        {item.textoPromocao && <Grid className={styles.promotionText}><Label text={item.textoPromocao} /></Grid>}
        <Grid item xs={4} className={item.estoque < 1 ? styles.colorRed : ''}><Label text={`Estoque: ${item.estoque}`} /></Grid>
        <Grid item xs={4} className={item.estoqueTotal < 1 ? styles.colorRed : ''}><Label text={`Estoque total ${item.estoqueTotal}`} /></Grid>
        <Grid item xs={4} sx={{ fontWeight: 'bold', textAlign: 'right' }}>{item.textoValorVenda}</Grid>
    </Grid>
}

export const ProductSearchStep = () => {
    const { handlePreviousStep } = useSale()
    const { handleSelectProduct } = useCart()

    return (
        <>
            <ProductSearch
                listActions={(item: Product) => listActions(item, handleSelectProduct)}
                extraFields={extraFields}
            />
            <FixedFooterActions>
                <CustomButton
                    text="Voltar"
                    startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
                    variant="outlined"
                    className={styles.outlined}
                    type="button"
                    onClick={handlePreviousStep}
                />
            </FixedFooterActions>
            <FixedFooterBackdrop />
        </>
    )
}