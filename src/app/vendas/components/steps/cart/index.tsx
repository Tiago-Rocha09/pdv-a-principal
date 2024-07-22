import { useForm } from 'react-hook-form'
import colors from '@/styles/variables.module.scss'
import { CustomButton } from '@/components/button'

import styles from './styles.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import List from '@/components/list'
import { FaArrowLeft, FaArrowRight, FaPlusCircle } from 'react-icons/fa'
import { selectSaleTypeSchema, SelectSaleTypeSchema } from './selectSaleType.schema'
import { useSale } from '@/hooks/useSale'
import { FixedFooterActions } from '@/components/fixedFooterActions'
import { useCart } from '@/hooks/useCart'
import { CartProduct } from '@/types/product'
import { FixedFooterBackdrop } from '@/components/fixedFooterBackdrop'
import { listActions } from './components/listActions'
import { extraFields } from './components/extraFields'
import { CartQtdLabel } from './components/cartQtdLabel'
import { CartResume } from './components/cartResume'

const getItemInfo = (item: CartProduct) => {
  return {
    '': `${item?.codProd} - ${item?.descricao}`,
  }
}

export const Cart = () => {
  const { handlePreviousStep, handleNextStep, handleGoToStep } = useSale()
  const { cartItems, handleStartCartProductEditing, cartResume, confirmRemoveFromCart, handleGoToNegotiation } = useCart()
  
  console.log({ cartResume })

  return (
    <Stack
      className={styles.container}
      sx={{
        paddingBottom: 'calc(10px + 110px + 2.25rem + 1.25rem)',
      }}
    >
      <List.Root>
        <CartQtdLabel cartItems={cartItems} />
        {cartItems?.length
          ? cartItems.map((item, index) => {
              const itemInfo = getItemInfo(item)
              return (
                <List.Item
                  info={{ ...itemInfo }}
                  key={item.codProd.toString()}
                  raised
                  image={item.imagem}
                  showLines
                >
                  {extraFields ? extraFields(item) : null}
                  {listActions
                    ? listActions({
                        index,
                        handleRemoveFromCart: confirmRemoveFromCart,
                        handleEditCartProduct: handleStartCartProductEditing,
                      })
                    : null}
                </List.Item>
              )
            })
          : null}
      </List.Root>
      <CartResume resume={cartResume} />
      <FixedFooterActions>
        <CustomButton
          text="Voltar"
          startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
          variant="outlined"
          className={styles.outlined}
          type="button"
          onClick={handlePreviousStep}
          width="30%"
        />
        <CustomButton
          text="Novo item"
          endIcon={<FaPlusCircle />}
          type="button"
          width="40%"
          onClick={handleNextStep}
        />
        <CustomButton
          text="Avançar"
          endIcon={<FaArrowRight color={colors.pinkStrongColor} />}
          type="button"
          width="30%"
          variant="outlined"
          className={styles.outlined}
          onClick={() => handleGoToNegotiation()}
        />
      </FixedFooterActions>
      <FixedFooterBackdrop height="calc(40px + 70px + 2.25rem + 1.25rem)" />{' '}
      {/*Altura do FixedFooterActions + resumeContainer + padding*/}
    </Stack>
  )
}
