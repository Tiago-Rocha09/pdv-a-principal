import { z } from 'zod'

export const detailsSchema = z.object({
  observation: z.string({ message: 'A observação deve ser um texto' }).optional(),
  deliveryType: z.number({ message: 'Selecione um tipo de entrega' }),
  deliveryStatus: z.number({ message: 'Selecione um status de entrega' }),
})

export type DetailsSchema = z.infer<typeof detailsSchema>
