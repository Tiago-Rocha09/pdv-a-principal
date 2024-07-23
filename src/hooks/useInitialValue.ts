import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useStore } from '@/store'
import {
  STORAGE_KEY_SELECTED_CUSTOMER,
  STORAGE_KEY_SELECTED_SALE_TYPE,
  STORAGE_KEY_SELECTED_TAB_PRICE,
  STORAGE_KEY_CART_ITEMS,
  STORAGE_KEY_SALE_CURRENT_STEP,
  STORAGE_KEY_NEGOTIATION_INSTALLMENTS,
} from '@/constants'
import { useSale } from './useSale'

export const useInitialValue = (page: 'vendas' | 'clientes') => {
  const { getItem } = useLocalStorage()
  const { handleGoToStep } = useSale()
  const setActiveStep = useStore((state) => state.sales.setActiveStep)
  const setIsLoading = useStore((state) => state.sales.setIsLoading)
  const setCartItems = useStore((state) => state.sales.setCartItems)

  const setInstallments = useStore((state) => state.sales.setInstallments)
  const setSelectedSaleType = useStore((state) => state.sales.setSelectedSaleType)
  const setConfiguration = useStore((state) => state.sales.setConfiguration)
  const setSelectedTabPrice = useStore((state) => state.sales.setSelectedTabPrice)
  const setSelectedCustomer = useStore((state) => state.sales.setSelectedCustomer)

  useEffect(() => {
    if (page === 'vendas') {
      const valueSelectedCustomer = getItem(STORAGE_KEY_SELECTED_CUSTOMER)
      const valueSaleType = getItem(STORAGE_KEY_SELECTED_SALE_TYPE)
      const valueTabPrice = getItem(STORAGE_KEY_SELECTED_TAB_PRICE)
      const valueShoppingCart = getItem(STORAGE_KEY_CART_ITEMS)
      const valueCurrentStep = Number(getItem(STORAGE_KEY_SALE_CURRENT_STEP))
      const valueInstallments = getItem(STORAGE_KEY_NEGOTIATION_INSTALLMENTS)

      if (valueInstallments) {
        setInstallments(JSON.parse(valueInstallments))
      }
      if (valueSelectedCustomer) {
        setSelectedCustomer(JSON.parse(valueSelectedCustomer))
      }
      if (valueShoppingCart) {
        setCartItems(JSON.parse(valueShoppingCart))
      }
      if (Number(valueSaleType)) {
        setSelectedSaleType(Number(valueSaleType))
      }
      if (Number(valueTabPrice)) {
        setSelectedTabPrice(Number(valueTabPrice))
      }

      if (!isNaN(valueCurrentStep)) {
        if (valueCurrentStep === 1.2) {
          handleGoToStep(1.1)
        } else {
          handleGoToStep(valueCurrentStep)
        }
      }
    }
  }, [])
}
