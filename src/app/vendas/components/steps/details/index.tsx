import { CustomInput } from '@/components/input'
import { useForm } from 'react-hook-form'
import colors from '@/styles/variables.module.scss'
import { CustomButton } from '@/components/button'

import styles from './styles.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCustomer } from '@/hooks/useCustomer'
import { Chip, FormGroup, Stack } from '@mui/material'
import List from '@/components/list'
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'
import { Customer } from '@/types/customer'
import { SimpleInfo } from '@/components/simpleInfo'
import { Select } from '@/components/select'
import { useSale } from '@/hooks/useSale'
import { useEffect } from 'react'
import { FixedFooterActions } from '@/components/fixedFooterActions'
import { deliveryType } from './constants'
import { detailsSchema, DetailsSchema } from './details.schema'
import { Label } from '@/components/label'

export const SaleDetails = () => {
  const { deliveryStatus, listDeliveryStatus, handlePreviousStep, handleSubmitSale } =
    useSale()
  const { control, handleSubmit } = useForm<DetailsSchema>({
    resolver: zodResolver(detailsSchema),
  })

  const onSubmit = (data: DetailsSchema) => {
    handleSubmitSale(data)
  }

  useEffect(() => {
    listDeliveryStatus()
  }, [listDeliveryStatus])

  return (
    <Stack className={styles.container}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Stack display="flex" flexDirection="column" gap={1}>
          <FormGroup>
            <Label text="Observação" />
            <CustomInput label="" control={control} name="observation" multiline rows={4} />
          </FormGroup>
          <Select label="Tipo de entrega" name="deliveryType" control={control} options={deliveryType} />
          <Select
            label="Status de entrega"
            name="deliveryStatus"
            control={control}
            options={deliveryStatus}
          />
        </Stack>
        <FixedFooterActions>
          <CustomButton
            text="Voltar"
            startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
            variant="outlined"
            className={styles.outlined}
            type="button"
            onClick={handlePreviousStep}
          />
          <CustomButton text="Enviar" endIcon={<FaCheck />} type="submit" />
        </FixedFooterActions>
      </form>
    </Stack>
  )
}
