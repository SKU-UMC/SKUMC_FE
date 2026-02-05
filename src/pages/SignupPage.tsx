interface SignupPageProps {
    onSuccess: () => Promise<void>;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess }) => {
    return (
        <div>
            <h1>Signup Page</h1>
        </div>
    );
};

export default SignupPage;