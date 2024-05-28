// src/components/LogSection.tsx

import React from 'react';
import Spinner from './Spinner';

interface LogSectionProps {
  logs: string[];
  showlogDiv: boolean;
  setShowlogDiv: (value: boolean) => void;
  isLoading: boolean;
}

const LogSection: React.FC<LogSectionProps> = ({
  logs,
  showlogDiv,
  setShowlogDiv,
  isLoading,
}) => {
  return (
    <div className="log-section">
      <h3>Logs</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="logs">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      )}
      <button onClick={() => setShowlogDiv(false)}>Hide Logs</button>
    </div>
  );
};

export default LogSection;