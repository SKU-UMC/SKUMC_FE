import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { Generation, Part } from '../../../../shared/types/recruitment';
import LoadingSpinner from '../../../../shared/components/LoadingSpinner';

interface GenerationManagementWidgetProps {
    generations: Generation[];
    parts: Part[];
    onSave: (id: number, data: any) => Promise<void>;
    loadingStates: Record<string, boolean>;
}

// 기수 관리 위젯
const GenerationManagementWidget: React.FC<GenerationManagementWidgetProps> = ({ generations, parts, onSave, loadingStates }) => {
    const [selectedGenId, setSelectedGenId] = useState<number>(generations[generations.length - 1]?.cohortId);
    const selectedGen = useMemo(() => generations.find(g => g.cohortId === selectedGenId), [selectedGenId, generations]);

    const [formData, setFormData] = useState<any>({ partIds: [] });
    const M = motion as any;

    useEffect(() => {
        if (selectedGen) {
            setFormData({
                applyStartDate: selectedGen.applyStartDate.slice(0, 16),
                applyEndDate: selectedGen.applyEndDate.slice(0, 16),
                interviewStartDate: selectedGen.interviewStartDate.slice(0, 16),
                interviewEndDate: selectedGen.interviewEndDate.slice(0, 16),
                partIds: selectedGen.parts.map(p => p.partId)
            });
        }
    }, [selectedGen]);

    const handleFieldChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handlePartToggle = (partId: number) => {
        setFormData((prev: any) => ({
            ...prev,
            partIds: prev.partIds.includes(partId)
                ? prev.partIds.filter((id: number) => id !== partId)
                : [...prev.partIds, partId]
        }));
    };

    const formatToISO = (dateStr: string) => dateStr ? `${dateStr}:00` : '';

    if (!selectedGen) return null;

    return (
        <M.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-sm mb-10"
        >
            <div className="flex flex-col xl:flex-row justify-between gap-12">
                {/* Left: Cohort Selector */}
                <div className="flex flex-col min-w-[200px]">
                    <label className="text-[15px] font-black text-gray-400 uppercase tracking-widest mb-4">기수 선택</label>
                    <div className="relative group">
                        <select
                            value={selectedGenId}
                            onChange={(e) => setSelectedGenId(Number(e.target.value))}
                            className="w-full bg-gray-900 text-white font-black text-4xl p-6 rounded-[2rem] appearance-none cursor-pointer outline-none focus:ring-4 focus:ring-main/20 transition-all"
                            style={{ fontFamily: 'Paperlogy' }}
                        >
                            {generations.map(g => (
                                <option key={g.cohortId} value={g.cohortId} className="bg-white text-gray-900 text-lg">{g.cohort}TH</option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-main">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    <div className="mt-6 px-2 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedGen.cohort === 10 ? 'bg-main animate-pulse' : 'bg-gray-300'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${selectedGen.cohort === 10 ? 'text-main' : 'text-gray-400'}`}>
                            {selectedGen.cohort === 10 ? 'Current Active' : 'Completed'}
                        </span>
                    </div>
                </div>

                {/* Right: Detailed Form */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">모집 시작 날짜</label>
                                <input
                                    type="datetime-local"
                                    value={formData.applyStartDate || ''}
                                    onChange={(e) => handleFieldChange('applyStartDate', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-main/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">모집 마감 날짜</label>
                                <input
                                    type="datetime-local"
                                    value={formData.applyEndDate || ''}
                                    onChange={(e) => handleFieldChange('applyEndDate', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-main/20 outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">면접 시작 날짜</label>
                                <input
                                    type="datetime-local"
                                    value={formData.interviewStartDate || ''}
                                    onChange={(e) => handleFieldChange('interviewStartDate', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-main/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">면접 종료 날짜</label>
                                <input
                                    type="datetime-local"
                                    value={formData.interviewEndDate || ''}
                                    onChange={(e) => handleFieldChange('interviewEndDate', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-main/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">파트 활성화 여부 빠르게 선택하기</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {parts.map(p => (
                                <button
                                    key={p.partId}
                                    onClick={() => handlePartToggle(p.partId)}
                                    className={`px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${formData.partIds?.includes(p.partId)
                                        ? 'bg-gray-900 border-gray-900 text-main shadow-lg shadow-gray-900/10'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                        }`}
                                >
                                    {p.name}
                                    {formData.partIds?.includes(p.partId) && <div className="w-1.5 h-1.5 rounded-full bg-main" />}
                                </button>
                            ))}
                        </div>

                        {/* Simple Parts Summary */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{selectedGen.cohort}기 모집 파트</p>
                            <div className="flex flex-wrap gap-2">
                                {parts.filter(p => formData.partIds?.includes(p.partId)).map(p => (
                                    <span key={p.partId} className="text-[10px] font-bold text-gray-700 bg-white px-2 py-1 rounded-md border border-gray-200">
                                        {p.name}
                                    </span>
                                ))}
                                {formData.partIds?.length === 0 && <span className="text-[10px] text-gray-300">No parts selected.</span>}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end pt-8 border-t border-gray-50">
                        <button
                            onClick={() => onSave(selectedGenId, {
                                ...formData,
                                applyStartDate: formatToISO(formData.applyStartDate),
                                applyEndDate: formatToISO(formData.applyEndDate),
                                interviewStartDate: formatToISO(formData.interviewStartDate),
                                interviewEndDate: formatToISO(formData.interviewEndDate),
                            })}
                            disabled={loadingStates[`gen-${selectedGenId}`]}
                            className="w-full sm:w-auto px-12 py-5 bg-gray-900 text-white text-base font-black rounded-[1.5rem] hover:bg-main transition-all shadow-2xl shadow-gray-900/10 flex items-center justify-center gap-4 disabled:bg-gray-200"
                        >
                            {loadingStates[`gen-${selectedGenId}`] ? <LoadingSpinner color="text-white" size="w-5 h-5" /> : <span>{selectedGen.cohort}TH 설정 저장하기</span>}
                        </button>
                    </div>
                </div>
            </div>
        </M.section>
    );
};

export default GenerationManagementWidget;
