import SKUMC from "../../assets/skumc_logo_1.svg?react";

interface LogoProps {
    className?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ className, size = 40 }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <SKUMC />
        </div>
    );
};

export default Logo;
