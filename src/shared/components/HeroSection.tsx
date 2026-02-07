
import { motion, useScroll, useTransform } from 'framer-motion';
import { ROUTES } from '../routes/routes';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="relative h-[90vh] w-full bg-white overflow-hidden flex items-center justify-center">
            {/* 3D Perspective Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
                <motion.div
                    initial={{ opacity: 0, rotateX: 60 }}
                    animate={{ opacity: 0.15, rotateX: 45 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ y: y1 }}
                    className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[linear-gradient(to_right,#00FF55_1px,transparent_1px),linear-gradient(to_bottom,#00FF55_1px,transparent_1px)] bg-[size:60px_60px]"
                />

                {/* Floating Ambient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-1/4 w-96 h-96 bg-main/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-service-light/5 rounded-full blur-[150px]"
                />
            </div>

            {/* Floating 3D Elements (Glassmorphism) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <motion.div
                    style={{ y: y2, rotateZ: -10 }}
                    animate={{ y: [0, -20, 0], rotate: [-10, -5, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] left-[15%] w-32 h-44 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-2xl flex items-center justify-center"
                >
                    <div className="w-12 h-1 bg-main rounded-full absolute top-6" />
                    <div className="flex flex-col space-y-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full" />
                        <div className="w-10 h-2 bg-gray-100 rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y1, rotateZ: 15 }}
                    animate={{ y: [0, 30, 0], rotate: [15, 20, 15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-white/30 backdrop-blur-lg border border-white/40 rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-main/20 to-transparent" />
                    <svg className="w-16 h-16 text-main opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-30 text-center px-4"
            >
                <div className="mb-6 inline-block">
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="px-4 py-1.5 bg-main/10 text-main text-xs font-bold rounded-full border border-main/20 tracking-widest"
                    >
                        University Makeus Challenge in SKU
                    </motion.span>
                </div>

                <h1 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter mb-8" style={{ fontFamily: 'Paperlogy' }}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500">SK</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-[var(--color-main)]">U</span>
                    <span className="text-main drop-shadow-[0_0_25px_rgba(0,255,85,0.4)]">MC</span>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-6"
                >
                    {/* <p className="text-xl md:text-2xl text-gray-700 font-medium tracking-tight">
                        내일을 설계하는 <span className="text-main font-bold">코드</span>, 세상을 바꾸는 <span className="text-main font-bold">움직임</span>
                    </p> */}
                    <div className="relative inline-block">
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-gray-900 uppercase">
                            Break The <span className="relative">
                                Rules
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1.5, duration: 0.8 }}
                                    className="absolute -bottom-2 left-0 h-2 bg-main/40 -z-10"
                                />
                            </span>
                        </h2>
                    </div>
                    {/* <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                        우리는 기술을 넘어 가치를 디자인합니다.<br />
                        10기 SKUMC와 함께 새로운 여정을 시작하세요.
                    </p> */}
                    <div className="space-y-2">
                        <p className="text-xl md:text-2xl text-gray-700 font-medium tracking-tight">
                            우리는 끊임없이 <span className="text-main font-bold">소통</span>하고 <span className="text-main font-bold">성장</span>합니다.
                        </p>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            10기 SKUMC와 함께 새로운 여정을 시작하세요.
                        </p>
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate(ROUTES.APPLY)}
                            className="group relative px-12 py-5 bg-gray-900 text-white text-lg font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        >
                            <span className="relative z-10">지금 바로 지원하기</span>
                            <div className="absolute inset-0 bg-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute inset-0 bg-main blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        </button>

                        <button
                            onClick={() => {
                                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                            }}
                            className="px-8 py-5 text-gray-500 font-bold hover:text-gray-900 transition-colors flex items-center gap-2 group"
                        >
                            활동 내용 보기
                            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
        </div>
    );
};

export default HeroSection;
