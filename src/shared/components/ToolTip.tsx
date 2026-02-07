import { AnimatePresence, motion } from 'framer-motion';

interface TooltipProps {
    text: string;
    visible: boolean;
    absolutePosition?: string;
    className?: string;
}

const Tooltip = ({ text, visible, absolutePosition, className }: TooltipProps) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: -35, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`absolute ${absolutePosition} px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap z-[100] shadow-xl pointer-events-none ${className}`}
            >
                {text}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
        )}
    </AnimatePresence>
);

export default Tooltip;
