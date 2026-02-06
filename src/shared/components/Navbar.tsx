import React from 'react';
import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleIcon from '../../assets/google-icon-logo.svg?react';

interface NavbarProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    /**
   * 외부에서 강제로 띄우는 로그인 툴팁 문구
   * - undefined/null: hover일 때만 기본 문구로 노출
   * - string: hover 여부와 상관없이 이 문구로 강제 노출
   */
    externalTooltipMessage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout, externalTooltipMessage }) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const tooltipMessage = useMemo(() => {
        if (externalTooltipMessage) return externalTooltipMessage;
        return isHovered ? '서경대 계정으로 로그인' : undefined;
    }, [externalTooltipMessage, isHovered]);

    const shouldShowTooltip = tooltipMessage !== undefined;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <Link to={ROUTES.HOME} className="text-2xl font-bold text-main tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                            SKUMC
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link to={ROUTES.HOME} className={`text-sm font-medium ${location.pathname === ROUTES.HOME ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                홈
                            </Link>
                            <Link to={ROUTES.APPLY} className={`text-sm font-medium ${location.pathname.startsWith(ROUTES.APPLY) ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                지원하기
                            </Link>
                            {isLoggedIn && (
                                <Link to={ROUTES.ADMIN} className={`text-sm font-medium ${location.pathname.startsWith(ROUTES.ADMIN) ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                    관리자
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    onClick={onLogin}
                                    className="flex items-center gap-2 px-6 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 hover:shadow-md transition-all shadow-sm"
                                >
                                    <GoogleIcon />
                                    <span>Google 로그인</span>
                                </button>
                                <AnimatePresence>
                                    {shouldShowTooltip && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 5, y: "-50%" }}
                                            animate={{ opacity: 1, x: 0, y: "-50%" }}
                                            exit={{ opacity: 0, x: 5, y: "-50%" }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-full top-1/2 mr-3 w-max rounded-md bg-gray-900 text-white text-xs px-3 py-2 shadow-lg"
                                        >
                                            {tooltipMessage}
                                            {/* Right arrow for tooltip */}
                                            <div className="absolute top-1/2 -right-1 -mt-1 border-4 border-transparent border-l-gray-900" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;