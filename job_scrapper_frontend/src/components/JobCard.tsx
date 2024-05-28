
import React from 'react';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    description: string;
    requirements: string;
    specifications: string;
  };
  handleApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, handleApply }) => (
  <div className="job-card">
    <h2>{job.title}</h2>
    <p>{job.description}</p>
    <p>{job.requirements}</p>
    <p>{job.specifications}</p>
    <button onClick={handleApply}>Apply</button>
  </div>
);

export default JobCard;
