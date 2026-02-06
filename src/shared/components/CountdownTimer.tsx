import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
    const targetDate = new Date('2026-02-15T23:39:00').getTime();
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="mt-12 flex flex-col items-center">
            <div className="flex gap-3 md:gap-5 items-center">
                {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                    { label: 'Sec', value: timeLeft.seconds }
                ].map((item, idx) => (
                    <React.Fragment key={item.label}>
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                {/* Timer Card Design */}
                                <div className="w-20 h-24 md:w-28 md:h-32 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-main/30 group-hover:shadow-main/10 transition-all duration-300">
                                    {/* Accent Line at Top */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-main opacity-80" />

                                    <span className="text-3xl md:text-5xl font-black text-gray-900 tabular-nums z-10" style={{ fontFamily: 'Paperlogy' }}>
                                        {String(item.value).padStart(2, '0')}
                                    </span>

                                    {/* Subtle Background Text Decoration */}
                                    <span className="absolute -bottom-2 -right-1 text-5xl font-black text-gray-50 select-none pointer-events-none group-hover:text-main/5 transition-colors">
                                        {item.label[0]}
                                    </span>
                                </div>

                                {/* Unit Label */}
                                <div className="mt-3">
                                    <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                </div>
                            </div>
                        </div>

                        {/* Separator Colons (Between Cards) */}
                        {idx < 3 && (
                            <div className="mb-8 hidden sm:block">
                                <span className="text-2xl md:text-3xl font-black text-main animate-pulse">:</span>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;