import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className={styles.barBackground}>
        <div 
          className={styles.barFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
