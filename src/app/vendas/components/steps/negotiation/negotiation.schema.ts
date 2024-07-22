import dayjs, { Dayjs } from 'dayjs'
import { z } from 'zod'

export const negotiationSchema = z.object({
  paymentMethod: z
    .number({ message: 'Selecione a forma de pagamento' })
    .positive('Selecione a forma de pagamento'),
  quantity: z
    .number({ message: 'Informe a quantidade de parcelas' })
    .positive('A quantidade de parcelas deve ser maior que 0'),
  value: z
    .number({ message: 'Informe o valor da parcela' })
    .positive('O valor da parcela deve ser maior que 0'),
  date: z.preprocess(
    (arg) => {
      return dayjs.isDayjs(arg) ? arg.toDate() : arg
    },
    z.date({ message: 'Informe o vencimento inicial' }),
  ),
})

export type NegotiationSchema = Omit<z.infer<typeof negotiationSchema>, 'date'> & {
  date: Dayjs | Date
}
