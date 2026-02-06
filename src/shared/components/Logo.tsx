

interface LogoProps {
    className?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ className, size = 40 }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <img src="/" alt="Logo" />
        </div>
    );
};

export default Logo;
