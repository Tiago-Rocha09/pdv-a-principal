import { z } from "zod";

export const loginSchema = z.object({
  user: z.string({ message: "Informe o usuário" }).min(1, "Informe o usuário"),
  password: z.string({ message: "Informe a senha" }).min(1, "Informe a senha"),
  base: z
    .number({ message: "Informe a base" })
    .positive("Informe a base")
    .int("Informe a base"),
  store: z
    .number({ message: "Informe a loja" })
    .positive("Informe a loja")
    .int("Informe a loja"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
