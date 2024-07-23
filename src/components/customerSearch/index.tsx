import { JSX, useEffect } from 'react'
import { CustomInput } from '@/components/input'
import { useForm } from 'react-hook-form'
import colors from '@/styles/variables.module.scss'
import { CustomButton } from '@/components/button'

import styles from './styles.module.scss'
import { customerSearchSchema, CustomerSearchSchema } from './search.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCustomer } from '@/hooks/useCustomer'
import { Chip } from '@mui/material'
import List from '@/components/list'
import { Customer } from '@/types/customer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEY_CUSTOMER_SEARCH_TERM } from '@/constants'

const getItemInfo = (item: Customer) => {
  return {
    'Cód. Cliente:': item.codCliente,
    'Nome Cliente:': item.nomeCliente || item.nomeFantasia,
    'CPF/CNPJ:': item.cpf,
    'Cidade:': item.cidade,
    Ativo: null,
  }
}

type SearchCustormerProps = {
  listActions: (item: Customer) => JSX.Element
}

export const SearchCustomer = ({ listActions }: SearchCustormerProps) => {
  const { getItem } = useLocalStorage()

  const { listCustomers, customers, totalCustomers, isLoading } = useCustomer()
  const { control, handleSubmit, setValue } = useForm<CustomerSearchSchema>({
    resolver: zodResolver(customerSearchSchema),
  })

  const onSubmit = (data: CustomerSearchSchema) => {
    listCustomers(data.searchTerm)
  }

  useEffect(() => {
    const value = getItem(STORAGE_KEY_CUSTOMER_SEARCH_TERM)
    console.log({ value })

    if (value) {
      setValue('searchTerm', value)
    }
  }, [])

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <CustomInput control={control} name="searchTerm" label="Busque por nome, código ou cpf" />
        <CustomButton
          text="Buscar cliente"
          bgColor={colors.blueColor}
          className={styles.button}
          type="submit"
          isLoading={isLoading}
        />
      </form>
      <Chip label={totalCustomers()} />
      <List.Root>
        {customers.map((item) => {
          const itemInfo = getItemInfo(item)
          return (
            <List.Item info={{ ...itemInfo }} key={item.codCliente.toString()} raised>
              {listActions(item)}
            </List.Item>
          )
        })}
      </List.Root>
    </>
  )
}
