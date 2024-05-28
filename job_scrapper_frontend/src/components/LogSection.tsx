// src/components/LogSection.tsx

import React from 'react';

interface LogSectionProps {
  logs: string[];
  showlogDiv: boolean;
  setShowlogDiv: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogSection: React.FC<LogSectionProps> = ({ logs, showlogDiv, setShowlogDiv }) => (
  <div className="logs">
    <button onClick={() => setShowlogDiv(!showlogDiv)}>
      {showlogDiv ? 'Hide Logs' : 'Show Logs'}
    </button>
    <h2>Active Logs</h2>
    <div className="log-messages">
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  </div>
);

export default LogSection;
