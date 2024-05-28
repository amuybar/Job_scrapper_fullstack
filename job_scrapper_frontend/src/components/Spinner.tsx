import React from 'react';
import '../styles/Spinner.scss';

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 32 }) => {
  return (
    <div className="spinner" style={{ width: `${size}px`, height: `${size}px` }}>
      <div className="spinner-inner"></div>
    </div>
  );
};

export default Spinner;