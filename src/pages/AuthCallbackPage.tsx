import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/routes/routes';
import type { User } from '../shared/types/user';

interface AuthCallbackPageProps {
    user: User | null;
    onComplete: () => Promise<void>;
}

const AuthCallbackPage: React.FC<AuthCallbackPageProps> = ({ user, onComplete }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already loaded, redirect based on status
        if (user) {
            handleRedirect(user);
        } else {
            // Otherwise try to complete authentication (refresh token exchange)
            onComplete().catch(() => {
                // If fails, go home or login page (Home for now)
                navigate(ROUTES.HOME, { replace: true });
            });
        }
    }, [user, onComplete, navigate]);

    const handleRedirect = (currentUser: User) => {
        if (currentUser.isRegistered) {
            navigate(ROUTES.HOME, { replace: true });
        } else {
            navigate(ROUTES.SIGNUP, { replace: true });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">로그인 정보를 불러오는 중입니다...</p>
        </div>
    );
};

export default AuthCallbackPage;
