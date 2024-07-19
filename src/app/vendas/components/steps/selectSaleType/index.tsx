import { CustomInput } from "@/components/input"
import { useForm } from "react-hook-form"
import colors from '@/styles/variables.module.scss'
import { CustomButton } from "@/components/button"

import styles from './styles.module.scss'
import { zodResolver } from "@hookform/resolvers/zod"
import { useCustomer } from "@/hooks/useCustomer"
import { Chip, Stack } from "@mui/material"
import List from "@/components/list"
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa"
import { Customer } from "@/types/customer"
import { SimpleInfo } from "@/components/simpleInfo"
import { Select } from "@/components/select"
import { selectSaleTypeSchema, SelectSaleTypeSchema } from "./selectSaleType.schema"
import { useSale } from "@/hooks/useSale"
import { useEffect } from "react"
import { FixedFooterActions } from "@/components/fixedFooterActions"

const getItemInfo = (item: Customer) => {
    return {
        'Cód. Cliente:': item.codCliente,
        'Nome Cliente:': item.nomeCliente || item.nomeFantasia,
        'CPF/CNPJ:': item.cpf,
    }
}

export const SelectSaleType = () => {

    const { selectedCustomer } = useCustomer()
    const { saleTypes, listSaleTypes, handlePreviousStep, handleSelectSaleType, getConfiguration } = useSale()
    const { control, handleSubmit } = useForm<SelectSaleTypeSchema>({
        resolver: zodResolver(selectSaleTypeSchema)
    })

    const onSubmit = (data: SelectSaleTypeSchema) => {
        console.log(data);
        handleSelectSaleType(data.saleType)
    }

    useEffect(() => {
        listSaleTypes()
        getConfiguration()
    }, [listSaleTypes, getConfiguration])

    return (
        <Stack className={styles.container}>
            {Object.entries(getItemInfo(selectedCustomer as Customer)).map(([key, value]) => (
                <SimpleInfo label={key} value={value.toString()} key={`${key}_${value}`} />
            ))}
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)} >
                <Select label='Tipo de venda' name='saleType' control={control} options={saleTypes} />
                <FixedFooterActions>
                    <CustomButton
                        text="Voltar"
                        startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
                        variant="outlined"
                        className={styles.outlined} type="button"
                        onClick={handlePreviousStep}
                    />
                    <CustomButton text="Avançar" endIcon={<FaArrowRight />} type="submit" />
                </FixedFooterActions>
            </form>
        </Stack>
    )
}