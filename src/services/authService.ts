import { saveAuthSession, type AuthSession } from './authStorage';

const API_URL = 'http://192.168.30.68:3002/api';

type LoginResponse = AuthSession;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  let responseBody: { token?: string; user?: AuthSession['user']; message?: string };

  try {
    responseBody = await response.json();
  } catch {
    throw new Error('O servidor retornou uma resposta inválida.');
  }

  if (!response.ok) {
    throw new Error(responseBody.message ?? 'E-mail ou senha inválidos.');
  }

  if (!responseBody.token || !responseBody.user) {
    throw new Error('A resposta do login não contém uma sessão válida.');
  }

  const session: LoginResponse = {
    token: responseBody.token,
    user: responseBody.user,
  };

  await saveAuthSession(session);
  return session;
}
