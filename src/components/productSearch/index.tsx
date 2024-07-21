import { JSX } from 'react'
import { CustomInput } from "@/components/input"
import { useForm } from "react-hook-form"
import colors from '@/styles/variables.module.scss'
import { CustomButton } from "@/components/button"

import styles from './styles.module.scss'
import { customerSearchSchema, CustomerSearchSchema } from "./search.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chip } from "@mui/material"
import List from "@/components/list"
import { useProduct } from '@/hooks/useProduct'
import { Product } from '@/types/product'
import { ModalLocalStock } from './components/modalLocalStock'

type ProductSearchProps = {
    listActions?: (item: Product) => JSX.Element
    extraFields?: (item: Product) => JSX.Element
}


const getItemInfo = (item: Product) => {

    return {
        'Cód. Prod:': item.codProd,
        'Descrição:': item.descricao,
    }
}

export const ProductSearch = ({ listActions, extraFields }: ProductSearchProps) => {

    const { listProducts, products, isLoading, totalProducts } = useProduct()
    const { control, handleSubmit } = useForm<CustomerSearchSchema>({
        resolver: zodResolver(customerSearchSchema)
    })

    const onSubmit = (data: CustomerSearchSchema) => {
        listProducts(data.searchTerm)
    }
    console.log({ products });

    return (
        <>
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)} >
                <CustomInput control={control} name="searchTerm" label="Busque por nome, descrição ou código do produto" />
                <CustomButton text="Buscar produto" bgColor={colors.blueColor} className={styles.button} type="submit" isLoading={isLoading} />
            </form>
            <Chip label={totalProducts()} />
            <List.Root>
                {
                    products.map((item, index) => {
                        const itemInfo = getItemInfo(item)
                        return <List.Item
                            info={{ ...itemInfo }}
                            key={item.codProd.toString()}
                            raised
                            image={item.imagem}
                        >
                            {extraFields ? extraFields(item) : null}
                            {listActions ? listActions(item) : null}
                        </List.Item>
                    })
                }
            </List.Root>
            <ModalLocalStock />
        </>
    )
}