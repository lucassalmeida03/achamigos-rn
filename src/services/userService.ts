const API_URL = 'http://192.168.15.9:3002/api';

export type CreateUserData = {
  nome: string;
  cnpj: string;
  telefone: string;
  userLogin: string;
  senha: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    cidade: string;
    numero: string;
  };
  linkUser?: string;
};

export async function createUser(data: CreateUserData) {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao backend. Verifique sua internet e tente novamente.',
    );
  }

  if (!response.ok) {
    let message = 'Não foi possível cadastrar o usuário.';

    try {
      const errorBody = (await response.json()) as { error?: string; message?: string };
      message = errorBody.error ?? errorBody.message ?? message;
    } catch {
      // Mantém a mensagem padrão quando a API não retorna JSON.
    }

    throw new Error(message);
  }

  return response.json();
}
