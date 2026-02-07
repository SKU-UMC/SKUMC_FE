

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../shared/components/HeroSection';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { ROUTES } from '../shared/routes/routes';

const activities = [
    {
        title: '스터디',
        tag: 'Study',
        desc: 'UMC에서 제공하는 워크북을 바탕으로 주 1회, 10주간 스터디를 진행합니다.',
        imgGradient: 'from-blue-400 to-main'
    },
    {
        title: 'PM Day',
        tag: 'Networking',
        desc: '각 팀의 PM, 디자이너, 개발자들이 모여 다양한 관점에서 프로젝트를 바라보고, 각자의 경험을 나누며 발전을 도모합니다.',
        imgGradient: 'from-purple-400 to-main'
    },
    {
        title: '너디너리 해커톤',
        tag: 'Big Event',
        desc: '26개 대학에서 모인 부원들이 한 팀이 되어, 기획부터 개발까지 전 과정을 경험하는 대규모 해커톤입니다.',
        imgGradient: 'from-orange-400 to-main'
    },
    {
        title: 'UMC 해커톤',
        tag: 'Internal',
        desc: 'UMC 부원들만을 대상으로 하며, 혁신적인 아이디어를 내고 단기간 내에 실용적인 결과물을 만들어냅니다.',
        imgGradient: 'from-pink-400 to-main'
    },
    {
        title: '데모데이',
        tag: 'Final Stage',
        desc: '그동안 갈고닦은 실력을 세상에 선보이는 자리입니다. 실제 사용자를 고려한 완성도 있는 결과물을 선보이는 무대입니다.',
        imgGradient: 'from-green-400 to-main'
    }
];

const universities = [
    "서울여자대학교", "성신여자대학교", "숭실대학교", "이화여자대학교",
    "동덕여자대학교", "명지대학교", "숙명여자대학교", "전북대학교",
    "서경대학교", "국민대학교", "중앙대학교", "연세대학교",
    "고려대학교", "한양대학교", "경희대학교", "한국외국어대학교",
    "서울시립대학교", "건국대학교", "동국대학교", "홍익대학교",
    "아주대학교", "인하대학교"
];

const timelineData = [
    { gen: '5TH UMC', date: '2023.09' },
    { gen: '6TH UMC', date: '2024.03' },
    { gen: '7TH UMC', date: '2024.09' },
    { gen: '8TH UMC', date: '2025.03' },
    { gen: '9TH UMC', date: '2025.09' },
    { gen: '10TH UMC', date: '2026.03', current: true },
];

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const yOffset = useTransform(scrollY, [0, 1], [0, 100]);
    const carouselRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const [currentX, setCurrentX] = useState(0);

    const fadeIn: any = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6 }
    };

    useEffect(() => {
        if (carouselRef.current) {
            const scrollWidth = carouselRef.current.scrollWidth;
            const offsetWidth = carouselRef.current.offsetWidth;
            // padding-x(md:24, lg:40) 고려하여 여유분 설정
            const maxLeft = -(scrollWidth - offsetWidth + 48);
            setConstraints({ left: maxLeft, right: 0 });
        }
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        const step = 424; // Card width (400) + Gap (24)
        let nextX = direction === 'left' ? currentX + step : currentX - step;

        // Boundary check
        if (nextX > 0) nextX = 0;
        if (nextX < constraints.left) nextX = constraints.left;

        setCurrentX(nextX);
        controls.start({ x: nextX, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    };

    return (
        <div>
            {/* 1. HeroSection */}
            <HeroSection />

            {/* 2. UMC 소개 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40 py-16 md:py-24">
                <section className="mt-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 rounded-[3rem] p-16 md:p-24 text-white relative overflow-hidden"
                    >
                        {/* 배경 Glows */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-main/20 blur-[100px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-main/10 blur-[80px] -ml-32 -mb-32" />

                        {/* Text Content */}
                        <div className="relative z-20">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                                UMC는 <span className="text-main underline decoration-main/30">세상의 틀을 깰</span> <br /> 챌린저를 기다리고 있어요.
                            </h2>
                            <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto font-medium break-keep">
                                University Makeus Challenge(UMC)는 전국 대학생 연합 IT 프로젝트 동아리입니다.<br className="hidden md:block" />
                                6개월 동안 실제로 동작하는 서비스를 만들어내는 것을 목표로 합니다.
                            </p>
                        </div>

                        {/* 2.5 University Partners*/}
                        <div className="relative pt-10 border-t border-white/10 overflow-hidden">
                            <h3 className="text-xl md:text-2xl font-black text-white/90 mb-10 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                                UMC는 <span className="text-main">22개의 학교</span>와 함께하고 있습니다.
                            </h3>

                            <div className="flex flex-col gap-5 relative">
                                {/* First Row: Moving Left */}
                                <div className="flex overflow-hidden group">
                                    <motion.div
                                        animate={{ x: [0, -2000] }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        className="flex gap-4 shrink-0 px-4"
                                    >
                                        {[...universities, ...universities].map((uni, idx) => (
                                            <div
                                                key={`${uni}-${idx}`}
                                                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full hover:border-main/50 hover:bg-white/10 transition-all cursor-default group"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-main/20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-main" />
                                                </div>
                                                <span className="text-white/70 font-bold text-sm md:text-base whitespace-nowrap group-hover:text-main">
                                                    {uni}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Second Row: Moving Right (Reverse) */}
                                <div className="flex overflow-hidden group">
                                    <motion.div
                                        animate={{ x: [-2000, 0] }}
                                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                        className="flex gap-4 shrink-0 px-4"
                                    >
                                        {[...universities, ...universities].reverse().map((uni, idx) => (
                                            <div
                                                key={`rev-${uni}-${idx}`}
                                                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full hover:border-main/50 hover:bg-white/10 transition-all cursor-default group"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-main/20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-main" />
                                                </div>
                                                <span className="text-white/70 font-bold text-sm md:text-base whitespace-nowrap group-hover:text-main">
                                                    {uni}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Side Fades - Matches box background (gray-900) */}
                                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />
                                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />
                            </div>
                        </div>

                    </motion.div>
                </section>
            </div>

            {/* 3. 활동 소개 섹션 (Activities) - Carousel with Navigation Arrows */}
            <section className="py-40 bg-gray-50/30 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 md:px-24 lg:px-40">
                    <motion.div {...fadeIn} className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6" style={{ fontFamily: 'Paperlogy' }}>
                            SKUMC에서는 <br className="md:hidden" /> <span className="text-main">어떤 활동</span>을 할 수 있나요?
                        </h2>
                        <div className="w-20 h-1.5 bg-main/20 mx-auto rounded-full" />
                        <p className="mt-8 text-gray-400 font-medium text-sm md:text-base">카드를 옆으로 밀어서 더 많은 활동을 확인해보세요</p>
                    </motion.div>
                </div>

                {/* Carousel Container with Arrows */}
                <div className="relative group">
                    {/* Navigation Arrows (PC only) */}
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 lg:left-12 z-20">
                        <button
                            onClick={() => handleScroll('left')}
                            className={`p-5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl transition-all hover:scale-110 active:scale-95 ${currentX === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:border-main text-gray-900'}`}
                            disabled={currentX === 0}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 lg:right-12 z-20">
                        <button
                            onClick={() => handleScroll('right')}
                            className={`p-5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl transition-all hover:scale-110 active:scale-95 ${currentX <= constraints.left ? 'opacity-20 cursor-not-allowed' : 'hover:border-main text-gray-900'}`}
                            disabled={currentX <= constraints.left}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Carousel Viewport */}
                    <div className="relative cursor-grab active:cursor-grabbing">
                        <motion.div
                            ref={carouselRef}
                            drag="x"
                            dragConstraints={constraints}
                            animate={controls}
                            onDragEnd={(_: any, info: any) => {
                                setCurrentX(info.point.x - info.offset.x);
                            }}
                            className="flex gap-6 px-6 md:px-24 lg:px-40"
                        >
                            {activities.map((act) => (
                                <motion.div
                                    key={act.title}
                                    className="shrink-0 w-[85%] md:w-[400px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    {/* Image Placeholder Area */}
                                    <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${act.imgGradient} opacity-20`} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        {/* Activity Tag Overlay */}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                                                {act.tag}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                                            {act.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed break-keep font-medium text-sm md:text-base">
                                            {act.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            {/* Extra space for padding at the end */}
                            <div className="shrink-0 w-12 h-full" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. 여정 (Timeline Section) - 모바일 정렬 수정 */}
            <section className="bg-white py-40 px-6 md:px-24 lg:px-40 relative overflow-hidden border-b border-gray-50">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                            서경대학교는 <span className="text-main">UMC</span>와 5기부터 함께하고 있어요.
                        </h2>
                    </motion.div>

                    {/* Desktop Timeline (Horizontal) */}
                    <div className="hidden md:block relative mt-32 mb-32">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-gray-100 via-main/40 to-main -translate-y-1/2 origin-left"
                        />

                        <div className="flex justify-between items-center relative">
                            {timelineData.map((item, idx) => (
                                <motion.div
                                    key={item.gen}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                                    className="relative flex flex-col items-center group"
                                >
                                    <div className="absolute -top-16 whitespace-nowrap">
                                        <span className={`text-sm md:text-base font-black tracking-tight ${item.current ? 'text-main' : 'text-gray-400'} group-hover:text-main transition-colors`} style={{ fontFamily: 'Paperlogy' }}>
                                            {item.date}
                                        </span>
                                    </div>
                                    <div className={`relative w-5 h-5 rounded-full border-4 transition-all duration-500 group-hover:scale-150 group-hover:bg-main group-hover:border-main/20 ${item.current
                                        ? 'bg-main border-main/20 shadow-[0_0_20px_rgba(0,255,85,0.6)]'
                                        : 'bg-white border-gray-200'
                                        }`} />
                                    <div className="absolute -bottom-16 whitespace-nowrap">
                                        <span className={`text-lg md:text-2xl font-black tracking-tighter ${item.current ? 'text-main' : 'text-gray-900'} group-hover:text-main transition-colors`} style={{ fontFamily: 'Paperlogy' }}>
                                            {item.gen}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Timeline (Vertical) - 정렬 최적화 */}
                    <div className="md:hidden relative py-10 px-4">
                        {/* 28px = pl-4(16px) + Circle Radius(12px) */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute left-[28px] top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-gray-100 via-main/40 to-main origin-top"
                        />
                        <div className="flex flex-col space-y-16 relative">
                            {timelineData.map((item, idx) => (
                                <motion.div
                                    key={item.gen}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                                    className="flex items-center gap-8"
                                >
                                    <div className={`relative w-6 h-6 rounded-full border-4 z-10 shrink-0 ${item.current
                                        ? 'bg-main border-main/20 shadow-[0_0_15px_rgba(0,255,85,0.6)]'
                                        : 'bg-white border-gray-200'
                                        }`} />
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-black tracking-tight ${item.current ? 'text-main' : 'text-gray-400'}`} style={{ fontFamily: 'Paperlogy' }}>
                                            {item.date}
                                        </span>
                                        <span className={`text-xl font-black tracking-tighter ${item.current ? 'text-main' : 'text-gray-900'}`} style={{ fontFamily: 'Paperlogy' }}>
                                            {item.gen}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div {...fadeIn} className="text-center mt-32 max-w-3xl mx-auto px-4">
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium break-keep">
                            서경대학교 <span className="text-gray-900 font-bold underline decoration-main decoration-2 underline-offset-4">UMC</span>는 5기부터 시작해,<br className="hidden md:block" />
                            다양한 분야의 학생들이 함께 도전하고 성장할 수 있는 장을 열어가고 있습니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 5. 최종 CTA (Final Section) - 그라데이션 및 히어로 스타일 배경 */}
            <section className="py-48 px-4 relative overflow-hidden text-center bg-gradient-to-b from-white from-0% via-black via-15% to-black">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <motion.div
                        style={{ y: yOffset }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[linear-gradient(to_right,#00FF55_1px,transparent_1px),linear-gradient(to_bottom,#00FF55_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(60deg)] opacity-20"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-1/4 right-1/4 w-96 h-96 bg-main rounded-full blur-[120px]"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div {...fadeIn}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-block px-4 py-1 bg-main/10 text-main text-[10px] font-black rounded-full border border-main/20 uppercase tracking-[0.3em] mb-8"
                        >
                            Start Your Project
                        </motion.span>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.3] tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                            <span className="inline-flex">
                                {["S", "K", "U", "M", "C"].map((letter, idx) => (
                                    <motion.span
                                        key={idx}
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: idx * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-main to-main-hover"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                            <span>와 함께</span>
                            <br />
                            더 <span className="inline-block py-1 px-1 text-transparent bg-clip-text bg-gradient-to-r from-main via-service-light to-main">빠르게</span>
                            , 더 <span className="inline-block py-1 px-1 text-transparent bg-clip-text bg-gradient-to-r from-main via-service-light to-main">깊게</span> 성장하세요.
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-medium break-keep">
                            다양한 사람들과 함께 배우고, 실제 서비스를 만들어볼 기회를 놓치지 마세요.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(ROUTES.APPLY)}
                            className="group relative px-14 py-6 bg-white text-gray-900 text-xl font-black rounded-2xl overflow-hidden transition-all shadow-[0_0_40px_rgba(0,255,85,0.2)] hover:shadow-main/40"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                지금 바로 지원하기
                                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-main opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.button>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-main/30 to-transparent" />
            </section>
        </div>


    );
};

export default HomePage;