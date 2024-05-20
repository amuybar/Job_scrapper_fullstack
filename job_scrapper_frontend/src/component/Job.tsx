import React from 'react';

interface JobProps {
    title: string;
    description: string;
    requirements: string;
    specifications: string;
}

const Job: React.FC<JobProps> = ({ title, description, requirements, specifications }) => {
    return (
        <div className="job-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{requirements}</p>
            <p>{specifications}</p>
            <button>Apply</button>
        </div>
    );
};

export default Job;
