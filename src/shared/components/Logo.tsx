
import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", size = 32 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Circle - Subtle Glassmorphism effect in UI might use this, but for Logo we keep it clean */}
            <rect width="100" height="100" rx="24" fill="currentColor" fillOpacity="0.05" className="text-gray-900" />

            {/* Central 'U' - The Core bridge */}
            <path
                d="M35 30V55C35 63.2843 41.7157 70 50 70C58.2843 70 65 63.2843 65 55V30"
                stroke="#00FF55"
                strokeWidth="10"
                strokeLinecap="round"
            />

            {/* 'S' and 'K' stylized on the left */}
            <path
                d="M20 35H28M20 45H28M20 55H28"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-gray-900"
            />
            <path
                d="M15 70L25 55L15 40"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-gray-400"
            />

            {/* 'M' and 'C' stylized on the right */}
            <path
                d="M72 70V35L80 50L88 35V70"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-gray-900"
            />
            <path
                d="M85 85C75 85 70 80 70 75"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-gray-400"
            />

            {/* Aesthetic Dot */}
            <circle cx="50" cy="50" r="4" fill="#00FF55" />
        </svg>
    );
};

export default Logo;
