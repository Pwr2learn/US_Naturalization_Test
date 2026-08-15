"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { StudyCard } from "@/components/StudyCard";
import { ProgressBar } from "@/components/ProgressBar";
import styles from "./page.module.css";
import civicsData from "@/data/civics-2025.json";

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
    format: "standard" | "65-20";
  } | null;
}

type ViewMode = "study" | "test";
type StudyFilter = "all" | "65-20" | "review";
type TestStatus = "idle" | "in_progress" | "passed" | "failed";

const ALL_QUESTIONS = civicsData as Question[];
const STUDY_BATCH_SIZE = 10;
const STANDARD_TEST_TOTAL = 20;
const STANDARD_PASSING_SCORE = 12;
const STANDARD_FAILING_SCORE = 9;
const EXEMPTION_TEST_TOTAL = 10;
const EXEMPTION_PASSING_SCORE = 6;
const EXEMPTION_FAILING_SCORE = 5;

const STORAGE_KEYS = {
  profile: "uscis-civics-profile",
  stats: "uscis-civics-stats",
  studyQueues: "uscis-civics-study-queues",
};

const DEFAULT_PROFILE: CivicsProfile = {
  stateName: "",
  stateCapital: "",
  governor: "",
  senatorOne: "",
  senatorTwo: "",
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

const USCIS_2025_RULES = {
  filingStartDate: "October 20, 2025",
  verifiedDate: "August 15, 2026",
  testUpdatesUrl: "https://www.uscis.gov/citizenship/testupdates",
};

type SavedQueue = {
  order: number[];
  cursor: number;
};

type SavedQueues = Partial<Record<Exclude<StudyFilter, "review">, SavedQueue>>;

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

function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => 0.5 - Math.random());
}

function uniqueIds(ids: number[]) {
  return Array.from(new Set(ids));
}

function resolveDynamicAnswers(question: Question, profile: CivicsProfile) {
  switch (question.ID) {
    case 23:
      return [profile.senatorOne, profile.senatorTwo].filter(Boolean);
    case 29:
      return profile.representative ? [profile.representative] : [];
    case 61:
      return profile.governor ? [profile.governor] : [];
    case 62:
      return profile.stateCapital ? [profile.stateCapital] : [];
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

function getTestSettings(useExemption: boolean) {
  return useExemption
    ? {
        totalQuestions: EXEMPTION_TEST_TOTAL,
        passingScore: EXEMPTION_PASSING_SCORE,
        failingScore: EXEMPTION_FAILING_SCORE,
      }
    : {
        totalQuestions: STANDARD_TEST_TOTAL,
        passingScore: STANDARD_PASSING_SCORE,
        failingScore: STANDARD_FAILING_SCORE,
      };
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

  const testSettings = useMemo(() => getTestSettings(testUseExemption), [testUseExemption]);

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
      setStudyQuestions(shuffleArray(pool).slice(0, STUDY_BATCH_SIZE));
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

    const batchIds = order.slice(cursor, cursor + STUDY_BATCH_SIZE);
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
  const stateSummary = profile.stateName || "Add your state";

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

    setTestQuestions(shuffleArray(pool).slice(0, testSettings.totalQuestions));
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
        date: USCIS_2025_RULES.verifiedDate,
        format: testUseExemption ? "65-20" : "standard",
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

    if (nextScore >= testSettings.passingScore) {
      completeTest(true, nextScore, nextIncorrect);
      return;
    }

    if (nextIncorrect >= testSettings.failingScore || testIndex >= testSettings.totalQuestions - 1) {
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
          <p className={styles.dynamicWarning}>
            Current 2025 test rules checked on {USCIS_2025_RULES.verifiedDate}.
          </p>
          {[23, 29, 61, 62].includes(question.ID) && (
            <p className={styles.dynamicHint}>Fill in your own state details below if you want this answer shown here.</p>
          )}
          {[30, 38, 39, 57].includes(question.ID) && (
            <p className={styles.dynamicHint}>Use the USCIS updates link below for the current federal officeholder.</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.page}>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>2025 civics test</span>
          <h2>Study the 2025 USCIS civics questions.</h2>
          <p className={styles.translation}>Estudie las preguntas de civismo de 2025.</p>
          <p>Use this section for the 2025 test only. It applies to N-400 filings on or after {USCIS_2025_RULES.filingStartDate}.</p>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <strong>State</strong>
            <span>{stateSummary}</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Study set</strong>
            <span>{studyFilter === "65-20" ? "65/20" : studyFilter === "review" ? "Review" : "All 128"}</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Test format</strong>
            <span>{testUseExemption ? "10 questions" : "20 questions"}</span>
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
            <span className={styles.eyebrow}>Location-based answers</span>
            <h3>Add your state details if you need them.</h3>
            <p className={styles.translation}>Agregue los datos de su estado si los necesita.</p>
            <p>These fields help with the 2025 questions that depend on where you live.</p>
          </div>
          <div className={styles.linkGroup}>
            <a href="https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test" target="_blank" rel="noreferrer">
              2025 USCIS test
            </a>
            <a href={USCIS_2025_RULES.testUpdatesUrl} target="_blank" rel="noreferrer">
              USCIS updates
            </a>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label>
            <span>State</span>
            <input
              value={profile.stateName}
              placeholder="Example: New York"
              onChange={(event) => setProfile((prev) => ({ ...prev, stateName: event.target.value }))}
            />
          </label>
          <label>
            <span>Capital</span>
            <input
              value={profile.stateCapital}
              placeholder="Example: Albany"
              onChange={(event) => setProfile((prev) => ({ ...prev, stateCapital: event.target.value }))}
            />
          </label>
          <label>
            <span>Governor</span>
            <input
              value={profile.governor}
              placeholder="Your current governor"
              onChange={(event) => setProfile((prev) => ({ ...prev, governor: event.target.value }))}
            />
          </label>
          <label>
            <span>Senator 1</span>
            <input
              value={profile.senatorOne}
              placeholder="One current U.S. senator"
              onChange={(event) => setProfile((prev) => ({ ...prev, senatorOne: event.target.value }))}
            />
          </label>
          <label>
            <span>Senator 2</span>
            <input
              value={profile.senatorTwo}
              placeholder="Second current U.S. senator"
              onChange={(event) => setProfile((prev) => ({ ...prev, senatorTwo: event.target.value }))}
            />
          </label>
          <label>
            <span>Representative</span>
            <input
              value={profile.representative}
              placeholder="Your current U.S. representative"
              onChange={(event) => setProfile((prev) => ({ ...prev, representative: event.target.value }))}
            />
          </label>
        </div>
      </section>

      {viewMode === "study" && (
        <section className={styles.studyPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>Study mode</span>
              <h3>{STUDY_BATCH_SIZE} questions at a time</h3>
              <p className={styles.translation}>{STUDY_BATCH_SIZE} preguntas por vez</p>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.selectWrap}>
                <span>Set</span>
                <select
                  value={studyFilter}
                  onChange={(event) => setStudyFilter(event.target.value as StudyFilter)}
                >
                  <option value="all">All 128</option>
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
                  Next {STUDY_BATCH_SIZE}
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
              <h3>Practice the 2025 format</h3>
              <p className={styles.translation}>Practique el formato de 2025</p>
              <p>
                {testUseExemption
                  ? "10 questions. Pass with 6 correct."
                  : "Up to 20 questions. Pass with 12 correct."}
              </p>
            </div>
          </div>

          <div className={styles.testSetup}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={testUseExemption}
                onChange={(event) => setTestUseExemption(event.target.checked)}
              />
              <span>Use the 65/20 special consideration set</span>
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
                {stats.lastResult.status === "passed" ? "Passed" : "Not passed"} - {stats.lastResult.correct} correct, {stats.lastResult.incorrect} wrong.
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

          <ProgressBar current={testIndex + 1} total={testSettings.totalQuestions} />

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
