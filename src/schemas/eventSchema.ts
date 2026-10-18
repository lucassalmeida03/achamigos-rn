import { z } from 'zod';

export const eventSchema = z.object({
  bannerUrl: z.string().optional(),
  nomeEvento: z.string().min(3, 'Informe o nome do evento'),
  tipoEvento: z.string().min(2, 'Informe o tipo de evento'),
  dataRealizacao: z.string().min(8, 'Informe a data de realização'),
  horario: z.string().min(2, 'Informe o horário'),
  local: z.string().min(5, 'Informe o local ou ponto de encontro'),
  orientacoes: z
    .string()
    .min(10, 'As orientações devem ter pelo menos 10 caracteres'),
  linkExterno: z
    .url('Informe um link válido (ex: https://...)')
    .optional(),
});