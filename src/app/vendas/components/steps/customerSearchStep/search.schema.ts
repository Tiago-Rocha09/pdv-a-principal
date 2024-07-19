import { z } from "zod";

export const customerSearchSchema = z.object({
  searchTerm: z.string({ message: "Digite algo para buscar" }).min(1, "Digite algo para buscar"),
});

export type CustomerSearchSchema = z.infer<typeof customerSearchSchema>;
