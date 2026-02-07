
import React, { useState } from 'react';
import { useApplications, useApplyForms, useMajors, useParts } from '../shared/hooks/useRecruitment';
import type { ApplicationResponse, ApplyFormResponse } from '../shared/types/application';
import type { Major, Part } from '../shared/types/recruitment';
import { motion } from 'framer-motion';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'applications' | 'templates' | 'settings'>('applications');
    const { data: apps, isLoading: isAppsLoading } = useApplications();
    const { data: templates, isLoading: isTemplatesLoading } = useApplyForms();
    const { data: majors, isLoading: isMajorsLoading } = useMajors();
    const { data: parts, isLoading: isPartsLoading } = useParts(); // API로 파트 정보 조회

    // 로딩 상태 처리 (간단하게)
    const isLoading = activeTab === 'applications' ? isAppsLoading :
        activeTab === 'templates' ? isTemplatesLoading :
            (isMajorsLoading || isPartsLoading);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'Paperlogy' }}>ADMIN DASHBOARD</h2>
                    <p className="text-gray-400">SKUMC 관리자 페이지</p>
                </div>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                    {(['applications', 'templates', 'settings'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-main shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab === 'applications' ? '지원자 관리' : tab === 'templates' ? '지원서 템플릿' : '시스템 설정'}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border rounded-3xl overflow-hidden shadow-sm min-h-[500px]"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-full min-h-[300px]">
                        <div className="text-gray-400">데이터를 불러오는 중입니다...</div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'applications' && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">전체 지원자 목록 <span className="text-main ml-2">{apps?.length || 0}</span></h3>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-y">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">지원자</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">지원 파트</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">서류 상태</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">최종 상태</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {(!apps || !Array.isArray(apps) || apps.length === 0) ? (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                                        지원자가 없습니다.
                                                    </td>
                                                </tr>
                                            ) : (
                                                apps.map((app: ApplicationResponse) => (
                                                    <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="font-bold">{app.applicantName}</div>
                                                            <div className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm font-medium">{app.partName}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <ResultBadge result={app.firstResult} />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <ResultBadge result={app.secondResult} />
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'templates' && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-bold">지원서 템플릿 관리</h3>
                                    <button className="px-4 py-2 bg-main text-white text-sm font-bold rounded-xl hover:opacity-90 shadow-lg shadow-main/10 transition-all">
                                        신규 템플릿 생성
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Array.isArray(templates) && templates.map((template: ApplyFormResponse) => (
                                        <div key={template.formId} className="border rounded-2xl p-6 hover:border-main transition-colors group relative bg-white">
                                            {template.isDefault && (
                                                <span className="absolute top-4 right-4 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                                                    기본값
                                                </span>
                                            )}
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-xs font-bold text-main px-2 py-1 bg-main/10 rounded-lg">
                                                    {template.partName}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-lg mb-2">{template.templateName}</h4>
                                            <p className="text-xs text-gray-400 mb-4">생성일: {template.createdAt ? new Date(template.createdAt).toLocaleDateString() : '-'}</p>
                                            <button className="w-full py-2 bg-gray-50 text-gray-500 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                                상세 보기
                                            </button>
                                        </div>
                                    ))}
                                    {(!templates || templates.length === 0) && (
                                        <div className="col-span-full py-10 text-center text-gray-400 border rounded-2xl border-dashed">
                                            등록된 템플릿이 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-10">시스템 일반 설정</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <section>
                                        <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-6">학과 (Major) 관리</h4>
                                        <div className="space-y-2">
                                            {Array.isArray(majors) && majors.map((major: Major) => (
                                                <div key={major.majorId} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-main/20 transition-all">
                                                    <span className={`font-medium ${!major.enabled && 'text-gray-300 line-through'}`}>{major.name}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-md ${major.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                                        {major.enabled ? '활성' : '비활성'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-6">지원 파트 (Part) 관리</h4>
                                        <div className="space-y-2">
                                            {Array.isArray(parts) && parts.map((part: Part) => (
                                                <div key={part.partId} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:border-main/20 border border-transparent transition-all">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: part.color || '#ccc' }} />
                                                        <span className="font-medium">{part.name}</span>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded-md ${part.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                                        {part.enabled ? '활성' : '비활성'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

const ResultBadge = ({ result }: { result: string }) => {
    switch (result) {
        case 'PASSED':
            return <span className="bg-main/10 text-main border-main/20 text-xs font-bold px-3 py-1 rounded-full border">합격</span>;
        case 'FAILED':
            return <span className="bg-red-50 text-red-500 border-red-100 text-xs font-bold px-3 py-1 rounded-full border">불합격</span>;
        default:
            return <span className="bg-gray-50 text-gray-500 border-gray-200 text-xs font-bold px-3 py-1 rounded-full border">심사중</span>;
    }
};

export default AdminPage;
export { ResultBadge };