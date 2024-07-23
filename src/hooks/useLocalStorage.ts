import {
  STORAGE_KEY_CART_ITEMS,
  STORAGE_KEY_CUSTOMER_SEARCH_TERM,
  STORAGE_KEY_NEGOTIATION_INSTALLMENTS,
  STORAGE_KEY_PRODUCT_SEARCH_TERM,
  STORAGE_KEY_SALE_CURRENT_STEP,
  STORAGE_KEY_SELECTED_CUSTOMER,
  STORAGE_KEY_SELECTED_SALE_TYPE,
  STORAGE_KEY_SELECTED_TAB_PRICE,
} from '@/constants'
import { useCallback } from 'react'

export const useLocalStorage = () => {
  const isBrowser = typeof window !== 'undefined'

  const setItem = useCallback(
    (key: string, value: string) => {
      if (isBrowser) {
        try {
          window.localStorage.setItem(key, value)
        } catch (error) {
          console.error('Error setting localStorage item:', error)
        }
      }
    },
    [isBrowser],
  )

  const getItem = useCallback(
    (key: string) => {
      console.log({ isBrowser })

      if (isBrowser) {
        try {
          const item = window.localStorage.getItem(key)
          return item || null
        } catch (error) {
          console.error('Error getting localStorage item:', error)
          return null
        }
      }
      return null
    },
    [isBrowser],
  )

  const removeItem = useCallback(
    (key: string) => {
      if (isBrowser) {
        try {
          window.localStorage.removeItem(key)
        } catch (error) {
          console.error('Error removing localStorage item:', error)
        }
      }
    },
    [isBrowser],
  )

  const clearStorage = useCallback(() => {
    if (isBrowser) {
      try {
        const keys = [
          STORAGE_KEY_SALE_CURRENT_STEP,
          STORAGE_KEY_CUSTOMER_SEARCH_TERM,
          STORAGE_KEY_SELECTED_CUSTOMER,
          STORAGE_KEY_SELECTED_SALE_TYPE,
          STORAGE_KEY_SELECTED_TAB_PRICE,
          STORAGE_KEY_PRODUCT_SEARCH_TERM,
          STORAGE_KEY_CART_ITEMS,
          STORAGE_KEY_NEGOTIATION_INSTALLMENTS,
        ]
        keys.forEach((item) => {
          window.localStorage.removeItem(item)
        })
      } catch (error) {
        console.error('Error removing localStorage item:', error)
      }
    }
  }, [isBrowser])

  return { setItem, getItem, removeItem, clearStorage }
}
