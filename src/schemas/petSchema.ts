import { z } from 'zod';

export const petSchema = z.object({
  fotoUri: z.string().optional(),
  nome: z.string().min(2, 'Informe o nome do pet'),
  especie: z.string().min(1, 'Informe a espécie do pet'),
  sexo: z.enum(['macho', 'femea'], {
    error: 'Selecione o sexo do pet',
  }),
  raca: z.string().optional(),
  porte: z.enum(['pequeno', 'medio', 'grande'], {
    error: 'Selecione o porte do pet',
  }),
  idade: z.number().min(0, 'Idade inválida'),
  peso: z.string().min(1, 'Informe o peso'),
  
  castrado: z.boolean(),
  observacoes: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  linkExterno: z
    .url('Informe um link válido (ex: https://...)')
    .optional(),
});

export type PetFormData = z.infer<typeof petSchema>;