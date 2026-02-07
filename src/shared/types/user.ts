
export interface User {
    name: string;
    email: string;
    isRegistered: boolean;
    isCompleted: boolean;
    role: 'USER' | 'ADMIN';
}
