import { z } from 'zod'

export const selectSaleTypeSchema = z.object({
  saleType: z.number({ message: 'Selecione o tipo de venda' }).positive('Selecione o tipo de venda'),
})

export type SelectSaleTypeSchema = z.infer<typeof selectSaleTypeSchema>
