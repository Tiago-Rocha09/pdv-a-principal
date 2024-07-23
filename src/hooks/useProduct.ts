import { productService } from '@/services/products'
import { useStore } from '@/store'
import {
  CartProduct,
  FindProductResponseApi,
  Product,
  ProductImages,
  ProductStockItem,
} from '@/types/product'
import { useState } from 'react'
import { useCart } from './useCart'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY_PRODUCT_SEARCH_TERM } from '@/constants'

export const useProduct = () => {
  const { setItem } = useLocalStorage()
  const { handleSelectProductToModal, handleSelectProductFromModal, checkQuantity, selectedProduct } =
    useCart()
  const storeId = useStore((state) => state.login.user?.storeId) as number
  const tabPrice = useStore((state) => state.sales.selectedTabPrice) as number

  const [products, setProducts] = useStore((state) => [state.product.products, state.product.setProducts])
  const [isLoading, setIsLoading] = useStore((state) => [state.product.isLoading, state.product.setIsLoading])
  const [productStock, setProductStock] = useStore((state) => [
    state.product.productStock,
    state.product.setProductStock,
  ])
  const [productImages, setProductImages] = useStore((state) => [
    state.product.productImages,
    state.product.setProductImages,
  ])
  const [showModalLocalStock, setShowModalLocalStock] = useStore((state) => [
    state.product.showModalLocalStock,
    state.product.setShowModalLocalStock,
  ])

  const [showModalImages, setShowModalImagese] = useStore((state) => [
    state.product.showModalImages,
    state.product.setShowModalImages,
  ])

  const listProducts = async (searchTerm: string) => {
    try {
      setIsLoading(true)
      const response = await productService.getProducts(searchTerm, storeId, storeId, tabPrice)
      setIsLoading(false)
      console.log({ response })

      if (response.status === 200) {
        setItem(STORAGE_KEY_PRODUCT_SEARCH_TERM, searchTerm)
        return setProducts(response.data)
      }
      setProducts([])
    } catch (error) {
      console.log({ error })
      setIsLoading(false)

      setProducts([])
    }
  }

  const getProductStock = async (product: Product) => {
    try {
      setIsLoading(true)
      setShowModalLocalStock(true)
      const response = await productService.getProductStock(storeId, product.codProd)
      console.log({ response })

      if (response.status === 200) {
        const data: FindProductResponseApi = response.data
        handleSelectProductToModal(product)
        setProductStock({
          localEstoque: data.localEstoque.map((item) => ({
            codLocal: item.CodLocal,
            nomeLocal: item.NomeLocal,
            estoque: item.Estoque,
          })),
          tabelaPreco: data.tabelaPreco.map((item) => ({
            nomeTabela: item.NomeTabela,
            precoVenda: item.PrecoVenda,
            textoValorVenda: item.TextoValorVenda,
          })),
        })
        return setIsLoading(false)
      }
      setProductStock(null)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)

      setProductStock(null)
    }
  }

  const totalProducts = () => {
    if (!products.length) {
      return 'Nenhum produto encontrado'
    } else if (products.length === 1) {
      return '1 produto encontrado'
    } else {
      return `${products.length} produtos encontrados`
    }
  }

  const handleCloseModalLocalStock = () => {
    setShowModalLocalStock(false)
    setProductStock(null)
  }

  const handleCloseModalImages = () => {
    setShowModalImagese(false)
  }

  const handleSelectProductFromDifferentLocal = (item: ProductStockItem) => {
    const selected = {
      ...(selectedProduct as CartProduct),
      estoque: item.estoque || 0,
    }
    if (!checkQuantity(selected)) return
    handleSelectProductFromModal(item)
    setShowModalLocalStock(false)
    setProductStock(null)
  }

  const getProductImages = async (codProd: string) => {
    try {
      setIsLoading(true)
      setShowModalImagese(true)
      const response = await productService.getProductImages(storeId, codProd)
      console.log({ response })

      if (response.status === 200) {
        const data: ProductImages[] = response.data
        setProductImages(data)
        return setIsLoading(false)
      }
      setProductImages(null)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)

      setProductImages(null)
    }
  }

  return {
    products,
    isLoading,
    showModalLocalStock,
    showModalImages,
    productStock,
    productImages,
    listProducts,
    totalProducts,
    getProductStock,
    handleCloseModalLocalStock,
    handleSelectProductFromDifferentLocal,
    getProductImages,
    handleCloseModalImages,
  }
}
