import type { User } from './user';

export interface ProfileRequest {
    discordEmail: string;
    notionEmail: string;
}

export interface ApiResponse<T> {
    resultType: 'SUCCESS' | 'FAIL' | 'ERROR';
    error: any;
    data: T;
}

export interface AuthResponse {
    // Tokens are likely handled via cookies based on the user provided JSON example which lacks them.
    // If they are returned, add them back. For now, match the user's JSON data block.
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    isRegistered: boolean;
    isCompleted: boolean;
}
