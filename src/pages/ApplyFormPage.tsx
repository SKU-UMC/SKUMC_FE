
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { User } from '../shared/types/user';
import type { Major } from '../shared/types/recruitment';
import { useMajors } from '../shared/hooks/useRecruitment';
import { useSubmitApplication } from '../shared/hooks/useMutations';
import { ROUTES } from '../shared/routes/routes';
import { motion } from 'framer-motion';

const formSchema = z.object({
    name: z.string().min(2, '이름을 입력해주세요.'),
    majorId: z.string().min(1, '학과를 선택해주세요.'),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-XXXX-XXXX 형식으로 입력해주세요.'),
    motivation: z.string().min(100, '최소 100자 이상 작성해주세요.'),
    portfolio: z.string().url('올바른 URL을 입력해주세요.').optional().or(z.literal('')),
});

interface ApplyFormPageProps {
    user: User | null;
}

const ApplyFormPage: React.FC<ApplyFormPageProps> = ({ user }) => {
    const { formId } = useParams<{ formId: string }>();
    const navigate = useNavigate();
    const { data: majors } = useMajors();
    const submitApplication = useSubmitApplication();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            majorId: '',
            phone: '',
            motivation: '',
            portfolio: '',
        }
    });

    const onSubmit = async (data: any) => {
        if (!formId) {
            alert('잘못된 접근입니다.');
            return;
        }

        try {
            // Map data to ApplicationRequest structure
            const applicationData = {
                formId: formId,
                answers: [
                    { questionId: 'motivation-q', answer: data.motivation }
                ]
            };

            await submitApplication.mutateAsync(applicationData);
            alert('지원서가 성공적으로 제출되었습니다!');
            navigate(ROUTES.APPLY);
        } catch (error) {
            console.error('Application submission error:', error);
            alert('지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    if (!user) return <div className="p-20 text-center">로그인이 필요합니다.</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center space-x-4 mb-8">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h2 className="text-3xl font-bold">지원서 작성</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6 bg-white p-8 border rounded-3xl shadow-sm">
                        <h3 className="text-lg font-bold border-b pb-4 mb-6">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                                <input
                                    {...register('name')}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none"
                                    placeholder="홍길동"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">학과</label>
                                <select
                                    {...register('majorId')}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none bg-white"
                                >
                                    <option value="">학과를 선택하세요</option>
                                    {majors?.filter((m: Major) => m.enabled).map((m: Major) => (
                                        <option key={m.majorId} value={m.majorId}>{m.name}</option>
                                    ))}
                                </select>
                                {errors.majorId && <p className="text-red-500 text-xs mt-1">{errors.majorId.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                                <input
                                    {...register('phone')}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none"
                                    placeholder="010-0000-0000"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 bg-white p-8 border rounded-3xl shadow-sm">
                        <h3 className="text-lg font-bold border-b pb-4 mb-6">질문 문항</h3>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                지원 동기 및 동아리에서 얻고 싶은 점을 서술해주세요. (최소 100자)
                            </label>
                            <textarea
                                {...register('motivation')}
                                rows={10}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none resize-none"
                                placeholder="내용을 입력해주세요..."
                            />
                            {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">포트폴리오 (선택, 링크 URL)</label>
                            <input
                                {...register('portfolio')}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-main outline-none"
                                placeholder="https://github.com/..."
                            />
                            {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-main text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-main/20 disabled:bg-gray-300"
                    >
                        {isSubmitting ? '제출 중...' : '지원서 제출하기'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ApplyFormPage;