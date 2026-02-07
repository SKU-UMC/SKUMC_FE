
import React from 'react';
import type { ApplyFormResponse, ApplicationResponse } from '../shared/types/application';
import { RECRUITMENT_PARTS } from '../shared/constants/constants';
import { ROUTES } from '../shared/routes/routes';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApplyForms, useMyApplications } from '../shared/hooks/useRecruitment';
import { storage } from '../shared/utils/sessionStorage';
import CountdownTimer from '../shared/components/CountdownTimer';

const ApplyPage: React.FC = () => {
    const navigate = useNavigate();
    const user = storage.getUser();
    const { data: templates } = useApplyForms();

    const handleApply = (partId: number) => {
        const template = templates?.find((t: ApplyFormResponse) => t.partId === partId);
        if (template) {
            navigate(ROUTES.APPLY_FORM.replace(':formId', template.formId));
        } else {
            alert('해당 파트의 지원서가 활성화되지 않았습니다.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-4 py-1.5 text-[10px] md:text-xs font-black rounded-full border uppercase tracking-widest mb-6"
                    style={{
                        backgroundColor: '#fadd021a',
                        color: '#fadd02',
                        borderColor: '#fadd0240'
                    }}
                >
                    Recruitment Coming Soon
                </motion.span>

                <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">10기 챌린저 모집</h2>
                <p className="text-gray-500 text-lg">10기 SKUMC와 함께할 열정 가득한 여러분들을 기다립니다.</p>

                <CountdownTimer />
            </motion.div>

            <div className="bg-gray-50 rounded-3xl p-8 mb-12 border">
                <h3 className="text-2xl font-bold mb-6">모집 요강</h3>
                <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                    <p>• <strong>대상:</strong> 서경대학교 재학생 (전공 무관)</p>
                    <p>• <strong>모집 기간:</strong> 2026.02.04 ~ 2026.02.15</p>
                    <p>• <strong>선발 과정:</strong> 서류 심사 &gt; 인터뷰 &gt; 최종 합격</p>
                    <p>• <strong>활동 기간:</strong> 1년 (매주 수요일 정기 세션 참여 필수)</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {RECRUITMENT_PARTS.map((part) => (
                    <motion.button
                        key={part.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApply(part.id)}
                        className="px-6 py-3 rounded-2xl border-2 font-bold transition-all shadow-sm hover:shadow-md"
                        style={{
                            borderColor: part.color,
                            color: part.color,
                            backgroundColor: 'white'
                        }}
                    >
                        10기 {part.name} 지원하기
                    </motion.button>
                ))}
            </div>


            {user && (
                <MyApplicationStatus />
            )}
        </div>
    );
};

const MyApplicationStatus = () => {
    const { data: applications, isLoading } = useMyApplications();

    if (isLoading) return <div className="mt-20 text-center text-gray-400">지원 현황을 불러오는 중...</div>;
    if (!applications || applications.length === 0 || !Array.isArray(applications)) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 border-t pt-10"
        >
            <h3 className="text-xl font-bold mb-6">내 지원 현황</h3>
            <div className="bg-white border rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">지원 파트</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">지원 일시</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">서류 결과</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">최종 결과</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {applications?.map((app: ApplicationResponse) => (
                            <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium">{app.partName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <ResultBadge status={app.firstResult} />
                                </td>
                                <td className="px-6 py-4">
                                    <ResultBadge status={app.secondResult} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

const ResultBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'PASSED':
            return <span className="px-3 py-1 bg-main/10 text-main text-xs font-bold rounded-full">합격</span>;
        case 'FAILED':
            return <span className="px-3 py-1 bg-red-100 text-red-500 text-xs font-bold rounded-full">불합격</span>;
        default:
            return <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-bold rounded-full">심사중</span>;
    }
};


export default ApplyPage;
