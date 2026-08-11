"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { StudyCard } from "@/components/StudyCard";
import { ProgressBar } from "@/components/ProgressBar";
import styles from "./page.module.css";
import civicsData from "../../../docs/uscis_100q_parsed.json";

interface Question {
  ID: number;
  Question: string;
  Accepted_Answers: string[];
  Dynamic_Answer: boolean;
  Is_65_20: boolean;
}

interface CivicsProfile {
  stateName: string;
  stateCapital: string;
  governor: string;
  senatorOne: string;
  senatorTwo: string;
  representative: string;
}

interface StudyStats {
  testsTaken: number;
  testsPassed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  hardQuestionIds: number[];
  lastResult: {
    status: "passed" | "failed";
    correct: number;
    incorrect: number;
    date: string;
  } | null;
}

type ViewMode = "study" | "test";
type StudyFilter = "all" | "65-20" | "review";
type TestStatus = "idle" | "in_progress" | "passed" | "failed";

const ALL_QUESTIONS = civicsData as Question[];

const STORAGE_KEYS = {
  profile: "uscis-civics-profile",
  stats: "uscis-civics-stats",
  studyQueues: "uscis-civics-study-queues",
};

const DEFAULT_PROFILE: CivicsProfile = {
  stateName: "New York",
  stateCapital: "Albany",
  governor: "Kathy Hochul",
  senatorOne: "Chuck Schumer",
  senatorTwo: "Kirsten Gillibrand",
  representative: "",
};

const DEFAULT_STATS: StudyStats = {
  testsTaken: 0,
  testsPassed: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  hardQuestionIds: [],
  lastResult: null,
};

const CURRENT_FEDERAL_ANSWERS = {
  president: "Donald J. Trump",
  vicePresident: "JD Vance",
  speakerOfHouse: "Mike Johnson",
  presidentParty: "Republican",
  supremeCourtJustices: "9",
  chiefJustice: "John G. Roberts, Jr.",
  verifiedDate: "August 11, 2026",
};

function mergeProfileWithDefaults(saved: Partial<CivicsProfile>) {
  return {
    stateName: saved.stateName || DEFAULT_PROFILE.stateName,
    stateCapital: saved.stateCapital || DEFAULT_PROFILE.stateCapital,
    governor: saved.governor || DEFAULT_PROFILE.governor,
    senatorOne: saved.senatorOne || DEFAULT_PROFILE.senatorOne,
    senatorTwo: saved.senatorTwo || DEFAULT_PROFILE.senatorTwo,
    representative: saved.representative || DEFAULT_PROFILE.representative,
  };
}

type SavedQueue = {
  order: number[];
  cursor: number;
};

type SavedQueues = Partial<Record<Exclude<StudyFilter, "review">, SavedQueue>>;

function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => 0.5 - Math.random());
}

function uniqueIds(ids: number[]) {
  return Array.from(new Set(ids));
}

function resolveDynamicAnswers(question: Question, profile: CivicsProfile) {
  switch (question.ID) {
    case 20:
      return [profile.senatorOne, profile.senatorTwo].filter(Boolean);
    case 23:
      return profile.representative ? [profile.representative] : [];
    case 28:
      return [CURRENT_FEDERAL_ANSWERS.president, "Trump"];
    case 29:
      return [CURRENT_FEDERAL_ANSWERS.vicePresident, "J.D. Vance"];
    case 39:
      return [CURRENT_FEDERAL_ANSWERS.supremeCourtJustices, "nine"];
    case 40:
      return [CURRENT_FEDERAL_ANSWERS.chiefJustice, "Chief Justice John Roberts"];
    case 43:
      return [profile.governor];
    case 44:
      return [profile.stateCapital];
    case 46:
      return [CURRENT_FEDERAL_ANSWERS.presidentParty];
    case 47:
      return [CURRENT_FEDERAL_ANSWERS.speakerOfHouse];
    default:
      return question.Accepted_Answers;
  }
}

function answerListForQuestion(question: Question, profile: CivicsProfile) {
  const resolved = resolveDynamicAnswers(question, profile).filter(Boolean);
  return resolved.length > 0 ? resolved : question.Accepted_Answers;
}

function getPoolByFilter(filter: StudyFilter, hardQuestionIds: number[]) {
  switch (filter) {
    case "65-20":
      return ALL_QUESTIONS.filter((question) => question.Is_65_20);
    case "review":
      return ALL_QUESTIONS.filter((question) => hardQuestionIds.includes(question.ID));
    default:
      return ALL_QUESTIONS;
  }
}

export default function CivicsTest() {
  const [profile, setProfile] = useState<CivicsProfile>(DEFAULT_PROFILE);
  const [stats, setStats] = useState<StudyStats>(DEFAULT_STATS);
  const [savedQueues, setSavedQueues] = useState<SavedQueues>({});
  const [viewMode, setViewMode] = useState<ViewMode>("study");
  const [studyFilter, setStudyFilter] = useState<StudyFilter>("all");
  const [studyQuestions, setStudyQuestions] = useState<Question[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [testIndex, setTestIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState<TestStatus>("idle");
  const [isFlipped, setIsFlipped] = useState(false);
  const [testUseExemption, setTestUseExemption] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.profile);
      const savedStats = localStorage.getItem(STORAGE_KEYS.stats);
      const savedQueueState = localStorage.getItem(STORAGE_KEYS.studyQueues);

      if (savedProfile) {
        setProfile(mergeProfileWithDefaults(JSON.parse(savedProfile)));
      }

      if (savedStats) {
        setStats({ ...DEFAULT_STATS, ...JSON.parse(savedStats) });
      }

      if (savedQueueState) {
        setSavedQueues(JSON.parse(savedQueueState));
      }
    } catch {
      setProfile(DEFAULT_PROFILE);
      setStats(DEFAULT_STATS);
      setSavedQueues({});
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
  }, [stats, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEYS.studyQueues, JSON.stringify(savedQueues));
  }, [savedQueues, isLoaded]);

  const studyPool = useMemo(
    () => getPoolByFilter(studyFilter, stats.hardQuestionIds),
    [studyFilter, stats.hardQuestionIds]
  );

  const loadNextStudySet = (reset = false) => {
    const pool = getPoolByFilter(studyFilter, stats.hardQuestionIds);

    if (pool.length === 0) {
      setStudyQuestions([]);
      setStudyIndex(0);
      setIsFlipped(false);
      return;
    }

    if (studyFilter === "review") {
      setStudyQuestions(shuffleArray(pool).slice(0, 10));
      setStudyIndex(0);
      setIsFlipped(false);
      return;
    }

    const poolIds = pool.map((question) => question.ID);
    const saved = savedQueues[studyFilter];

    let order = saved?.order?.filter((id) => poolIds.includes(id)) ?? [];
    let cursor = saved?.cursor ?? 0;

    if (reset || order.length !== poolIds.length) {
      order = shuffleArray(poolIds);
      cursor = 0;
    }

    if (cursor >= order.length) {
      order = shuffleArray(poolIds);
      cursor = 0;
    }

    const batchIds = order.slice(cursor, cursor + 10);
    const batch = batchIds
      .map((id) => pool.find((question) => question.ID === id))
      .filter((question): question is Question => Boolean(question));

    setStudyQuestions(batch);
    setStudyIndex(0);
    setIsFlipped(false);
    setSavedQueues((current) => ({
      ...current,
      [studyFilter]: {
        order,
        cursor: cursor + batch.length,
      },
    }));
  };

  useEffect(() => {
    if (!isLoaded) return;
    loadNextStudySet(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, studyFilter, stats.hardQuestionIds.join(",")]);

  const currentStudyQuestion = studyQuestions[studyIndex];
  const currentTestQuestion = testQuestions[testIndex];
  const lastCardInSet = studyIndex === studyQuestions.length - 1;

  const markNeedsReview = (questionId: number, shouldKeep: boolean) => {
    setStats((prev) => ({
      ...prev,
      hardQuestionIds: shouldKeep
        ? uniqueIds([...prev.hardQuestionIds, questionId])
        : prev.hardQuestionIds.filter((id) => id !== questionId),
    }));
  };

  const startTest = () => {
    const pool = testUseExemption
      ? ALL_QUESTIONS.filter((question) => question.Is_65_20)
      : ALL_QUESTIONS;

    setTestQuestions(shuffleArray(pool).slice(0, 10));
    setTestIndex(0);
    setScore(0);
    setIncorrect(0);
    setStatus("in_progress");
    setIsFlipped(false);
    setViewMode("test");
  };

  const completeTest = (passed: boolean, nextScore: number, nextIncorrect: number) => {
    setStatus(passed ? "passed" : "failed");
    setStats((prev) => ({
      ...prev,
      testsTaken: prev.testsTaken + 1,
      testsPassed: prev.testsPassed + (passed ? 1 : 0),
      correctAnswers: prev.correctAnswers + nextScore,
      incorrectAnswers: prev.incorrectAnswers + nextIncorrect,
      hardQuestionIds: passed
        ? prev.hardQuestionIds
        : uniqueIds([...prev.hardQuestionIds, currentTestQuestion?.ID ?? 0].filter(Boolean)),
      lastResult: {
        status: passed ? "passed" : "failed",
        correct: nextScore,
        incorrect: nextIncorrect,
        date: CURRENT_FEDERAL_ANSWERS.verifiedDate,
      },
    }));
  };

  const handleTestAnswer = (isCorrect: boolean) => {
    if (!currentTestQuestion) return;

    if (!isCorrect) {
      markNeedsReview(currentTestQuestion.ID, true);
    }

    setIsFlipped(false);
    const nextScore = isCorrect ? score + 1 : score;
    const nextIncorrect = isCorrect ? incorrect : incorrect + 1;

    setScore(nextScore);
    setIncorrect(nextIncorrect);

    if (nextScore >= 6) {
      completeTest(true, nextScore, nextIncorrect);
      return;
    }

    if (nextIncorrect >= 5 || testIndex >= 9) {
      completeTest(false, nextScore, nextIncorrect);
      return;
    }

    setTestIndex((current) => current + 1);
  };

  const renderAnswerBlock = (question: Question) => (
    <div className={styles.answerContent}>
      <h3>Answer</h3>
      <p className={styles.translation}>Respuesta</p>
      <ul>
        {answerListForQuestion(question, profile).map((answer, index) => (
          <li key={`${question.ID}-${index}`}>{answer}</li>
        ))}
      </ul>

      {question.Dynamic_Answer && (
        <div className={styles.dynamicBox}>
          <p className={styles.dynamicWarning}>Current answers checked on {CURRENT_FEDERAL_ANSWERS.verifiedDate}.</p>
          {question.ID === 23 && !profile.representative && (
            <p className={styles.dynamicHint}>Add the U.S. Representative if you want this answer filled in.</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.page}>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Civics</span>
          <h2>Civics questions</h2>
          <p className={styles.translation}>Preguntas de civismo</p>
          <p>Study 10 at a time. Tap the card to see the answer.</p>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <strong>State</strong>
            <span>New York</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Study set</strong>
            <span>{studyFilter === "65-20" ? "65/20" : studyFilter === "review" ? "Review" : "All 100"}</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Tests passed</strong>
            <span>{stats.testsPassed}</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Need review</strong>
            <span>{stats.hardQuestionIds.length}</span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <button
            type="button"
            className={viewMode === "study" ? styles.primaryButton : styles.secondaryButton}
            onClick={() => {
              setViewMode("study");
              setStatus("idle");
              setIsFlipped(false);
            }}
          >
            Study
          </button>
          <button
            type="button"
            className={viewMode === "test" ? styles.primaryButton : styles.secondaryButton}
            onClick={() => {
              setViewMode("test");
              setStatus("idle");
              setIsFlipped(false);
            }}
          >
            Test
          </button>
          <Link href="/" className={styles.ghostButton}>
            Home
          </Link>
        </div>
      </section>

      <section className={styles.profilePanel}>
        <div className={styles.profileHeader}>
          <div>
            <span className={styles.eyebrow}>New York answers</span>
            <h3>New York is filled in by default.</h3>
            <p className={styles.translation}>Nueva York está listo por defecto.</p>
            <p>Change it only if needed.</p>
          </div>
          <div className={styles.linkGroup}>
            <a href="https://www.uscis.gov/citizenship/testupdates" target="_blank" rel="noreferrer">
              USCIS updates
            </a>
            <a
              href="https://www.house.gov/representatives/find-your-representative"
              target="_blank"
              rel="noreferrer"
            >
              Find representative
            </a>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label>
            <span>State</span>
            <input
              value={profile.stateName}
              onChange={(event) => setProfile((prev) => ({ ...prev, stateName: event.target.value }))}
            />
          </label>
          <label>
            <span>Capital</span>
            <input
              value={profile.stateCapital}
              onChange={(event) => setProfile((prev) => ({ ...prev, stateCapital: event.target.value }))}
            />
          </label>
          <label>
            <span>Governor</span>
            <input
              value={profile.governor}
              onChange={(event) => setProfile((prev) => ({ ...prev, governor: event.target.value }))}
            />
          </label>
          <label>
            <span>Senator 1</span>
            <input
              value={profile.senatorOne}
              onChange={(event) => setProfile((prev) => ({ ...prev, senatorOne: event.target.value }))}
            />
          </label>
          <label>
            <span>Senator 2</span>
            <input
              value={profile.senatorTwo}
              onChange={(event) => setProfile((prev) => ({ ...prev, senatorTwo: event.target.value }))}
            />
          </label>
          <label>
            <span>Representative</span>
            <input
              value={profile.representative}
              placeholder="Optional"
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, representative: event.target.value }))
              }
            />
          </label>
        </div>
      </section>

      {viewMode === "study" && (
        <section className={styles.studyPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>Study mode</span>
              <h3>10 questions at a time</h3>
              <p className={styles.translation}>10 preguntas por vez</p>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.selectWrap}>
                <span>Set</span>
                <select
                  value={studyFilter}
                  onChange={(event) => setStudyFilter(event.target.value as StudyFilter)}
                >
                  <option value="all">All 100</option>
                  <option value="65-20">65/20</option>
                  <option value="review">Review list</option>
                </select>
              </label>

              <button type="button" className={styles.secondaryButton} onClick={() => loadNextStudySet(true)}>
                Start over
              </button>
            </div>
          </div>

          {currentStudyQuestion ? (
            <>
              <ProgressBar current={studyIndex + 1} total={studyQuestions.length} />

              <div className={styles.studyMeta}>
                <span>Set question {studyIndex + 1} of {studyQuestions.length}</span>
                <span>Question #{currentStudyQuestion.ID}</span>
              </div>

              <StudyCard
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped((current) => !current)}
                frontContent={
                  <div className={styles.questionContent}>
                    <span className={styles.qId}>Question {currentStudyQuestion.ID}</span>
                    <p>{currentStudyQuestion.Question}</p>
                  </div>
                }
                backContent={renderAnswerBlock(currentStudyQuestion)}
              />

              <div className={styles.studyActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  disabled={studyIndex === 0}
                  onClick={() => {
                    setIsFlipped(false);
                    setStudyIndex((current) => Math.max(0, current - 1));
                  }}
                >
                  Back
                </button>

                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={lastCardInSet}
                  onClick={() => {
                    setIsFlipped(false);
                    setStudyIndex((current) => Math.min(studyQuestions.length - 1, current + 1));
                  }}
                >
                  Next
                </button>

                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => loadNextStudySet(false)}
                >
                  Next 10
                </button>
              </div>

              {isFlipped && (
                <div className={styles.evaluationControls}>
                  <p>Keep this in the review list?</p>
                  <p className={styles.translation}>¿Guardar para repasar?</p>
                  <div className={styles.evalButtons}>
                    <button
                      type="button"
                      className={styles.incorrectBtn}
                      onClick={() => markNeedsReview(currentStudyQuestion.ID, true)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={styles.correctBtn}
                      onClick={() => markNeedsReview(currentStudyQuestion.ID, false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <h4>No questions here yet.</h4>
              <p>Add some missed questions to the review list first.</p>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && status === "idle" && (
        <section className={styles.studyPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>Test mode</span>
              <h3>Practice the real format</h3>
              <p className={styles.translation}>Practique el formato real</p>
              <p>10 questions. Pass with 6 correct.</p>
            </div>
          </div>

          <div className={styles.testSetup}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={testUseExemption}
                onChange={(event) => setTestUseExemption(event.target.checked)}
              />
              <span>Use the 65/20 question set</span>
            </label>

            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={startTest}>
                Start test
              </button>
            </div>
          </div>

          {stats.lastResult && (
            <div className={styles.lastResult}>
              <strong>Last result</strong>
              <span>
                {stats.lastResult.status === "passed" ? "Passed" : "Not passed"} — {stats.lastResult.correct} correct, {stats.lastResult.incorrect} wrong.
              </span>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && status === "in_progress" && currentTestQuestion && (
        <section className={styles.studyPanel}>
          <div className={styles.testHeader}>
            <div>
              <span className={styles.eyebrow}>Test</span>
              <h3>Question {testIndex + 1}</h3>
              <p className={styles.translation}>Pregunta {testIndex + 1}</p>
            </div>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => {
                setStatus("idle");
                setIsFlipped(false);
              }}
            >
              Stop
            </button>
          </div>

          <ProgressBar current={testIndex + 1} total={10} />

          <div className={styles.scoreBoard}>
            <span className={styles.correct}>Correct: {score}</span>
            <span className={styles.wrong}>Wrong: {incorrect}</span>
          </div>

          <StudyCard
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((current) => !current)}
            frontContent={
              <div className={styles.questionContent}>
                <span className={styles.qId}>Question {currentTestQuestion.ID}</span>
                <p>{currentTestQuestion.Question}</p>
              </div>
            }
            backContent={renderAnswerBlock(currentTestQuestion)}
          />

          {isFlipped && (
            <div className={styles.evaluationControls}>
              <p>Was the answer correct?</p>
              <p className={styles.translation}>¿La respuesta fue correcta?</p>
              <div className={styles.evalButtons}>
                <button type="button" className={styles.incorrectBtn} onClick={() => handleTestAnswer(false)}>
                  No
                </button>
                <button type="button" className={styles.correctBtn} onClick={() => handleTestAnswer(true)}>
                  Yes
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && (status === "passed" || status === "failed") && (
        <section className={styles.studyPanel}>
          <div className={`${styles.resultCard} ${status === "passed" ? styles.pass : styles.fail}`}>
            <h3>{status === "passed" ? "Passed" : "Try again"}</h3>
            <p className={styles.translation}>{status === "passed" ? "Aprobado" : "Intente otra vez"}</p>
            <p>Score: {score} correct, {incorrect} wrong.</p>
            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={startTest}>
                Start new test
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setViewMode("study");
                  setStatus("idle");
                  setIsFlipped(false);
                }}
              >
                Back to study
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
