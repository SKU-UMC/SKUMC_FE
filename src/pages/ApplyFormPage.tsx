import React from 'react';
import type { User } from '../shared/types/user';

interface ApplyFormPageProps {
    user: User | null;
}

const ApplyFormPage: React.FC<ApplyFormPageProps> = ({ user }) => {
    return (
        <div>
            <h1>Apply Form Page</h1>
        </div>
    );
};

export default ApplyFormPage;