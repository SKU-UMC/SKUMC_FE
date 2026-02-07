
import React, { useState } from 'react';
// import { useApplications, useApplyForms, useMajors, useParts } from '../shared/hooks/useRecruitment';
// import type { ApplicationResponse, ApplyFormResponse } from '../shared/types/application';
import type { Major, Part, Generation } from '../shared/types/recruitment';
import { AnimatePresence, motion } from 'framer-motion';
import { MOCK_MAJORS, MOCK_PARTS, MOCK_GENERATIONS } from '../data/system-setting.data';
import GenerationManagementWidget from '../feature/adminPage/system/widget/GenerationManagementWidget';
import ManagementWidget from '../feature/adminPage/system/widget/ManagementWidget';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'applications' | 'templates' | 'settings'>('applications');
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const [majors, setMajors] = useState<Major[]>(MOCK_MAJORS);
    const [parts, setParts] = useState<Part[]>(MOCK_PARTS);
    const [generations, setGenerations] = useState<Generation[]>(MOCK_GENERATIONS);

    // const { data: apps, isLoading: isAppsLoading } = useApplications();
    // const { data: templates, isLoading: isTemplatesLoading } = useApplyForms();
    // const { data: majors, isLoading: isMajorsLoading } = useMajors();
    // const { data: parts, isLoading: isPartsLoading } = useParts(); 

    // 로딩 상태 처리
    const updateLoading = (key: string, value: boolean) => {
        setLoadingStates(prev => ({ ...prev, [key]: value }));
    };

    const handleToggleMajor = async (id: number) => {
        const key = `major-${id}`;
        updateLoading(key, true);
        await new Promise(r => setTimeout(r, 600));
        setMajors(prev => prev.map(m => m.majorId === id ? { ...m, enabled: !m.enabled } : m));
        updateLoading(key, false);
    };

    const handleTogglePart = async (id: number) => {
        const key = `part-${id}`;
        updateLoading(key, true);
        await new Promise(r => setTimeout(r, 600));
        setParts(prev => prev.map(p => p.partId === id ? { ...p, enabled: !p.enabled } : p));
        updateLoading(key, false);
    };

    const handleAddMajor = async (name: string) => {
        if (!name.trim()) return;
        updateLoading('major-add', true);
        await new Promise(r => setTimeout(r, 800));
        setMajors(prev => [...prev, { majorId: Date.now(), name, enabled: true }]);
        updateLoading('major-add', false);
    };

    const handleAddPart = async (name: string) => {
        if (!name.trim()) return;
        updateLoading('part-add', true);
        await new Promise(r => setTimeout(r, 800));
        setParts(prev => [...prev, { partId: Date.now(), name, description: name, enabled: true, color: '#00FF55' }]);
        updateLoading('part-add', false);
    };

    const handleSaveGeneration = async (id: number, data: any) => {
        const key = `gen-${id}`;
        updateLoading(key, true);
        console.log('Final ISO Data for Generation Update:', data);
        await new Promise(r => setTimeout(r, 1200));
        setGenerations(prev => prev.map(g => g.cohortId === id ? { ...g, ...data, parts: parts.filter(p => data.partIds.includes(p.partId)) } : g));
        updateLoading(key, false);
        alert('시스템 설정이 성공적으로 반영되었습니다.');
    };



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

            <AnimatePresence>
                {activeTab === 'settings' ? (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-8"
                    >
                        {/* 1. Generation Management (Top Priority) */}
                        <div className="flex items-center gap-4 px-4 mb-6">
                            <div className="w-1.5 h-10 bg-main rounded-full" />
                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase" style={{ fontFamily: 'Paperlogy' }}>기수 별 모집 정보 설정</h3>
                        </div>

                        <GenerationManagementWidget
                            generations={generations}
                            parts={parts}
                            onSave={handleSaveGeneration}
                            loadingStates={loadingStates}
                        />

                        {/* 2. Majors & Parts (PC Side-by-side) */}
                        <div className="flex items-center gap-4 px-4 mb-6">
                            <div className="w-1.5 h-10 bg-gray-200 rounded-full" />
                            <h3 className="text-2xl font-black text-gray-400 tracking-tighter uppercase" style={{ fontFamily: 'Paperlogy' }}>학과, 파트 정보 설정</h3>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <ManagementWidget
                                title="학과 관리"
                                items={majors}
                                onToggle={handleToggleMajor}
                                onAdd={handleAddMajor}
                                loadingKeyPrefix="major"
                                loadingStates={loadingStates}
                                addPlaceholder="학과명 추가"
                            />
                            <ManagementWidget
                                title="파트 관리"
                                items={parts}
                                onToggle={handleTogglePart}
                                onAdd={handleAddPart}
                                loadingKeyPrefix="part"
                                loadingStates={loadingStates}
                                addPlaceholder="파트명 추가"
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="apps"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-32 bg-white border border-gray-100 rounded-[3rem] text-center"
                    >
                        <p className="text-gray-300 font-black text-2xl uppercase tracking-widest">Applicant Dashboard Incoming</p>
                    </motion.div>
                )}
            </AnimatePresence>
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