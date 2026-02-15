
import React from 'react';
import type { ApplicationResponse } from '../shared/types/application';
import { motion } from 'framer-motion';
import { useMyApplications } from '../shared/hooks/useRecruitment';
import { storage } from '../shared/utils/sessionStorage';
import CountdownTimer from '../feature/applyPage/CountdownTimer';

const ApplyPage: React.FC = () => {
    const user = storage.getUser();

    const handleApply = () => {
        // 구글 폼 또는 외부 지원 링크
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5eVU8FrVgNjc0QYoYviPNtJBZwWWb9Jp45ySW5pft7Hv1Fg/viewform', '_blank');
    };

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="bg-white min-h-screen pb-40">
            {/* Hero Section with Countdown */}
            <div className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, rotateX: 60 }}
                        animate={{ opacity: 0.1, rotateX: 45 }}
                        transition={{ duration: 2 }}
                        className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[linear-gradient(to_right,#00FF55_1px,transparent_1px),linear-gradient(to_bottom,#00FF55_1px,transparent_1px)] bg-[size:60px_60px]"
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>
                        10기 <span className="text-main drop-shadow-[0_0_15px_rgba(0,255,85,0.3)]">챌린저</span> 모집
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium mb-12">
                        10기 서경대 UMC와 함께할 열정 가득한 여러분들을 기다립니다.
                    </p>
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5 }
                            }}
                            className="relative"
                        >
                            <motion.span
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-block px-6 py-2 bg-main/10 text-main text-sm font-black rounded-full border border-main/30 uppercase tracking-tight mb-8 shadow-[0_0_20px_rgba(0,255,85,0.1)]"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-main animate-pulse" />
                                    10기 서류 지원 마감까지
                                </span>
                            </motion.span>
                        </motion.div>
                        <CountdownTimer />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 space-y-40">
                {/* 1. 모집 일정 */}
                <section>
                    <motion.div {...fadeIn} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>모집 일정</h2>
                        <div className="w-12 h-1.5 bg-main/30 mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10 overflow-visible">
                        {[
                            { step: '01', title: '서류 모집', date: '02.16 - 02.25' },
                            { step: '02', title: '서류 합격 발표', date: '02.27' },
                            { step: '03', title: '인터뷰', date: '03.03 - 03.06' },
                            { step: '04', title: '최종 합격 발표', date: '03.08' },
                            { step: '05', title: '연합 OT 및 뒷풀이', date: '03.13', highlight: true },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-3xl p-6 md:p-8 border border-gray-100 flex flex-col items-center text-center group transition-all duration-300 ${item.highlight ? 'bg-main/5 border-main/20 shadow-lg shadow-main/5' : 'bg-gray-50'} min-w-0`}
                            >
                                <span className="text-main font-black text-sm mb-4 tracking-widest">{item.step}</span>
                                <h3 className={`text-base md:text-lg font-bold mb-2 break-keep ${item.highlight ? 'text-main' : 'text-gray-900'}`}>{item.title}</h3>
                                <p className="text-gray-400 font-medium text-xs md:text-sm whitespace-nowrap">{item.date}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p {...fadeIn} className="text-center text-sm font-bold text-gray-400 bg-gray-50 py-4 rounded-2xl border border-dashed flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        연합 OT는 필수 참여이며, 참여하지 않는 경우 불이익이 발생할 수 있습니다.
                    </motion.p>
                </section>

                {/* 2. 공통 지원자격 / 활동 기간 / 활동비 - 미니멀 줄글 형태 */}
                <section className="space-y-16">
                    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {/* Quals */}
                            <div>
                                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-main rounded-full" />
                                    공통 지원 자격
                                </h3>
                                <div className="space-y-3 pl-4">
                                    {[
                                        '서경대학교 재학생/휴학생 (졸업생 제외)',
                                        '학기 중 10~12회 스터디 적극 참여 가능',
                                        '방학 중 사이드 프로젝트에 최선을 다할 수 있는 사람',
                                        '아이디어톤, 해커톤 등 UMC 공식 행사에 성실히 참여 가능',
                                        'UMC와 함께 도전하고 성장하고 싶은 사람'
                                    ].map((text, i) => (
                                        <p key={i} className="text-gray-600 font-medium leading-relaxed flex items-start gap-2">
                                            <span className="text-main font-bold">•</span>
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Period */}
                            <div>
                                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-blue-400 rounded-full" />
                                    활동 기간
                                </h3>
                                <p className="pl-4 text-gray-600 font-medium">
                                    <span className="text-gray-900 font-black mr-2">2026.03 ~ 2026.08</span>
                                    (약 6개월 간 진행)
                                </p>
                            </div>

                            {/* Fee */}
                            <div>
                                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-orange-400 rounded-full" />
                                    활동비 안내
                                </h3>
                                <div className="pl-4 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-400">입부비</span>
                                            <span className="text-lg font-black text-gray-900">50,000원</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 font-medium">(중앙 회비 35,000원 + 교내 회비 15,000원)</div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-400">프로젝트 참가비</span>
                                            <span className="text-lg font-black text-gray-900">30,000원</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 font-medium">(10기 수료 시, 5,000원 페이백 제공)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 3. 모집 분야 */}
                <section>
                    <motion.div {...fadeIn} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>모집 분야</h2>
                        <div className="w-12 h-1.5 bg-main/30 mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            { id: 1, name: 'Plan', desc: '자신만의 아이디어로 웹/앱 프로젝트를 기획하고 싶은 사람', color: '#FFB800' },
                            { id: 2, name: 'Design', desc: '자신만의 웹/앱 디자인을 만들어보고 싶은 사람', color: '#FF4D4D' },
                            { id: 3, name: 'Android (Kotlin)', desc: '지원 전 필수 기초 지식: Kotlin (Java) 기초', color: '#3DDC84' },
                            { id: 4, name: 'iOS (Swift)', desc: '지원 전 필수 기초 지식: Swift 기초 (📌맥북 필수)', color: '#0A84FF' },
                            { id: 5, name: 'Web (React)', desc: '지원 전 필수 기초 지식: HTML / CSS + JavaScript 기초', color: '#007ACC' },
                            { id: 6, name: 'Spring Boot (Java)', desc: '지원 전 필수 기초 지식: Java 및 SQL 기초', color: '#6DB33F' },
                            { id: 7, name: 'Node.js (JavaScript)', desc: '지원 전 필수 기초 지식: JavaScript 및 SQL 기초', color: '#9d03fc' },
                        ].map((part) => (
                            <motion.div
                                key={part.id}
                                {...fadeIn}
                                className="flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 gap-6 group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0" style={{ backgroundColor: `${part.color}15`, color: part.color }}>
                                        {part.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-1">{part.name}</h3>
                                        <p className="text-gray-500 font-medium break-keep">{part.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. 활동 코스 - 가로 폭 넉넉히 */}
                <section>
                    <motion.div {...fadeIn} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'Paperlogy' }}>활동 코스</h2>
                        <div className="w-12 h-1.5 bg-main/30 mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-12">
                        {/* Course 1 */}
                        <motion.div {...fadeIn} className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-main/10 blur-[100px] -mr-32 -mt-32" />
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-5">
                                    <span className="px-4 py-1 bg-main/20 text-main text-[10px] font-black rounded-full border border-main/30 uppercase tracking-widest mb-6 inline-block">Study Course</span>
                                    <h3 className="text-3xl text-white font-black mb-6 leading-tight break-keep">(1) MAKERs <br /> 스터디 과정 (학기 중, 3~6월)</h3>
                                    <p className="text-gray-400 font-medium mb-8 leading-relaxed break-keep">
                                        각 파트별 제공된 강의 & 참고자료를 활용하여 워크북 문제를 자기주도적으로 해결합니다.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            '파트별 피드백 & 스터디를 통해 협력하며 학습',
                                            '해결이 어려운 문제는 스터디 팀원 & 파트장에게 질문하여 해결',
                                            '해커톤, 컨퍼런스 등 다양한 행사를 통해 실전 경험을 쌓을 기회 제공'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 group">
                                                <div className="w-5 h-5 rounded-full bg-main/20 flex items-center justify-center shrink-0 mt-0.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-main" />
                                                </div>
                                                <span className="text-sm text-gray-300 font-medium break-keep">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10">
                                    <div className="mb-10">
                                        <h4 className="text-main font-black mb-6 flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                                            <span className="break-keep text-sm md:text-base">스터디 과정 내 모집 코스</span>
                                        </h4>
                                        <p className="text-[13px] text-gray-400 mb-6 italic break-keep">📢 개발 파트는 스터디 코스가 두 가지로 나뉩니다. (기획/디자인 제외)</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-white font-black mb-3 text-sm md:text-base">💁‍♂️ 주니어 코스</div>
                                                <p className="text-xs text-gray-400 leading-relaxed break-keep">
                                                    📍 기초 지식은 있으나 개발 경험이 적거나 없는 학생 <br /> 📍 기본 스터디 후 시니어 미션 자유 도전 가능
                                                </p>
                                            </div>
                                            <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-white font-black mb-3 text-sm md:text-base">💁‍♀️ 시니어 코스</div>
                                                <p className="text-xs text-gray-400 leading-relaxed break-keep">
                                                    📍 전 기수(1~9기) 수료생 또는 프로젝트 경험자 <br /> 📍 워크북 선택 참여 가능, 운영진 최종 배정
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-6 text-[13px] text-gray-500 font-medium break-keep">🛑 시니어 코스를 신청하더라도, 운영진 판단에 따라 주니어 코스로 배정될 수 있습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Course 2 */}
                        <motion.div {...fadeIn} className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2">
                                <span className="px-4 py-1 bg-gray-200 text-gray-500 text-[10px] font-black rounded-full border border-gray-300 uppercase tracking-widest mb-6 inline-block">Project Course</span>
                                <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight break-keep">(2) MASTERs <br /> 프로젝트 과정 (방학 중, 7~8월)</h3>
                                <div className="space-y-4">
                                    {[
                                        '스터디 수료 후, 팀을 구성하여 실무 사이드 프로젝트 진행',
                                        '기획자 / 디자이너 / 프론트엔드 / 백엔드 협업',
                                        '프로젝트 완료 후 "UMC 데모데이"에서 발표 및 교류'
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-3 group">
                                            <div className="w-5 h-5 rounded-full bg-main/20 flex items-center justify-center shrink-0 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-main" />
                                            </div>
                                            <span className="text-gray-600 font-medium break-keep">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full self-start">
                                {[
                                    '# 실전 사이드 프로젝트',
                                    '# UMC 데모데이',
                                    '# 공식 수료 인정',
                                    '# 성장 경험'
                                ].map((title, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 flex items-center justify-center">
                                        <h4 className="text-gray-900 font-black text-sm md:text-base text-center break-keep">{title}</h4>
                                    </div>
                                ))}
                            </div> */}
                        </motion.div>
                    </div>
                </section>

                {/* 5. SNS Links */}
                <section>
                    <motion.div {...fadeIn} className="bg-main/5 rounded-[3rem] p-10 md:p-12 text-center border border-main/10 flex flex-col items-center">
                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter break-keep">📢 UMC에 대해 더 자세히 알고 싶다면⁉️</h3>
                        <p className="text-gray-500 font-medium mb-10 break-keep">공식 채널을 통해 다양한 스토리를 확인해보세요.</p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { name: 'UMC 서경대 카카오톡 채널', url: 'https://open.kakao.com/o/sJYVaggi', color: '#FEE500', text: '#381E1F' },
                                { name: 'UMC 서경대 공식 인스타그램', url: 'https://www.instagram.com/sku_makeus_challenge?igsh=MWcyYWpqYmdmb2N0YQ%3D%3D&utm_source=qr', color: '#E1306C', text: '#fff' },
                                { name: 'UMC 공식 인스타그램', url: 'https://www.instagram.com/uni_makeus_challenge?igsh=MTdod2ZldzBkdWVpNw==', color: '#333', text: '#fff' },
                            ].map((sns) => (
                                <motion.a
                                    key={sns.name}
                                    href={sns.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="px-6 md:px-8 py-4 rounded-2xl font-black text-xs md:text-sm flex items-center gap-3 shadow-md"
                                    style={{ backgroundColor: sns.color, color: sns.text }}
                                >
                                    {sns.name}
                                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {user && (
                    <MyApplicationStatus />
                )}
            </div>

            {/* Sticky Bottom Apply Button */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent z-50 flex justify-center backdrop-blur-sm"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApply}
                    className="group relative w-full max-w-2xl h-20 bg-gray-900 rounded-[1.25rem] overflow-hidden shadow-2xl transition-all hover:shadow-main/40 flex items-center justify-center gap-4"
                >
                    <span className="relative z-10 text-xl md:text-2xl font-black text-white tracking-widest">
                        지금 바로 지원하기
                    </span>
                    <div className="absolute inset-0 bg-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="relative z-10 w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-2 text-white group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.button>
            </motion.div>
        </div>
    );
};

const MyApplicationStatus = () => {
    const { data: applications, isLoading } = useMyApplications();

    if (isLoading) return <div className="mt-20 text-center text-gray-400">지원 현황을 불러오는 중...</div>;

    if (!applications || !Array.isArray(applications) || applications.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 border-t pt-20"
        >
            <h3 className="text-2xl font-black mb-10 text-center" style={{ fontFamily: 'Paperlogy' }}>내 지원 현황</h3>
            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">지원 파트</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">지원 일시</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">서류 결과</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">최종 결과</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applications?.map((app: ApplicationResponse) => (
                                <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-6 text-sm font-bold text-gray-900">{app.partName}</td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6">
                                        <ResultBadge status={app.firstResult} />
                                    </td>
                                    <td className="px-8 py-6">
                                        <ResultBadge status={app.secondResult} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

const ResultBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'PASSED':
            return <span className="px-4 py-1.5 bg-main/10 text-main text-[10px] font-black rounded-full border border-main/20">합격</span>;
        case 'FAILED':
            return <span className="px-4 py-1.5 bg-red-50 text-red-500 text-[10px] font-black rounded-full border border-red-100">불합격</span>;
        default:
            return <span className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-black rounded-full border border-gray-100">심사중</span>;
    }
};

export default ApplyPage;
