"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudyCard } from '@/components/StudyCard';
import { ProgressBar } from '@/components/ProgressBar';
import styles from './page.module.css';
import civicsData from '@/data/civics.json';

interface Question {
  ID: number;
  Question: string;
  Accepted_Answers: string[];
  Dynamic_Answer: boolean;
}

type TestStatus = 'not_started' | 'in_progress' | 'passed' | 'failed';

export default function CivicsTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState<TestStatus>('not_started');
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Shuffle and pick 10 questions for a new test
    const shuffled = [...civicsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const startTest = () => {
    setStatus('in_progress');
    setCurrentIndex(0);
    setScore(0);
    setIncorrect(0);
    setIsFlipped(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setIsFlipped(false);
    
    let newScore = score;
    let newIncorrect = incorrect;
    
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
    } else {
      newIncorrect += 1;
      setIncorrect(newIncorrect);
    }

    // USCIS 2008 Logic: 6 correct passes, 5 wrong fails (since max is 10)
    if (newScore >= 6) {
      setStatus('passed');
    } else if (newIncorrect >= 5 || currentIndex >= 9) {
      setStatus('failed');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (status === 'not_started') {
    return (
      <div className={styles.container}>
        <h2>Civics Practice Test</h2>
        <p>The USCIS officer will ask you up to 10 questions. You must answer 6 correctly to pass.</p>
        <button className={styles.primaryButton} onClick={startTest}>Start Test</button>
      </div>
    );
  }

  if (status === 'passed' || status === 'failed') {
    return (
      <div className={styles.container}>
        <div className={`${styles.resultCard} ${status === 'passed' ? styles.pass : styles.fail}`}>
          <h2>{status === 'passed' ? 'You Passed! 🎉' : 'You Failed ❌'}</h2>
          <p>Final Score: {score} Correct, {incorrect} Incorrect</p>
          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={startTest}>Try Again</button>
            <Link href="/" className={styles.secondaryButton}>Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className={styles.container}>
      <ProgressBar current={currentIndex + 1} total={10} />
      
      <div className={styles.scoreBoard}>
        <span className={styles.correct}>✅ {score} / 6 to pass</span>
        <span className={styles.wrong}>❌ {incorrect} / 5 to fail</span>
      </div>

      <StudyCard 
        isFlipped={isFlipped}
        onFlip={() => !isFlipped && setIsFlipped(true)}
        frontContent={
          <div className={styles.questionContent}>
            <span className={styles.qId}>Question {currentQ.ID}</span>
            <p>{currentQ.Question}</p>
          </div>
        }
        backContent={
          <div className={styles.answerContent}>
            <h3>Accepted Answers:</h3>
            <ul>
              {currentQ.Accepted_Answers.map((ans, i) => (
                <li key={i}>{ans}</li>
              ))}
            </ul>
            {currentQ.Dynamic_Answer && (
              <p className={styles.dynamicWarning}>* This answer changes based on your location or date.</p>
            )}
          </div>
        }
      />

      {isFlipped && (
        <div className={styles.evaluationControls}>
          <p>Did you answer correctly?</p>
          <div className={styles.evalButtons}>
            <button className={styles.incorrectBtn} onClick={() => handleAnswer(false)}>No, I got it wrong</button>
            <button className={styles.correctBtn} onClick={() => handleAnswer(true)}>Yes, I was right!</button>
          </div>
        </div>
      )}
    </div>
  );
}
