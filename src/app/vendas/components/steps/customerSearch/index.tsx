import { CustomInput } from "@/components/input"
import { useForm } from "react-hook-form"
import colors from '@/styles/variables.module.scss'
import { CustomButton } from "@/components/button"

import styles from './styles.module.scss'
import { customerSearchSchema, CustomerSearchSchema } from "./search.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCustomer } from "@/hooks/useCustomer"
import { Chip } from "@mui/material"
import List from "@/components/list"
import { FaCheck } from "react-icons/fa"
import { Customer } from "@/types/customer"
import { useSale } from "@/hooks/useSale"

const getItemInfo = (item: Customer) => {
    return {
        'Cód. Cliente:': item.codCliente,
        'Nome Cliente:': item.nomeCliente || item.nomeFantasia,
        'CPF/CNPJ:': item.cpf,
        'Cidade:': item.cidade,
        'Ativo': null
    }
}

export const SearchCustomer = () => {

    const { listCustomers, customers, totalCustomers, isLoading } = useCustomer()
    const { handleSelectCustomer } = useSale()
    const { control, handleSubmit, formState: { errors } } = useForm<CustomerSearchSchema>({
        resolver: zodResolver(customerSearchSchema)
    })

    const onSubmit = (data: CustomerSearchSchema) => {
        console.log(data);
        listCustomers(data.searchTerm)
    }

    return (
        <>
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)} >
                <CustomInput control={control} name="searchTerm" label="Busque por nome, código ou cpf" />
                <CustomButton text="Buscar cliente" bgColor={colors.blueColor} className={styles.button} type="submit" isLoading={isLoading} />
            </form>
            <Chip label={totalCustomers()} />
            <List.Root>
                {
                    customers.map((item) => {
                        const itemInfo = getItemInfo(item)
                        return <List.Item info={{ ...itemInfo }} key={item.codCliente.toString()}>
                            <List.Actions>
                                <List.Action text='Selecionar' endIcon={<FaCheck />} type="button" onClick={() => handleSelectCustomer(item)} />
                            </List.Actions>
                        </List.Item>
                    })
                }
            </List.Root>
        </>
    )
}