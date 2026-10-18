import { getAuthSession } from './authStorage';
import type { PetFormData } from '../schemas/petSchema';

const API_URL = 'https://achamigos-backend-latest.onrender.com/api';
const API_ORIGIN = 'https://achamigos-backend-latest.onrender.com';

export type Animal = {
  _id: string;
  nome: string;
  idade?: number;
  raca?: string;
  sexo: string;
  porte?: string;
  peso?: number | string;
  observacoes?: string;
  linkAnimal?: string;
  imagem?: string | null;
  tipo?: string;
};

type JwtPayload = {
  sub?: string;
};

function getUserIdFromToken(token: string) {
  const [, payload] = token.split('.');

  if (!payload) {
    return undefined;
  }

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = globalThis.atob(normalizedPayload);
    return (JSON.parse(decodedPayload) as JwtPayload).sub;
  } catch {
    return undefined;
  }
}

function getImageType(uri: string) {
  const extension = uri.split('.').pop()?.toLowerCase();

  if (extension === 'png') {
    return 'image/png';
  }

  return 'image/jpeg';
}

export function getAnimalImageUrl(image?: string | null) {
  if (!image) {
    return undefined;
  }

  return image.startsWith('http') ? image : `${API_ORIGIN}${image}`;
}

export async function getAnimals(): Promise<Animal[]> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/animais`);
  } catch {
    throw new Error(
      'Não foi possível conectar ao backend. Verifique sua internet e tente novamente.',
    );
  }

  if (!response.ok) {
    throw new Error('Não foi possível carregar os animais cadastrados.');
  }

  let animals: unknown;

  try {
    animals = await response.json();
  } catch {
    throw new Error('O servidor retornou uma lista de animais inválida.');
  }

  if (!Array.isArray(animals)) {
    throw new Error('O servidor retornou uma lista de animais inválida.');
  }

  return animals as Animal[];
}

export async function createAnimal(data: PetFormData) {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('Sua sessão expirou. Faça login novamente.');
  }

  const userId = session.user?._id ?? session.user?.id ?? getUserIdFromToken(session.token);

  if (!userId) {
    throw new Error('Não foi possível identificar o usuário da sessão.');
  }

  const body = new FormData();
  body.append('nome', data.nome);
  body.append('idade', String(data.idade));
  body.append('raca', data.raca ?? '');
  body.append('sexo', data.sexo);
  body.append('porte', data.porte);
  body.append('peso', data.peso);
  body.append('observacoes', data.observacoes);
  body.append('linkAnimal', data.linkExterno ?? '');
  body.append('castracao', String(data.castrado));
  body.append('tipo', data.especie);
  body.append('userId', userId);

  if (data.fotoUri) {
    const image = {
      uri: data.fotoUri,
      name: `animal-${Date.now()}.jpg`,
      type: getImageType(data.fotoUri),
    };

    body.append('imagem', image as unknown as Blob);
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/animais`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      body,
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao backend. Verifique sua internet e tente novamente.',
    );
  }

  if (!response.ok) {
    let message = 'Não foi possível cadastrar o animal.';

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
