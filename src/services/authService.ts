import { saveAuthSession, type AuthSession } from './authStorage';
import { API_URL } from '../constants/api';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha: password }),
  });

  let responseBody: {
    status?: string;
    token?: string;
    user?: AuthSession['user'];
    message?: string;
  };

  try {
    responseBody = await response.json();
  } catch {
    throw new Error('O servidor retornou uma resposta inválida.');
  }

  if (!response.ok || responseBody.status === 'error') {
    throw new Error(responseBody.message ?? 'E-mail ou senha inválidos.');
  }

  if (!responseBody.user) {
    throw new Error('A resposta do login não contém uma sessão válida.');
  }

  const session: AuthSession = {
    token: responseBody.token,
    user: responseBody.user,
  };

  await saveAuthSession(session);
  return session;
}
