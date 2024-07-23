import { useStore } from '@/store'
import { CartProduct, Product, ProductStockItem } from '@/types/product'
import { useSale } from './useSale'
import { AddProductSchema } from '@/app/vendas/components/steps/addProduct/addProduct.schema'
import { useAlert } from './useAlert'
import { UseFormSetValue } from 'react-hook-form'
import { formatNumber } from '@/utils/mask'
import { getCartResume } from '@/utils/functions'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY_CART_ITEMS } from '@/constants'

export type CarResumeProps = {
  itens: number
  descontoPorcentagem: number
  descontoReal: number
  qtd: number
  valorBruto: number
  valorLiquido: number
  valorRestanteNegociacao: number
}

export const useCart = () => {
  const { setItem } = useLocalStorage()

  const { configuration, selectedSaleType, handleGoToStep } = useSale()
  const { showAlert } = useAlert()
  const storeId = useStore((state) => state.login.user?.storeId) as number

  const [cartItems, setCartItems] = useStore((state) => [state.sales.cartItems, state.sales.setCartItems])

  const [selectedProduct, setSelectedProduct] = useStore((state) => [
    state.sales.selectedProduct,
    state.sales.setSelectedProduct,
  ])

  const [cartProductEditing, setCartProductEditing] = useStore((state) => [
    state.sales.cartProductEditing,
    state.sales.setCartProductEditing,
  ])

  const [installments, setInstallments] = useStore((state) => [
    state.sales.installments,
    state.sales.setInstallments,
  ])

  const handleSelectProduct = (item: Product) => {
    const selected: CartProduct = {
      ...item,
      desconto: 0,
      local: storeId,
      quantidade: 1,
      valorLiquido: item.precoVenda,
      valorTotal: item.precoVenda,
    }
    if (!checkQuantity(selected)) return

    setSelectedProduct(selected)
    handleGoToStep(1.2)
  }

  //Chamado quando clica em "Detalhes" na pesquisa de produtos
  const handleSelectProductToModal = (item: Product) => {
    const selected: CartProduct = {
      ...item,
      desconto: 0,
      local: storeId,
      quantidade: 1,
      valorLiquido: item.precoVenda,
      valorTotal: item.precoVenda,
    }

    setSelectedProduct(selected)
  }

  //Chamdo quando clica em uma das opções do modal de locais de estoque
  //direciona para a página de adicionar no carrinho, passando o local escolhido pelo fucionário
  const handleSelectProductFromModal = (customLocal: ProductStockItem) => {
    const selected: CartProduct = {
      ...(selectedProduct as CartProduct),
      estoque: customLocal.estoque || 0,
      local: customLocal.codLocal,
    }
    if (!checkQuantity(selected)) return

    setSelectedProduct(selected)
    handleGoToStep(1.2)
  }

  const calculaValorTotal = (newSelectedProduct: CartProduct) => {
    return Number((newSelectedProduct.quantidade * newSelectedProduct.valorLiquido).toFixed(2))
  }

  const calculaDesconto = (newSelectedProduct: CartProduct) => {
    const { precoVenda, valorLiquido } = newSelectedProduct
    if (!precoVenda) return 0
    const desconto = (1 - valorLiquido / precoVenda) * 100
    return Number(desconto.toFixed(2))
  }

  const calculaValorLiquido = (newSelectedProduct: CartProduct) => {
    const precoVenda = selectedProduct?.precoVenda || 0

    const valorLiquido = precoVenda - precoVenda * (newSelectedProduct.desconto / 100)

    return Number(valorLiquido.toFixed(2))
  }

  const handleUpdateSelectedProduct = (
    setValue: UseFormSetValue<AddProductSchema>,
    value?: number,
    field?: string,
  ) => {
    const newSelectedProduct: CartProduct = {
      ...(selectedProduct as CartProduct),
    }
    if (field === 'quantidade') {
      const valueNumber = Number(value)
      newSelectedProduct.quantidade = valueNumber
    } else if (field === 'desconto') {
      const valueNumber = Number(value) / 100

      newSelectedProduct.desconto = valueNumber

      const valorLiquido = calculaValorLiquido(newSelectedProduct)
      newSelectedProduct.valorLiquido = valorLiquido
      setValue('valorLiquido', Number((valorLiquido * 100).toFixed(0)))
    } else if (field === 'valorLiquido') {
      const valueNumber = Number(value) / 100
      newSelectedProduct.valorLiquido = valueNumber
      const desconto = calculaDesconto(newSelectedProduct)
      newSelectedProduct.desconto = desconto
      setValue('desconto', desconto * 100)
    }
    const valorTotal = calculaValorTotal(newSelectedProduct)
    newSelectedProduct.valorTotal = valorTotal

    setSelectedProduct(newSelectedProduct)
  }

  const checkQuantity = (item: CartProduct): boolean => {
    if (
      Number(configuration?.codTipoVendaDesafio) !== Number(selectedSaleType) &&
      Number(item.estoque) < Number(item.quantidade)
    ) {
      showAlert({
        title: 'Não é possível adicionar o produto',
        text: 'O estoque atual é menor que a quantidade informada',
      })
      return false
    }
    return true
  }

  const checkDesconto = (item: CartProduct): boolean => {
    const descontoMaximo = item?.descontoMaximoPromocao || item?.descontoMaximo || 0
    if (Number(item.desconto) > Number(descontoMaximo)) {
      showAlert({
        title: 'Desconto maior que o permitido',
        text: `O desconto máximo para esse produto é ${formatNumber(descontoMaximo, 'decimal')}%`,
      })
      return false
    }
    return true
  }

  const handleAddItem = () => {
    console.log({ selectedProduct })
    const newItem = selectedProduct as CartProduct
    checkDesconto(newItem)
    const newCart = [...cartItems, newItem]
    setCartItems(newCart)
    setItem(STORAGE_KEY_CART_ITEMS, JSON.stringify(newCart))
    handleGoToStep(1)
    setSelectedProduct(null)
  }

  const handleUpdateItem = () => {
    const updatedItem = selectedProduct as CartProduct
    checkDesconto(updatedItem)
    const newCart = cartItems.map((item, index) => {
      if (index !== cartProductEditing) {
        return item
      }
      return updatedItem
    })
    setCartItems(newCart)
    setItem(STORAGE_KEY_CART_ITEMS, JSON.stringify(newCart))
    handleGoToStep(1)
    setSelectedProduct(null)
    setCartProductEditing(null)
  }

  const onErrorSubmit = (error: any) => {
    const message = ['<ul>']

    Object.keys(error).forEach((key) => {
      message.push(`<li>${error[key]?.message || ''}</li>`)
    })
    message.push('</ul>')
    const messageText = message.join('')
    showAlert({
      title: 'Não foi possível adicionar',
      html: messageText,
    })
  }

  const cartResume = getCartResume(cartItems, installments)

  const handleRemoveFromCart = (index: number) => {
    const newCartItems = cartItems.filter((item, i) => index !== i)
    setCartItems(newCartItems)
  }

  const confirmRemoveFromCart = (index: number) => {
    const itemToDelete = cartItems.find((item, i) => index === i)
    showAlert({
      icon: 'warning',
      title: 'Remover produto da cesta?',
      text: `${itemToDelete?.codProd} - ${itemToDelete?.descricao}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Remover',
    })
      .then((props) => {
        if (!props.isConfirmed) return
        handleRemoveFromCart(index)
      })
      .catch((error) => {
        console.log({ error, index })
      })
  }

  const handleStartCartProductEditing = (index: number) => {
    const itemToDelete = cartItems.find((item, i) => index === i)
    if (!itemToDelete) return

    setCartProductEditing(index)
    setSelectedProduct(itemToDelete)
    handleGoToStep(1.2)
  }

  const handlePreviousStepFromEditing = () => {
    setSelectedProduct(null)
    handleGoToStep(1)
  }

  const handleGoToNegotiation = () => {
    if (!cartItems?.length) {
      showAlert({
        title: 'Nenhum produto na cesta',
        text: 'Adicione no mínimo 1 produto para avançar',
      })
      return false
    }
    handleGoToStep(2)
  }

  const handleGoToDetails = () => {
    if (cartResume.valorRestanteNegociacao > 0) {
      showAlert({
        title: 'Negociação incompleta',
        text: 'O valor adicionado é menor que o valor total',
      })
      return false
    }
    handleGoToStep(3)
  }

  return {
    cartItems,
    selectedProduct,
    cartResume,
    cartProductEditing,
    handleSelectProduct,
    handleAddItem,
    handleUpdateSelectedProduct,
    onErrorSubmit,
    confirmRemoveFromCart,
    handleStartCartProductEditing,
    handleUpdateItem,
    handleSelectProductToModal,
    handleSelectProductFromModal,
    checkQuantity,
    handlePreviousStepFromEditing,
    handleGoToNegotiation,
    handleGoToDetails,
  }
}
