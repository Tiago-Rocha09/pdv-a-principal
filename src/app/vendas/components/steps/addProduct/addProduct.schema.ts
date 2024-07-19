import { z } from "zod";

export const addProductSchema = z.object({
  desconto: z.number({ message: "Não conseguimos identificar o desconto" }),
  quantidade: z
    .number({ message: "Informe a quantidade" })
    .positive("A quantidade deve ser um número positivo"),
  valorLiquido: z
    .number({
      message: "O valor líquido deve ser um número positivo",
    })
    .positive("O valor líquido deve ser um número positivo"),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
