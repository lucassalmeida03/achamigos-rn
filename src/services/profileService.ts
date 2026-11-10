import { getAuthSession } from './authStorage';
import { API_URL } from '../constants/api';

export type ProfileData = {
  nome?: string;
  telefone?: string;
  cnpj?: string;
  userLogin?: string;
  senha?: string;
  email?: string;
  endereco?: {
    cep?: string;
    rua?: string;
    cidade?: string;
    numero?: string;
  };
  linkUser?: string;
};

async function request(path: string, init?: RequestInit) {
  const session = await getAuthSession();
  if (!session) throw new Error('Sua sessão expirou. Faça login novamente.');

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error('Não foi possível atualizar o perfil.');
  return response.json();
}

export async function getProfile(): Promise<ProfileData> {
  const session = await getAuthSession();
  const userId = session?.user?._id ?? session?.user?.id;
  if (!session || !userId) throw new Error('Sua sessão expirou. Faça login novamente.');

  return session.user as ProfileData;
}

export async function updateProfile(data: ProfileData) {
  const session = await getAuthSession();
  const userId = session?.user?._id ?? session?.user?.id;
  if (!session || !userId) throw new Error('Sua sessão expirou. Faça login novamente.');
  return request(`/users/${userId}`, { method: 'PUT', body: JSON.stringify(data) });
}
