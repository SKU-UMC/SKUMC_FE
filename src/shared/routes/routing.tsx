import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ApplyPage from '../../pages/ApplyPage';
import ApplyFormPage from '../../pages/ApplyFormPage';
import AdminPage from '../../pages/AdminPage';
import SignupPage from '../../pages/SignupPage';
import { ROUTES } from './routes';
import type { User } from '../types/user';

interface AppRouterProps {
    user: User | null;
    onAuthRefresh: () => Promise<any>;
}

const AppRouter: React.FC<AppRouterProps> = ({ user, onAuthRefresh }) => {
    return (
        <Routes>
            <Route
                path={ROUTES.SIGNUP}
                element={
                    user && !user.isCompleted
                        ? <SignupPage onSuccess={onAuthRefresh} />
                        : <Navigate to={ROUTES.HOME} replace />
                }
            />

            <Route path={ROUTES.HOME} element={<HomePage />} />

            <Route
                path={ROUTES.APPLY}
                element={
                    user && !user.isCompleted
                        ? <Navigate to={ROUTES.SIGNUP} replace />
                        : <ApplyPage user={user} />
                }
            />

            <Route
                path={ROUTES.APPLY_FORM}
                element={
                    user && !user.isCompleted
                        ? <Navigate to={ROUTES.SIGNUP} replace />
                        : <ApplyFormPage user={user} />
                }
            />

            <Route
                path={ROUTES.ADMIN_ALL}
                element={
                    user && !user.isCompleted
                        ? <Navigate to={ROUTES.SIGNUP} replace />
                        : (user?.role === 'ADMIN' ? <AdminPage /> : <Navigate to={ROUTES.HOME} />)
                }
            />
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRouter;