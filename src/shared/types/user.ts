
export interface User {
    id: string;
    name: string;
    email: string;
    isRegistered: boolean;
    isCompleted: boolean;
    role: 'USER' | 'ADMIN';
}
