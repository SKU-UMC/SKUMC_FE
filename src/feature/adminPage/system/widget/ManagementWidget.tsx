import { motion } from 'framer-motion';
import ToggleSwitch from '../components/ToggleSwitch';
import LoadingSpinner from '../../../../shared/components/LoadingSpinner';
import type { Major, Part } from '../../../../shared/types/recruitment';
import { useState } from 'react';

interface ManagementWidgetProps {
    title: string;
    items: (Major | Part)[];
    onToggle: (id: number) => Promise<void>;
    onAdd: (name: string) => Promise<void>;
    loadingKeyPrefix: string;
    loadingStates: Record<string, boolean>;
    addPlaceholder: string;
}

// 파트, 학과 관리 위젯
const ManagementWidget: React.FC<ManagementWidgetProps> = ({
    title,
    items,
    onToggle,
    onAdd,
    loadingKeyPrefix,
    loadingStates,
    addPlaceholder
}: ManagementWidgetProps) => {
    const [inputValue, setInputValue] = useState('');
    const M = motion as any;

    return (
        <M.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col overflow-x-hidden"
        >
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-gray-50 pb-6 mb-6">
                <h4 className="text-xl font-black text-gray-900 tracking-tight uppercase" style={{ fontFamily: 'Paperlogy' }}>{title}</h4>
                <div className="flex w-full xl:w-auto gap-2">
                    <input
                        type="text"
                        placeholder={addPlaceholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-grow xl:w-60 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-main/20 outline-none transition-all"
                    />
                    <button
                        onClick={() => { onAdd(inputValue); setInputValue(''); }}
                        disabled={loadingStates[`${loadingKeyPrefix}-add`]}
                        className="px-5 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-main transition-all shrink-0 flex items-center gap-2"
                    >
                        {loadingStates[`${loadingKeyPrefix}-add`] ? <LoadingSpinner size="w-3 h-3" color="text-white" /> : "추가"}
                    </button>
                </div>
            </div>

            <div className="flex-grow space-y-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar overflow-x-hidden">
                {items.map((item: any) => (
                    <div key={item.majorId || item.partId} className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50/80 transition-colors">
                        <div className="flex items-center gap-3">
                            {item.partId && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || '#ddd' }} />}
                            <span className={`font-bold transition-all ${!item.enabled ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                        <ToggleSwitch
                            enabled={item.enabled}
                            onClick={() => onToggle(item.majorId || item.partId)}
                            loading={loadingStates[`${loadingKeyPrefix}-${item.majorId || item.partId}`]}
                        />
                    </div>
                ))}
            </div>
        </M.section>
    );
};

export default ManagementWidget;