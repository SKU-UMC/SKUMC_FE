import { useState } from "react";
import Tooltip from "../../../../shared/components/ToolTip";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";

const ToggleSwitch = ({ enabled, onClick, loading }: { enabled: boolean; onClick: () => void; loading?: boolean }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="relative flex items-center gap-3">
            <Tooltip text={enabled ? "비활성화 하기" : "활성화하기"} visible={hovered && !loading} absolutePosition="left-1/2 -translate-x-1/2" />
            {loading && <LoadingSpinner />}
            <button
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                disabled={loading}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${enabled ? 'bg-main shadow-[0_0_10px_rgba(0,255,85,0.4)]' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    );
};

export default ToggleSwitch;