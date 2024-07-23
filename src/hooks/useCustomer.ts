import { customerService } from '@/services/customer'
import { useStore } from '@/store'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY_CUSTOMER_SEARCH_TERM } from '@/constants'

export const useCustomer = () => {
  const { setItem } = useLocalStorage()
  const storeId = useStore((state) => state.login.user?.storeId) as number
  const selectedCustomer = useStore((state) => state.sales.selectedCustomer)

  const [customers, setCustomers] = useStore((state) => [
    state.customer.customers,
    state.customer.setCustomers,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const listCustomers = async (searchTerm: string) => {
    try {
      setIsLoading(true)

      const response = await customerService.getCustomers(searchTerm, storeId)
      setIsLoading(false)
      setCustomers(response.data)
      setItem(STORAGE_KEY_CUSTOMER_SEARCH_TERM, searchTerm)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)

      setCustomers([])
    }
  }

  const totalCustomers = () => {
    if (!customers.length) {
      return 'Nenhum cliente encontrado'
    } else if (customers.length === 1) {
      return '1 cliente encontrado'
    } else {
      return `${customers.length} clientes encontrados`
    }
  }

  return {
    listCustomers,
    customers,
    totalCustomers,
    isLoading,
    selectedCustomer,
  }
}
