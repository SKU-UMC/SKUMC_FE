import type { User } from '../types/user';

const STORAGE_KEYS = {
    USER: 'user',
    ACCESS_TOKEN: 'accessToken',
} as const;

export const storage = {
    getUser: (): User | null => {
        try {
            const user = sessionStorage.getItem(STORAGE_KEYS.USER);
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error('Failed to parse user from session storage', e);
            return null;
        }
    },
    setUser: (user: User) => {
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },
    clearUser: () => {
        sessionStorage.removeItem(STORAGE_KEYS.USER);
    },
    getToken: (): string | null => {
        return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },
    setToken: (token: string) => {
        sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    },
    clearToken: () => {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    },
    clearAll: () => {
        sessionStorage.clear();
    }
};
