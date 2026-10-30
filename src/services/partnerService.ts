import { API_URL } from '../constants/api';

export type Partner = {
  _id: string;
  nome?: string;
  telefone?: string;
  email?: string;
  linkUser?: string;
};

export async function getPartners(): Promise<Partner[]> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/users`);
  } catch {
    throw new Error('Não foi possível conectar ao backend.');
  }

  if (!response.ok) {
    throw new Error('Não foi possível carregar os parceiros.');
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('O servidor retornou uma lista de parceiros inválida.');
  }

  return data as Partner[];
}
