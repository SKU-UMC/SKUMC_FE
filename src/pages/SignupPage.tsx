
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { setProfile } from '../shared/apis/authService'
import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from '../shared/components/Logo';
import { storage } from '../shared/utils/sessionStorage';
import type { User } from '../shared/types/user';

const signupSchema = z.object({
    discordEmail: z.string().email('올바른 이메일 형식이 아닙니다.'),
    notionEmail: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupPageProps {
    onSuccess: () => Promise<void>;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            const res = await setProfile(data);

            // 서버 응답 데이터를 바탕으로 유저 정보 갱신
            const updatedUser: User = {
                id: res.id,
                name: res.name,
                email: res.email,
                role: res.role,
                isRegistered: res.isRegistered,
                isCompleted: res.isCompleted
            };
            storage.setUser(updatedUser);

            await onSuccess(); // 정보 갱신 및 리다이렉트 실행
        } catch (error) {
            console.error('Signup error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-white">
            {/* Background Aesthetics from HeroSection */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
                <motion.div
                    initial={{ opacity: 0, rotateX: 60 }}
                    animate={{ opacity: 0.1, rotateX: 45 }}
                    transition={{ duration: 2 }}
                    style={{ y: y1 }}
                    className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[linear-gradient(to_right,#00FF55_1px,transparent_1px),linear-gradient(to_bottom,#00FF55_1px,transparent_1px)] bg-[size:60px_60px]"
                />

                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -40, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-80 h-80 bg-main/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -30, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-service-light/5 rounded-full blur-[120px]"
                />
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[15%] w-24 h-24 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl flex items-center justify-center"
                >
                    <div className="w-8 h-8 rounded-full bg-main/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-main animate-pulse" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[25%] left-[10%] w-32 h-32 bg-white/30 backdrop-blur-lg border border-white/40 rounded-[2rem] shadow-xl flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-main/10 to-transparent" />
                    <Logo size={40} className="opacity-40" />
                </motion.div>
            </div>

            {/* Glassmorphic Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 max-w-md w-full"
            >
                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-10 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden group">
                    {/* Subtle top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-main via-service-light to-main opacity-80" />

                    <div className="flex flex-col items-center mb-12">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                            className="mb-6 p-4 bg-gray-900 rounded-[1.5rem] shadow-xl shadow-gray-900/10"
                        >
                            <Logo size={40} />
                        </motion.div>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase leading-none" style={{ fontFamily: 'Paperlogy' }}>
                            SIGN UP
                        </h2>
                        <div className="mt-4 space-y-1 text-center">
                            <p className="text-gray-500 font-bold text-sm tracking-tight">SKUMC 챌린저 활동을 위해</p>
                            <p className="text-gray-400 font-medium text-xs break-keep">디스코드와 노션 계정 정보가 필요합니다.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-5">
                            <div className="group">
                                <label className="flex items-center gap-2 text-[15px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1 group-focus-within:text-main transition-colors">
                                    디스코드 이메일
                                    <div className="w-1 h-1 rounded-full bg-main/40" />
                                </label>
                                <input
                                    {...register('discordEmail')}
                                    className={`w-full px-5 py-4 bg-gray-50/50 border ${errors.discordEmail ? 'border-red-200 focus:ring-red-500/10' : 'border-gray-100 focus:border-main focus:ring-main/10'} rounded-2xl outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 focus:ring-4`}
                                    placeholder="example@discord.com"
                                />
                                {errors.discordEmail && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-2 px-1">{errors.discordEmail.message}</motion.p>}
                            </div>

                            <div className="group">
                                <label className="flex items-center gap-2 text-[15px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1 group-focus-within:text-main transition-colors">
                                    노션 이메일
                                    <div className="w-1 h-1 rounded-full bg-main/40" />
                                </label>
                                <input
                                    {...register('notionEmail')}
                                    className={`w-full px-5 py-4 bg-gray-50/50 border ${errors.notionEmail ? 'border-red-200 focus:ring-red-500/10' : 'border-gray-100 focus:border-main focus:ring-main/10'} rounded-2xl outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 focus:ring-4`}
                                    placeholder="example@notion.so"
                                />
                                {errors.notionEmail && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-bold mt-2 px-1">{errors.notionEmail.message}</motion.p>}
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full py-5 bg-gray-900 text-white text-base font-black rounded-2xl transition-all shadow-2xl shadow-gray-900/10 hover:bg-main disabled:bg-gray-200 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-main via-service-light to-main opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <span className="relative z-10">{isSubmitting ? '가입 처리 중...' : '회원가입 완료'}</span>
                            {!isSubmitting && (
                                <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
