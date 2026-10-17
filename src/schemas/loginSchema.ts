import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "O e-mail é obrigatório")
    .pipe(z.email("Digite um e-mail válido")),
  senha: z
    .string()
    .min(1, "A senha é obrigatória")
});

export type LoginFormData = z.infer<typeof loginSchema>;
