import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@achamigos/session';

export type AuthSession = {
  token: string;
  user: {
    _id?: string;
    id?: string;
  };
};

export async function saveAuthSession(session: AuthSession) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const rawSession = await AsyncStorage.getItem(SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const session = JSON.parse(rawSession) as AuthSession;

    if (!session.token) {
      return null;
    }

    return session;
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function clearAuthSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
