import React from 'react'
import { useForm } from 'react-hook-form'
import colors from '@/styles/variables.module.scss'
import { CustomButton } from '@/components/button'

import styles from './styles.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCustomer } from '@/hooks/useCustomer'
import { Grid, Stack, Typography } from '@mui/material'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Select } from '@/components/select'
import { negotiationSchema, NegotiationSchema } from './negotiation.schema'
import { useSale } from '@/hooks/useSale'
import { useEffect } from 'react'
import { FixedFooterActions } from '@/components/fixedFooterActions'
import { CurrencyInput } from '@/components/currencyInput'
import { NumberFormatInput } from '@/components/numberFormat'
import { CustomDatePicker } from '@/components/datePicker'
import { CartResume } from './components/cartResume'
import { useCart } from '@/hooks/useCart'
import { FixedFooterBackdrop } from '@/components/fixedFooterBackdrop'
import { Label } from '@/components/label'
import { formatNumber } from '@/utils/mask'
import { SaleInstallment } from '@/types/sales'
import { OptionSelect } from '@/types/select'
import List from '@/components/list'
import { extraFields } from './components/extraFields'
import { listActions } from './components/listActions'
import dayjs from 'dayjs'

const getItemInfo = (item: SaleInstallment, paymentMethods: OptionSelect[]) => {
  return {
    '': ``,
  }
}

export const Negotiation = () => {
  const {
    paymentMethods,
    installments,
    numberEditing,
    handleGoToStep,
    listPaymentMethods,
    handleAddInstallment,
    confirmRemoveInstallment,
    handleStartEditInstallment,
    handleCancelEditInstallment,
    handleEditInstallment,
  } = useSale()
  const { cartResume, handleGoToDetails } = useCart()
  const { control, handleSubmit, reset, watch, getValues } = useForm<NegotiationSchema>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: {
      quantity: 1,
      date: dayjs(new Date()),
    },
  })

  const showRemainingTradeAmount = cartResume.valorRestanteNegociacao > 0
  const watchPaymentMethod = watch('paymentMethod')

  const onSubmit = (data: NegotiationSchema) => {
    if (!!numberEditing) {
      return handleEditInstallment(data, reset)
    }
    handleAddInstallment(data, reset)
  }

  const onError = (data: any) => {
    console.log(data)

    // handleSelectSaleType(data.saleType)
  }
  useEffect(() => {
    listPaymentMethods()
  }, [listPaymentMethods])

  useEffect(() => {
    console.log(cartResume.valorRestanteNegociacao)
    if (watchPaymentMethod && !getValues('value')) {
      reset({
        ...getValues(),
        value: cartResume.valorRestanteNegociacao * 100,
      })
    }
  }, [watchPaymentMethod])

  return (
    <Stack className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              label="Forma de pagamento"
              name="paymentMethod"
              control={control}
              options={paymentMethods}
            />
          </Grid>
          <Grid item xs={6}>
            <Label text="Qtd. parcelas" />
            <NumberFormatInput
              label=""
              name="quantity"
              inputStyle="decimal"
              maskType="number"
              control={control}
              InputProps={{ readOnly: !!numberEditing }}
            />
          </Grid>
          <Grid item xs={6}>
            <Label text="Venc. inicial" />
            <CustomDatePicker control={control} name="date" label="" />
          </Grid>
          <Grid item xs={6}>
            <Label text="Valor" />
            <CurrencyInput label="" name="value" control={control} />
          </Grid>
        </Grid>
        <Grid container mt={2}>
          {cartResume.valorRestanteNegociacao ? (
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: showRemainingTradeAmount ? colors.greenColor : colors.errorColor,
                }}
              >
                {showRemainingTradeAmount ? 'Falta' : 'Troco'}{' '}
                {formatNumber(cartResume.valorRestanteNegociacao, 'currency')}
              </Typography>
            </Grid>
          ) : null}
          {!!numberEditing && (
            <Grid item xs={6} display="flex" justifyContent="center">
              <CustomButton
                className={styles.outlined}
                variant="outlined"
                text="Cancelar"
                type="button"
                width="fit-content"
                onClick={() => handleCancelEditInstallment(reset)}
              />
            </Grid>
          )}
          <Grid item xs={!!numberEditing ? 6 : 12} display="flex" justifyContent="center">
            <CustomButton
              text={!!numberEditing ? 'Editar parcela' : 'Adicionar parcelas'}
              type="submit"
              width="fit-content"
            />
          </Grid>
        </Grid>
      </form>
      {installments?.length
        ? installments.map((item, index) => {
            const itemInfo = getItemInfo(item, paymentMethods)
            return (
              <List.Item info={{ ...itemInfo }} key={item.number.toString()} raised>
                {extraFields ? extraFields(item) : null}
                {listActions
                  ? listActions({
                      installmentNumber: item.number,
                      handleRemoveInstallment: confirmRemoveInstallment,
                      handleEditInstallment: (installmentNumber: number) =>
                        handleStartEditInstallment(installmentNumber, reset),
                    })
                  : null}
              </List.Item>
            )
          })
        : null}
      <CartResume resume={cartResume} />
      <FixedFooterActions>
        <CustomButton
          text="Voltar"
          startIcon={<FaArrowLeft color={colors.pinkStrongColor} />}
          variant="outlined"
          className={styles.outlined}
          type="button"
          onClick={() => handleGoToStep(1)}
        />
        <CustomButton text="Avançar" endIcon={<FaArrowRight />} type="button" onClick={handleGoToDetails} />
      </FixedFooterActions>
      <FixedFooterBackdrop height="calc(40px + 70px + 1.25rem)" />
      {/*Altura do FixedFooterActions + resumeContainer + padding*/}
    </Stack>
  )
}
