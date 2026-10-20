import { z } from 'zod';

export const partnerSchema = z.object({
  nomeOng: z.string().min(2, 'Informe o nome da ONG / Casa de Adoção'),
  cnpj: z
    .string()
    .min(14, 'CNPJ inválido')
    .refine((val) => val.replace(/\D/g, '').length === 14, 'CNPJ incompleto'),
  telefone: z
    .string()
    .min(10, 'Telefone inválido')
    .refine((val) => val.replace(/\D/g, '').length >= 10, 'Informe um telefone válido'),
  email: z
    .email('Digite um e-mail válido')
    .min(1, 'O e-mail é obrigatório'),
  senha: z.string().min(1, 'A senha é obrigatória'),
  siteRedeSocial: z
    .url('Informe um link válido (ex: https://...)')
    .or(z.literal(''))
    .optional(),
  cep: z
    .string()
    .min(8, 'CEP inválido')
    .refine((val) => val.replace(/\D/g, '').length === 8, 'CEP incompleto'),
  rua: z.string().min(3, 'Informe a rua ou avenida'),
  numero: z.string().min(1, 'Informe o número'),
  cidadeUf: z.string().min(3, 'Informe a Cidade / UF'),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;