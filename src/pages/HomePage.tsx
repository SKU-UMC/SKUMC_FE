
import React from 'react';
import HeroSection from '../shared/components/HeroSection';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
    return (
        <div className="pb-20">
            <HeroSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40 py-16 md:py-24">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            num: '01',
                            title: '학습과 성장',
                            desc: '최신 기술 스택을 함께 연구하며 개인의 역량을 최대치로 끌어올립니다.',
                            icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        },
                        {
                            num: '02',
                            title: '실전 프로젝트',
                            desc: '기획부터 배포까지, 실제 서비스가 되는 과정을 직접 경험합니다.',
                            icon: <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        },
                        {
                            num: '03',
                            title: '네트워킹',
                            desc: '선후배간의 끈끈한 네트워킹을 통해 커리어 로드맵을 그려나갑니다.',
                            icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.num}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="p-10 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-main group-hover:text-white transition-all duration-300 text-main">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {item.icon}
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed break-keep">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </section>

                <section className="mt-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 rounded-[3rem] p-16 md:p-24 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-main/20 blur-[100px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-main/10 blur-[80px] -ml-32 -mb-32" />

                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ fontFamily: 'Paperlogy' }}>
                            Your Journey <br />Starts <span className="text-main italic underline decoration-main/30">Here.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                            기술에 대한 열정만 있다면 누구든 환영합니다. <br className="hidden md:block" />
                            SKUMC에서 당신의 가능성을 현실로 만들어보세요.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center text-xs font-bold">
                                        {i === 4 ? '+50' : ''}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-medium">현재 50명 이상의 부원이 함께하고 있습니다.</p>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;