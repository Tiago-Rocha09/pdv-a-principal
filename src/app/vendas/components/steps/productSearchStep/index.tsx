import { FaArrowLeft } from 'react-icons/fa'
import { ProductSearch } from '@/components/productSearch'
import { Product } from '@/types/product'
import styles from './styles.module.scss'
import colors from '@/styles/variables.module.scss'
import { FixedFooterActions } from '@/components/fixedFooterActions'
import { CustomButton } from '@/components/button'
import { useSale } from '@/hooks/useSale'
import { FixedFooterBackdrop } from '@/components/fixedFooterBackdrop'
import { useCart } from '@/hooks/useCart'
import { listActions } from './components/listActions'
import { extraFields } from './components/extraFields'
import { useProduct } from '@/hooks/useProduct'

export const ProductSearchStep = () => {
  const { handleGoToStep } = useSale()
  const { handleSelectProduct } = useCart()
  const { getProductStock } = useProduct()

  return (
    <>
      <ProductSearch
        listActions={(item: Product) => listActions(item, handleSelectProduct, getProductStock)}
        extraFields={extraFields}
      />
      <FixedFooterActions>
        <CustomButton
          text="Voltar"
          startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
          variant="outlined"
          className={styles.outlined}
          type="button"
          onClick={() => handleGoToStep(1)}
        />
      </FixedFooterActions>
      <FixedFooterBackdrop />
    </>
  )
}
