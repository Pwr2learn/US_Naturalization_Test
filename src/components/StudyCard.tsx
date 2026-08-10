import React from 'react';
import styles from './StudyCard.module.css';

interface StudyCardProps {
  frontContent: React.ReactNode;
  backContent?: React.ReactNode;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  frontContent,
  backContent,
  isFlipped = false,
  onFlip
}) => {
  return (
    <div className={styles.cardContainer} onClick={onFlip}>
      <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
        <div className={styles.cardFace}>
          <div className={styles.content}>{frontContent}</div>
          {backContent && <div className={styles.flipHint}>Tap to flip</div>}
        </div>
        {backContent && (
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <div className={styles.content}>{backContent}</div>
          </div>
        )}
      </div>
    </div>
  );
};
