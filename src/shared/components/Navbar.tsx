import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import Logo from './Logo';

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

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <Link to={ROUTES.HOME} className="text-2xl font-bold text-main tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                            <div className="flex items-center justify-center">
                                <Logo size={30} />
                            </div>
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link to={ROUTES.HOME} className={`text-sm font-medium ${location.pathname === ROUTES.HOME ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                홈
                            </Link>
                            <Link to={ROUTES.APPLY} className={`text-sm font-medium ${location.pathname.startsWith(ROUTES.APPLY) ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                모집요강
                            </Link>
                            {isLoggedIn && (
                                <Link to={ROUTES.ADMIN} className={`text-sm font-medium ${location.pathname.startsWith(ROUTES.ADMIN) ? 'text-main' : 'text-gray-600 hover:text-main'}`}>
                                    관리자
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <AnimatePresence>
                                    {externalTooltipMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 5 }}
                                            className="hidden md:flex relative items-center mr-2 rounded-lg bg-gray-900 text-white text-[11px] font-bold px-3 py-1.5 shadow-lg"
                                        >
                                            {externalTooltipMessage}
                                            <div className="absolute top-1/2 -right-1 -mt-1 border-4 border-transparent border-l-gray-900" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
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
                                            <div className="absolute top-1/2 -right-1 -mt-1 border-4 border-transparent border-l-gray-900" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;