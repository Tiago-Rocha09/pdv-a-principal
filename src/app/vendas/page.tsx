'use client'

import { Box, Step, StepLabel, Stepper } from '@mui/material'
import styles from './styles.module.scss'
import { PageWrapper } from '@/components/pageWrapper'
import { useSale } from '../../hooks/useSale'
import { SelectSaleType } from './components/steps/selectSaleType'
import { Cart } from './components/steps/cart'
import { SearchCustomerStep } from './components/steps/customerSearchStep'
import { ProductSearchStep } from './components/steps/productSearchStep'
import { AddProduct } from './components/steps/addProduct'
import { ToastContainer } from 'react-toastify'
import { Negotiation } from './components/steps/negotiation'
import { SaleDetails } from './components/steps/details'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect } from 'react'
import { useInitialValue } from '@/hooks/useInitialValue'
import { STORAGE_KEY_SALE_CURRENT_STEP } from '@/constants'

const stepLabels = ['Dados', 'Itens', 'Negociação', 'Detalhes']

const getStepComponent = (activeStep: number) => {
  switch (activeStep) {
    case 0:
      return <SearchCustomerStep />
      break
    case 0.5:
      return <SelectSaleType key={activeStep.toString()} />
      break
    case 1:
      return <Cart />
      break

    case 1.1:
      return <ProductSearchStep />
      break

    case 1.2:
      return <AddProduct />
      break
    case 2:
      return <Negotiation />
      break

    case 3:
      return <SaleDetails />
      break
    default:
      return <></>
      break
  }
}

export default function Sales() {
  useInitialValue('vendas')
  const { activeStep } = useSale()

  return (
    <PageWrapper>
      <ToastContainer />
      <Box className={styles.container}>
        <Stepper activeStep={Math.floor(activeStep)} alternativeLabel>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>{getStepComponent(activeStep)}</Box>
      </Box>
    </PageWrapper>
  )
}
