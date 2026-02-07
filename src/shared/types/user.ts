
export interface User {
    id: number;
    name: string;
    email: string;
    isRegistered: boolean;
    isCompleted: boolean;
    role: 'USER' | 'ADMIN';
}
