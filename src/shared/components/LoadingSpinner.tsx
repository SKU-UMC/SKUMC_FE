const LoadingSpinner = ({ size = "w-4 h-4", color = "text-main" }) => (
    <div className={`${size} border-2 border-t-transparent ${color} rounded-full animate-spin`} />
);

export default LoadingSpinner;
