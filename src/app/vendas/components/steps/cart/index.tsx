import { CustomInput } from "@/components/input"
import { useForm } from "react-hook-form"
import colors from '@/styles/variables.module.scss'
import { CustomButton } from "@/components/button"

import styles from './styles.module.scss'
import { zodResolver } from "@hookform/resolvers/zod"
import { useCustomer } from "@/hooks/useCustomer"
import { Chip, Container, Grid, Stack, Typography } from "@mui/material"
import List from "@/components/list"
import { FaArrowLeft, FaArrowRight, FaCheck, FaPlusCircle } from "react-icons/fa"
import { Customer } from "@/types/customer"
import { SimpleInfo } from "@/components/simpleInfo"
import { Select } from "@/components/select"
import { selectSaleTypeSchema, SelectSaleTypeSchema } from "./selectSaleType.schema"
import { useSale } from "@/hooks/useSale"
import { useEffect } from "react"
import { FixedFooterActions } from "@/components/fixedFooterActions"
import { useCart } from "@/hooks/useCart"

const CartEmpty = () => {
    return <Chip label="Nenhum item no carrinho" />
}

export const Cart = () => {

    const { selectedCustomer } = useCustomer()
    const { handlePreviousStep, handleNextStep } = useSale()
    const { cartItems, handleAddItem } = useCart()
    const { control, handleSubmit } = useForm<SelectSaleTypeSchema>({
        resolver: zodResolver(selectSaleTypeSchema)
    })

    const onSubmit = (data: SelectSaleTypeSchema) => {
        console.log(data);
    }

    return (
        <Stack className={styles.container}>
            <List.Root>
                {
                    cartItems?.length === 0 && <CartEmpty />
                }
            </List.Root>
            <Container className={styles.resumeContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <SimpleInfo label="T. Itens" value="1" vertical={true} />
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleInfo label="Total Desc %" value="0,00" vertical={true} />
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleInfo label="Total Desc R$" value="R$ 0,00" vertical={true} />
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleInfo label="Qtd. Itens" value="1" vertical={true} />
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleInfo label="Valor Bruto R$" value="R$ 239,99" vertical={true} />
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleInfo label="Valor Líq R$" value="R$ 239,99" vertical={true} />
                    </Grid>
                </Grid>
            </Container>
            <form className={styles.actionsContainer} onSubmit={handleSubmit(onSubmit)} >
                <FixedFooterActions>
                    <CustomButton
                        text="Voltar"
                        startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
                        variant="outlined"
                        className={styles.outlined}
                        type="button"
                        onClick={handlePreviousStep}
                        width="30%"
                    />
                    <CustomButton text="Novo item" endIcon={<FaPlusCircle />} type="button" width="40%" onClick={handleNextStep} />
                    <CustomButton text="Avançar"
                        endIcon={<FaArrowRight color={colors.pinkStrongColor} />}
                        type="button"
                        width="30%"
                        variant="outlined"
                        className={styles.outlined}
                        onClick={() => { }}
                    />
                </FixedFooterActions>
            </form>
        </Stack>
    )
}