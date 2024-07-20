import { CustomInput } from "@/components/input"
import { useForm } from "react-hook-form"
import colors from '@/styles/variables.module.scss'

import styles from './styles.module.scss'
import { zodResolver } from "@hookform/resolvers/zod"
import { Grid, Stack } from "@mui/material"
import List from "@/components/list"
import { SimpleInfo } from "@/components/simpleInfo"
import { useSale } from "@/hooks/useSale"
import { useCart } from "@/hooks/useCart"
import { addProductSchema, AddProductSchema } from "./addProduct.schema"
import { CartProduct } from "@/types/product"
import { Label } from "@/components/label"
import { FixedFooterActions } from "@/components/fixedFooterActions"
import { CustomButton } from "@/components/button"
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { FixedFooterBackdrop } from "@/components/fixedFooterBackdrop"
import { CurrencyInput } from "@/components/currencyInput"
import { formatNumber } from "@/utils/mask"
import { useEffect } from "react"
import { NumberFormatInput } from "@/components/numberFormat"

const extraFields = (item: CartProduct) => {

    return <Grid container sx={{ marginTop: "0.5rem" }}>
        <Grid item xs={6}><Label text={`V.B.: `} />{formatNumber(item?.precoVenda, 'currency')}</Grid>
        <Grid item xs={6} textAlign="right"><Label text={`Desc: `} />{formatNumber(item?.desconto, 'decimal')}%</Grid>
        <Grid item xs={3}><Label text={`Local: `} />{item?.local}</Grid>
        <Grid item xs={3} textAlign="center"><Label text={`Qtd: `} />{item?.quantidade}</Grid>
        <Grid item xs={6} textAlign="right"><Label text={`V.L.: `} />{formatNumber(item?.valorLiquido * item?.quantidade, 'currency')}</Grid>
    </Grid >
}

const getItemInfo = (item: CartProduct) => {
    return {
        'Cód. Prod:': item?.codProd,
        'Descrição:': item?.descricao,
    }
}

export const AddProduct = () => {

    const { handlePreviousStep } = useSale()
    const { handleAddItem, handleUpdateItem, selectedProduct, handleUpdateSelectedProduct, onErrorSubmit, cartProductEditing } = useCart()
    const { control, handleSubmit, setValue } = useForm<AddProductSchema>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            desconto: (selectedProduct?.desconto || 0) * 100,
            quantidade: selectedProduct?.quantidade,
            valorLiquido: (selectedProduct?.valorLiquido || 0) * 100
        }
    })

    const onSubmit = () => {
        if (Number.isInteger(cartProductEditing)) {
            return handleUpdateItem()
        }
        handleAddItem()
    }

    const itemInfo = getItemInfo(selectedProduct as CartProduct)
    const valorTotal = formatNumber(selectedProduct?.valorTotal || 0, "currency")
    const descontoMaximo = (selectedProduct?.descontoMaximoPromocao || selectedProduct?.descontoMaximo || 0)
    const quantidadeMaxima = (selectedProduct?.estoque || 0)

    return (
        <Stack className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit, onErrorSubmit)} >
                <Grid container spacing={2}>
                    <Grid item xs={6}><SimpleInfo label="Cód. produto:" value={selectedProduct?.codProd || ''} vertical={true} showLines={true} /></Grid>
                    <Grid item xs={6}><SimpleInfo label="Valor bruto UN" value={selectedProduct?.precoVenda || 0} vertical={true} showLines={true} /></Grid>
                    <Grid item xs={6}><NumberFormatInput label='Qtd' name="quantidade" inputStyle="decimal" maskType='number' max={quantidadeMaxima} customOnChange={(value, field) => handleUpdateSelectedProduct(setValue, value, field)} control={control} hideValidation={true} /></Grid>
                    <Grid item xs={6}><CurrencyInput label='Desconto %' name="desconto" inputStyle="decimal" max={descontoMaximo} customOnChange={(value, field) => handleUpdateSelectedProduct(setValue, value, field)} control={control} hideValidation={true} /></Grid>
                    <Grid item xs={6}><CurrencyInput label='Valor líquido' name="valorLiquido" customOnChange={(value, field) => handleUpdateSelectedProduct(setValue, value, field)} control={control} hideValidation={true} /></Grid>
                    <Grid item xs={6} mt="auto"><SimpleInfo label="Valor total" value={valorTotal} vertical={true} showLines={true} /></Grid>
                </Grid>
                <List.Item
                    info={{ ...itemInfo }}
                    key={selectedProduct?.codProd?.toString()}
                    raised={true}
                    image={selectedProduct?.imagem}
                >
                    {extraFields(selectedProduct as CartProduct)}
                </List.Item>
                <FixedFooterActions>
                    <CustomButton
                        text="Voltar"
                        startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
                        variant="outlined"
                        className={styles.outlined}
                        type="button"
                        onClick={handlePreviousStep}
                        width="40%"
                    />
                    <CustomButton
                        text={Number.isInteger(cartProductEditing) ? "Atualizar" : "Adicionar"}
                        startIcon={<FaCheck />}
                        type="submit"
                        width="60%"
                    />
                </FixedFooterActions>
                <FixedFooterBackdrop />
            </form>
        </Stack>
    )
}