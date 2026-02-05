import type { User } from './user';

export interface ProfileRequest {
    discordEmail: string;
    notionEmail: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string; // 쿠키로 올 수도 있지만 명시적으로 있다면

    // User info response
    userId: number; // or string based on User type
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    isRegistered: boolean;
    isCompleted: boolean;
}
