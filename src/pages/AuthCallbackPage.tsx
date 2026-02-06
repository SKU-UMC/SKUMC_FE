import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/routes/routes';
import type { User } from '../shared/types/user';
import { motion } from 'framer-motion';
import Logo from '../shared/components/Logo';

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
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Background Aesthetics (Matches HeroSection) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-main/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Logo with Pulse Animation */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-main rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-main/20 border border-gray-50"
                    >
                        <Logo size={80} />
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-black text-gray-900 tracking-tighter mb-4 uppercase"
                        style={{ fontFamily: 'Paperlogy' }}
                    >
                        Authenticating<span className="text-main">...</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 font-medium"
                    >
                        로그인 정보를 안전하게 불러오고 있습니다.
                    </motion.p>
                </div>

                {/* Loading Bar */}
                <div className="mt-10 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full bg-main"
                    />
                </div>
            </motion.div>

            {/* Bottom Footer Decor */}
            <div className="absolute bottom-12 text-center z-10">
                <span className="text-[10px] font-black tracking-[0.5em] text-gray-300 uppercase">
                    Seokyeong Univ. Mobile Club
                </span>
            </div>
        </div>
    );
};

export default AuthCallbackPage;
