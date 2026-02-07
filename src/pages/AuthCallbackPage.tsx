import React, { useEffect, useState } from 'react';
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
    const [error, setError] = useState<string | null>(null);
    const [, setIsAuthenticating] = useState(true);

    useEffect(() => {
        if (user) {
            handleRedirect(user);
        } else {
            onComplete()
                .then(() => {
                    setIsAuthenticating(false);
                })
                .catch((err: any) => {
                    setIsAuthenticating(false);
                    // 서버에서 내려주는 에러 메시지 확인
                    const serverMessage = err.response?.data?.message || err.message;
                    if (serverMessage?.includes('@skuniv.ac.kr')) {
                        setError('DOMAIN_ERROR');
                    } else {
                        setError('UNKNOWN_ERROR');
                    }
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

    // 도메인 오류 전용 화면
    if (error === 'DOMAIN_ERROR') {
        return (
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] opacity-50" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 flex flex-col items-center text-center px-6 max-w-md"
                >
                    <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500 mb-8 shadow-xl shadow-red-500/10 border border-red-100">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4" style={{ fontFamily: 'Paperlogy' }}>
                        학교 계정으로만 <br /> <span className="text-red-500">로그인이 가능합니다</span>
                    </h2>

                    <p className="text-gray-400 font-medium break-keep mb-12">
                        SKUMC는 보안 및 학생 인증을 위해 <br />
                        서경대학교 구글 계정<span className="text-gray-600 font-bold">(@skuniv.ac.kr)</span>만 허용하고 있습니다.
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '/api/v1/auth/login/google'}
                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-red-500 transition-all"
                        >
                            다른 계정으로 다시 시도
                        </motion.button>
                        <button
                            onClick={() => navigate(ROUTES.HOME)}
                            className="w-full py-4 text-gray-400 font-bold hover:text-gray-900 transition-colors"
                        >
                            홈으로 돌아가기
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }


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
                    SKUMC
                </span>
            </div>
        </div>
    );
};

export default AuthCallbackPage;
