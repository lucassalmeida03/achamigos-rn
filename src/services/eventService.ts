import { getAuthSession } from './authStorage';
import { API_ORIGIN, API_URL } from '../constants/api';
import { Platform } from 'react-native';

export type EventItem = {
  _id: string;
  id?: string;
  tipo_Evento: string;
  texto?: string;
  data: string;
  linkEvento?: string;
  imagem?: string | null;
};

function getImageUrl(image?: string | null) {
  return image ? (image.startsWith('http') ? image : `${API_ORIGIN}${image}`) : undefined;
}

async function getToken() {
  const session = await getAuthSession();
  return session?.token;
}

export async function getEvents(): Promise<EventItem[]> {
  const response = await fetch(`${API_URL}/eventos`);
  if (!response.ok) throw new Error('Não foi possível carregar os eventos.');
  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error('O servidor retornou eventos inválidos.');
  return data as EventItem[];
}

export type CreateEventData = {
  nomeEvento: string;
  tipoEvento: string;
  dataRealizacao: string;
  horario: string;
  local: string;
  orientacoes: string;
  linkExterno?: string;
  bannerUrl?: string;
};

export async function createEvent(data: CreateEventData) {
  const token = await getToken();
  if (!token) throw new Error('Sua sessão expirou. Faça login novamente.');

  const body = new FormData();
  body.append('tipo_Evento', data.nomeEvento);
  body.append(
    'texto',
    [data.tipoEvento, data.horario, data.local, data.orientacoes]
      .filter(Boolean)
      .join('\n'),
  );
  body.append('data', data.dataRealizacao);
  body.append('linkEvento', data.linkExterno ?? '');

  if (data.bannerUrl) {
    const fileName = `evento-${Date.now()}.jpg`;

    if (Platform.OS === 'web') {
      const imageResponse = await fetch(data.bannerUrl);
      if (!imageResponse.ok) throw new Error('Não foi possível ler o banner selecionado.');
      const blob = await imageResponse.blob();
      body.append('imagem', blob, fileName);
    } else {
      body.append(
        'imagem',
        {
          uri: data.bannerUrl,
          name: fileName,
          type: 'image/jpeg',
        } as unknown as Blob,
      );
    }
  }

  const response = await fetch(`${API_URL}/eventos`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  if (!response.ok) throw new Error('Não foi possível cadastrar o evento.');
  return response.json();
}

export { getImageUrl };
