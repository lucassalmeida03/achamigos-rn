const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ? 'http://localhost:3002'
    : 'http://192.168.0.11:3002');

export const API_URL = `${API_BASE_URL}/api`;
export const API_ORIGIN = API_BASE_URL;
