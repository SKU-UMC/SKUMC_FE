import React from 'react';
import type { User } from '../shared/types/user';

interface ApplyPageProps {
    user: User | null;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ user }) => {
    return (
        <div>
            <h1>Apply Page</h1>
        </div>
    );
};

export default ApplyPage;