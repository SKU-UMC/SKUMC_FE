
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../shared/apis/authService'
import { ROUTES } from '../shared/routes/routes';
import { motion } from 'framer-motion';
import Logo from '../shared/components/Logo';

const signupSchema = z.object({
    discordEmail: z.string().email('올바른 이메일 형식이 아닙니다.'),
    notionEmail: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupPageProps {
    onSuccess: () => Promise<void>;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            await setProfile(data);
            await onSuccess(); // 회원 정보 갱신 및 상태 업데이트
            alert('회원가입이 완료되었습니다!');
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error('Signup error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white border rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50"
            >
                <div className="flex flex-col items-center mb-10">
                    <Logo />
                    <h2 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'Paperlogy' }}>SIGN UP</h2>
                    <p className="text-gray-400 mt-2 text-center">SKUMC 활동을 위해 <br />디스코드와 노션 계정 정보가 필요합니다.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">디스코드 이메일</label>
                        <input
                            {...register('discordEmail')}
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none transition-all"
                            placeholder="example@discord.com"
                        />
                        {errors.discordEmail && <p className="text-red-500 text-xs mt-1">{errors.discordEmail.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">노션 이메일</label>
                        <input
                            {...register('notionEmail')}
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none transition-all"
                            placeholder="example@notion.so"
                        />
                        {errors.notionEmail && <p className="text-red-500 text-xs mt-1">{errors.notionEmail.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-main transition-colors shadow-xl disabled:bg-gray-300"
                    >
                        {isSubmitting ? '가입 처리 중...' : '회원가입 완료'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default SignupPage;
