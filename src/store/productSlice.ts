import { Product, ProductImages, ProductStock } from '@/types/product'
import { StateCreator } from 'zustand'

export type ProductSlice = {
  product: {
    showModalLocalStock: boolean
    showModalImages: boolean
    productStock: ProductStock | null
    productImages: ProductImages[] | null
    products: Product[]
    isLoading: boolean
    setShowModalLocalStock: (showModalLocalStock: ProductSlice['product']['showModalLocalStock']) => void
    setShowModalImages: (showModalImages: ProductSlice['product']['showModalImages']) => void
    setIsLoading: (isLoading: ProductSlice['product']['isLoading']) => void
    setProductStock: (productStock: ProductSlice['product']['productStock']) => void
    setProductImages: (productImages: ProductSlice['product']['productImages']) => void
    setProducts: (products: ProductSlice['product']['products']) => void
  }
}

const initialState = {
  showModalLocalStock: false,
  showModalImages: false,
  isLoading: false,
  productStock: null,
  productImages: null,
  products: [],
}

export const createProductSlice: StateCreator<ProductSlice, [], [], ProductSlice> = (set) => {
  return {
    product: {
      products: initialState.products,
      showModalLocalStock: initialState.showModalLocalStock,
      showModalImages: initialState.showModalImages,
      isLoading: initialState.isLoading,
      productStock: initialState.productStock,
      productImages: initialState.productImages,
      setShowModalLocalStock: (showModalLocalStock: ProductSlice['product']['showModalLocalStock']) => {
        set((state) => ({
          product: { ...state.product, showModalLocalStock },
        }))
      },
      setShowModalImages: (showModalImages: ProductSlice['product']['showModalImages']) => {
        set((state) => ({
          product: { ...state.product, showModalImages },
        }))
      },
      setIsLoading: (isLoading: ProductSlice['product']['isLoading']) => {
        set((state) => ({
          product: { ...state.product, isLoading },
        }))
      },
      setProductStock: (productStock: ProductSlice['product']['productStock']) => {
        set((state) => ({ product: { ...state.product, productStock } }))
      },
      setProductImages: (productImages: ProductSlice['product']['productImages']) => {
        set((state) => ({ product: { ...state.product, productImages } }))
      },
      setProducts: (products: ProductSlice['product']['products']) => {
        set((state) => ({ product: { ...state.product, products } }))
      },
    },
  }
}
