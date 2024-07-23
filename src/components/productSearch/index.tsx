import { JSX, useEffect } from 'react'
import { CustomInput } from '@/components/input'
import { useForm } from 'react-hook-form'
import colors from '@/styles/variables.module.scss'
import { CustomButton } from '@/components/button'

import styles from './styles.module.scss'
import { customerSearchSchema, CustomerSearchSchema } from './search.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chip } from '@mui/material'
import List from '@/components/list'
import { useProduct } from '@/hooks/useProduct'
import { Product } from '@/types/product'
import { ModalLocalStock } from './components/modalLocalStock'
import { ModalImages } from './components/modalImages'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEY_PRODUCT_SEARCH_TERM } from '@/constants'

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
  const { getItem } = useLocalStorage()

  const { listProducts, products, isLoading, totalProducts, getProductImages } = useProduct()
  const { control, handleSubmit, setValue } = useForm<CustomerSearchSchema>({
    resolver: zodResolver(customerSearchSchema),
  })

  const onSubmit = (data: CustomerSearchSchema) => {
    listProducts(data.searchTerm)
  }

  useEffect(() => {
    const value = getItem(STORAGE_KEY_PRODUCT_SEARCH_TERM)

    if (value) {
      setValue('searchTerm', value)
    }
  }, [])

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          control={control}
          name="searchTerm"
          label="Busque por nome, descrição ou código do produto"
        />
        <CustomButton
          text="Buscar produto"
          bgColor={colors.blueColor}
          className={styles.button}
          type="submit"
          isLoading={isLoading}
        />
      </form>
      <Chip label={totalProducts()} />
      <List.Root>
        {products.map((item, index) => {
          const itemInfo = getItemInfo(item)
          return (
            <List.Item
              info={{ ...itemInfo }}
              key={item.codProd.toString()}
              raised
              image={item.imagem}
              onClickImage={() => getProductImages(item.codProd)}
            >
              {extraFields ? extraFields(item) : null}
              {listActions ? listActions(item) : null}
            </List.Item>
          )
        })}
      </List.Root>
      <ModalLocalStock />
      <ModalImages />
    </>
  )
}
