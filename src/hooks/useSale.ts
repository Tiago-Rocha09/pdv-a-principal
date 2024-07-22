import { salesService } from '@/services/sales'
import { useStore } from '@/store'
import { Customer } from '@/types/customer'
import { SaleConfigurationResponse, SaleInstallment, SaleTypeResponse } from '@/types/sales'
import { OptionSelect, OptionSelectApi } from '@/types/select'
import { useCallback, useState } from 'react'
import { useAlert } from './useAlert'
import { NegotiationSchema } from '@/app/vendas/components/steps/negotiation/negotiation.schema'
import { UseFormReset } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { formatNumber } from '@/utils/mask'
import { DetailsSchema } from '@/app/vendas/components/steps/details/details.schema'
import { useCart } from './useCart'
import { getCartResume } from '@/utils/functions'

const steps = [
  0, //Buscar/selecionar cliente
  0.5, //Selecionar tipo de venda
  1, //Carrinho com lista de produtos
  1.1, //Buscar/selecionar/ver detalhes do produto
  1.2, //Definir desconto/quantidade do produto e adicionar no carrinho
  2, //Negociação
  3, //Detalhes
]

type SalesTypeOptionSelect = {
  tabPrice: 1
  local: 1
} & OptionSelect

export const useSale = () => {
  const { showAlert } = useAlert()
  // const { cartResume, cartItems } = useCart()
  const storeId = useStore((state) => state.login.user?.storeId) as number
  const [activeStep, setActiveStep] = useStore((state) => [state.sales.activeStep, state.sales.setActiveStep])
  const [isLoading, setIsLoading] = useStore((state) => [state.sales.isLoading, state.sales.setIsLoading])
  const cartItems = useStore((state) => state.sales.cartItems)

  const [installments, setInstallments] = useStore((state) => [
    state.sales.installments,
    state.sales.setInstallments,
  ])
  const [selectedSaleType, setSelectedSaleType] = useStore((state) => [
    state.sales.selectedSaleType,
    state.sales.setSelectedSaleType,
  ])
  const [configuration, setConfiguration] = useStore((state) => [
    state.sales.configuration,
    state.sales.setConfiguration,
  ])
  const [selectedTabPrice, setSelectedTabPrice] = useStore((state) => [
    state.sales.selectedTabPrice,
    state.sales.setSelectedTabPrice,
  ])
  const [selectedCustomer, setSelectedCustomer] = useStore((state) => [
    state.sales.selectedCustomer,
    state.sales.setSelectedCustomer,
  ])

  const [saleTypes, setSaleTypes] = useState<SalesTypeOptionSelect[]>([])

  const [paymentMethods, setPaymentMethods] = useState<OptionSelect[]>([])
  const [deliveryStatus, setDeliveryStatus] = useState<OptionSelect[]>([])
  const [numberEditing, setNumberEditing] = useState<number | null>(null)

  const handleSelectCustomer = (selectedCustomer: Customer) => {
    setSelectedCustomer(selectedCustomer)
    handleNextStep()
  }

  const handleSelectSaleType = (selectedSaleType: number) => {
    setSelectedSaleType(selectedSaleType)
    const tabPrice = saleTypes.find((item) => item.value === selectedSaleType)?.tabPrice || null

    setSelectedTabPrice(tabPrice)
    handleNextStep()
  }

  const listSaleTypes = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await salesService.getSaleTypes(storeId)
      if (response.status === 200) {
        const data: SaleTypeResponse = response.data
        setSaleTypes(
          data.tiposVenda.map((item: any) => ({
            value: item.id,
            label: item.name,
            tabPrice: item.codTabelaPadrao,
            local: item.localEstoquePadrao,
          })),
        )
      } else {
        setSaleTypes([])
      }
      setIsLoading(false)
    } catch (error) {
      setSaleTypes([])
    }
  }, [storeId])

  const listPaymentMethods = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await salesService.getPaymentType(storeId)
      if (response.status === 200) {
        const data: OptionSelectApi[] = response.data
        setPaymentMethods(
          data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      } else {
        setPaymentMethods([])
      }
      setIsLoading(false)
    } catch (error) {
      setPaymentMethods([])
    }
  }, [storeId])

  const listDeliveryStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await salesService.getDeliveryStatus(storeId)
      if (response.status === 200) {
        const data: OptionSelectApi[] = response.data
        setDeliveryStatus(
          data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      } else {
        setDeliveryStatus([])
      }
      setIsLoading(false)
    } catch (error) {
      setDeliveryStatus([])
    }
  }, [storeId])

  const getConfiguration = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await salesService.getConfiguration(storeId)
      if (response.status === 200) {
        const data: SaleConfigurationResponse = response.data
        setConfiguration(data)
      } else {
        setConfiguration(null)
      }
      setIsLoading(false)
    } catch (error) {
      setConfiguration(null)
    }
  }, [storeId])

  const handleNextStep = () => {
    const currentStepIndex = steps.findIndex((item) => item === activeStep)
    setActiveStep(steps[currentStepIndex + 1])
  }

  const handlePreviousStep = () => {
    const currentStepIndex = steps.findIndex((item) => item === activeStep)
    if (currentStepIndex > 0) {
      setActiveStep(steps[currentStepIndex - 1])
    }
  }

  const handleGoToStep = (step: number) => {
    if (steps.indexOf(step) < 0) {
      return showAlert({
        title: 'Erro ao acessar página',
        text: 'Não conseguimos identificar qual etapa você deve acessar',
      })
    }
    setActiveStep(step)
  }

  const handleAddInstallment = (data: NegotiationSchema, reset: UseFormReset<NegotiationSchema>) => {
    console.log({ data })

    const installmentValueInCents = Number(data.value)

    let biggerInstallmentNumber = 1
    installments.forEach((a) => {
      if (a.number >= biggerInstallmentNumber) {
        biggerInstallmentNumber = a.number + 1
      }
    })

    const newInstallments = [...installments]
    let finalInstallmentValue = installmentValueInCents / data.quantity
    let installmentRest = installmentValueInCents % data.quantity
    finalInstallmentValue = Math.trunc(finalInstallmentValue)
    let lastInstallmentValue = finalInstallmentValue + installmentRest

    finalInstallmentValue = finalInstallmentValue / 100
    lastInstallmentValue = lastInstallmentValue / 100
    let nextDueDate = dayjs()
    for (let i = 0; i < data.quantity; i++) {
      let dueDate = data.date as Date
      dueDate.setDate(dueDate.getDate() + 30 * i)
      if (i + 1 === data.quantity) {
        nextDueDate = dayjs(dueDate)
        newInstallments.push({
          ...data,
          value: lastInstallmentValue,
          dueDate: dueDate.toISOString(),
          number: biggerInstallmentNumber + i,
        })
      } else {
        newInstallments.push({
          ...data,
          value: finalInstallmentValue,
          dueDate: dueDate.toISOString(),
          number: biggerInstallmentNumber + i,
        })
      }
    }
    setInstallments(newInstallments)
    console.log({ newInstallments })
    nextDueDate = nextDueDate.add(30, 'days')
    reset({
      date: nextDueDate,
      paymentMethod: 1,
      quantity: 1,
      value: undefined,
    })
  }

  const handleRemoveInstallment = (number: number) => {
    const newInstallments = installments.filter((item) => item.number !== number)

    setInstallments(
      newInstallments.map((item, index) => ({
        ...item,
        number: index + 1,
      })),
    )
  }

  const confirmRemoveInstallment = (number: number) => {
    const itemToDelete = installments.find((item, i) => item.number === number)
    if (!itemToDelete) return
    const paymentMethod = paymentMethods.find((item) => item.value === itemToDelete.paymentMethod)
    console.log({ paymentMethod })

    showAlert({
      icon: 'warning',
      title: 'Remover parcela?',
      text: `Nº ${itemToDelete?.number} - ${paymentMethod?.label} ${formatNumber(itemToDelete.value, 'currency')}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Remover',
    })
      .then((props) => {
        if (!props.isConfirmed) return
        handleRemoveInstallment(number)
      })
      .catch((error) => {
        console.log({ error, number })
      })
  }

  const handleStartEditInstallment = (installmentNumber: number, reset: UseFormReset<NegotiationSchema>) => {
    const installment = installments.find((item, i) => item.number === installmentNumber)
    if (!installment) return
    setNumberEditing(installmentNumber)
    reset({
      ...installment,
      value: installment.value * 100,
      quantity: 1,
      date: dayjs(installment.dueDate),
    })
  }

  const handleCancelEditInstallment = (reset: UseFormReset<NegotiationSchema>) => {
    setNumberEditing(null)
    const lastInstallment = installments[installments.length - 1]
    reset({
      date: dayjs(lastInstallment.dueDate).add(30, 'days'),
      paymentMethod: 1,
      quantity: 1,
      value: undefined,
    })
  }

  const handleEditInstallment = (data: NegotiationSchema, reset: UseFormReset<NegotiationSchema>) => {
    console.log(data)

    const newInstallments: SaleInstallment[] = installments.map((item, i) => {
      if (item.number === numberEditing) {
        return {
          ...item,
          dueDate: data.date.toISOString(),
          paymentMethod: data.paymentMethod,
          value: Number((data.value / 100).toFixed(2)),
        }
      }
      return item
    })
    setInstallments(newInstallments)
    const lastInstallment = newInstallments[newInstallments.length - 1]
    reset({
      date: dayjs(lastInstallment.dueDate).add(30, 'days'),
      paymentMethod: 1,
      quantity: 1,
      value: undefined,
    })
    setNumberEditing(null)
  }

  const handleSubmitSale = (detailsData: DetailsSchema) => {
    console.log(detailsData)
    const cartResume = getCartResume(cartItems, installments)
    const body = {
      codLoja: storeId,
      codCliente: selectedCustomer?.codCliente,
      nomeCliente: selectedCustomer?.nomeCliente,
      valorBruto: cartResume.valorBruto,
      valorLiquido: cartResume.valorLiquido,
      codTipoEntrega: detailsData.deliveryType,
      codTipoStatus: detailsData.deliveryStatus,
      observacao: detailsData.observation,
      produtos: cartItems,
      parcelas: installments,
      tipoVenda: selectedSaleType,
      tabPreco: selectedTabPrice,
      localEstoque: storeId,
    }
    console.log({ body })
  }

  return {
    activeStep,
    saleTypes,
    isLoading,
    selectedTabPrice,
    configuration,
    selectedSaleType,
    paymentMethods,
    installments,
    numberEditing,
    deliveryStatus,
    listSaleTypes,
    handleSelectCustomer,
    handlePreviousStep,
    handleSelectSaleType,
    handleNextStep,
    getConfiguration,
    handleGoToStep,
    listPaymentMethods,
    handleAddInstallment,
    handleEditInstallment,
    confirmRemoveInstallment,
    handleStartEditInstallment,
    handleCancelEditInstallment,
    listDeliveryStatus,
    handleSubmitSale,
  }
}
