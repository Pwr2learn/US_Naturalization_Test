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
  reviewedQuestionIds: number[];
  hardQuestionIds: number[];
  lastResult: {
    status: "passed" | "failed";
    correct: number;
    incorrect: number;
    date: string;
  } | null;
}

type ViewMode = "study" | "test";
type StudyFilter = "all" | "65-20" | "dynamic" | "review";
type TestStatus = "idle" | "in_progress" | "passed" | "failed";

const ALL_QUESTIONS = civicsData as Question[];

const STORAGE_KEYS = {
  profile: "uscis-civics-profile",
  stats: "uscis-civics-stats",
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
  reviewedQuestionIds: [],
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
      return profile.governor ? [profile.governor] : [];
    case 44:
      return profile.stateCapital ? [profile.stateCapital] : [];
    case 46:
      return [CURRENT_FEDERAL_ANSWERS.presidentParty];
    case 47:
      return [CURRENT_FEDERAL_ANSWERS.speakerOfHouse];
    default:
      return question.Accepted_Answers;
  }
}

function missingProfileNote(questionId: number, profile: CivicsProfile) {
  switch (questionId) {
    case 20:
      return !profile.senatorOne
        ? "Add at least one U.S. senator in the study profile below."
        : "";
    case 23:
      return !profile.representative
        ? "Add your U.S. Representative in the study profile below."
        : "";
    case 43:
      return !profile.governor ? "Add your state governor in the study profile below." : "";
    case 44:
      return !profile.stateCapital
        ? "Add your state capital in the study profile below."
        : "";
    default:
      return "";
  }
}

function answerListForQuestion(question: Question, profile: CivicsProfile) {
  const resolved = resolveDynamicAnswers(question, profile);
  if (resolved.length > 0) {
    return resolved;
  }

  return question.Accepted_Answers;
}

export default function CivicsTest() {
  const [profile, setProfile] = useState<CivicsProfile>(DEFAULT_PROFILE);
  const [stats, setStats] = useState<StudyStats>(DEFAULT_STATS);
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

      if (savedProfile) {
        setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(savedProfile) });
      }

      if (savedStats) {
        setStats({ ...DEFAULT_STATS, ...JSON.parse(savedStats) });
      }
    } catch {
      setProfile(DEFAULT_PROFILE);
      setStats(DEFAULT_STATS);
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

  const studyPool = useMemo(() => {
    switch (studyFilter) {
      case "65-20":
        return ALL_QUESTIONS.filter((question) => question.Is_65_20);
      case "dynamic":
        return ALL_QUESTIONS.filter((question) => question.Dynamic_Answer);
      case "review":
        return ALL_QUESTIONS.filter((question) => stats.hardQuestionIds.includes(question.ID));
      default:
        return ALL_QUESTIONS;
    }
  }, [studyFilter, stats.hardQuestionIds]);

  useEffect(() => {
    setStudyQuestions(shuffleArray(studyPool));
    setStudyIndex(0);
    setIsFlipped(false);
  }, [studyPool]);

  const currentStudyQuestion = studyQuestions[studyIndex];
  const currentTestQuestion = testQuestions[testIndex];

  const questionsReviewed = stats.reviewedQuestionIds.length;
  const reviewQueueCount = stats.hardQuestionIds.length;
  const profileCompletedCount = Object.values(profile).filter(Boolean).length;
  const profileCompletionLabel = `${profileCompletedCount}/6 profile fields filled`;

  const markQuestionReviewed = (questionId: number) => {
    setStats((prev) => ({
      ...prev,
      reviewedQuestionIds: uniqueIds([...prev.reviewedQuestionIds, questionId]),
    }));
  };

  const setNeedsReview = (questionId: number, needsReview: boolean) => {
    setStats((prev) => ({
      ...prev,
      hardQuestionIds: needsReview
        ? uniqueIds([...prev.hardQuestionIds, questionId])
        : prev.hardQuestionIds.filter((id) => id !== questionId),
    }));
  };

  const reshuffleStudy = () => {
    setStudyQuestions(shuffleArray(studyPool));
    setStudyIndex(0);
    setIsFlipped(false);
  };

  const moveStudy = (direction: "next" | "prev") => {
    if (studyQuestions.length === 0) return;

    setIsFlipped(false);
    setStudyIndex((current) => {
      if (direction === "next") {
        return current === studyQuestions.length - 1 ? 0 : current + 1;
      }

      return current === 0 ? studyQuestions.length - 1 : current - 1;
    });
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

    markQuestionReviewed(currentTestQuestion.ID);
    setNeedsReview(currentTestQuestion.ID, !isCorrect);
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

  const updateProfileField = (field: keyof CivicsProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderAnswerBlock = (question: Question) => {
    const answers = answerListForQuestion(question, profile);
    const note = missingProfileNote(question.ID, profile);

    return (
      <div className={styles.answerContent}>
        <h3>Accepted answers</h3>
        <ul>
          {answers.map((answer, index) => (
            <li key={`${question.ID}-${index}`}>{answer}</li>
          ))}
        </ul>

        {question.Dynamic_Answer && (
          <div className={styles.dynamicBox}>
            <p className={styles.dynamicWarning}>
              Current federal answers were verified on {CURRENT_FEDERAL_ANSWERS.verifiedDate}. Verify again before the real interview.
            </p>
            {note && <p className={styles.dynamicHint}>{note}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Civics companion</span>
          <h2>Full civics study mode, USCIS-style test mode, and saved progress.</h2>
          <p>
            This section now uses the full 100-question USCIS civics bank. You can study everything,
            focus on the 65/20 exemption list, save a review queue, and fill in the state-specific
            answers your mom will actually need.
          </p>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <strong>Question bank</strong>
            <span>100 official civics questions</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Reviewed so far</strong>
            <span>{questionsReviewed} questions opened</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Needs review</strong>
            <span>{reviewQueueCount} questions saved</span>
          </div>
          <div className={styles.summaryCard}>
            <strong>Profile setup</strong>
            <span>{profileCompletionLabel}</span>
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
            Study mode
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
            Test mode
          </button>
          <Link href="/" className={styles.ghostButton}>
            Back to home
          </Link>
        </div>
      </section>

      <section className={styles.profilePanel}>
        <div className={styles.profileHeader}>
          <div>
            <span className={styles.eyebrow}>Study profile</span>
            <h3>Fill in the answers that depend on your mom’s state.</h3>
            <p>
              This is what makes questions like governor, senators, representative, and state capital
              actually usable.
            </p>
          </div>
          <div className={styles.linkGroup}>
            <a
              href="https://www.uscis.gov/citizenship/testupdates"
              target="_blank"
              rel="noreferrer"
            >
              USCIS current-answer updates
            </a>
            <a
              href="https://www.house.gov/representatives/find-your-representative"
              target="_blank"
              rel="noreferrer"
            >
              Find U.S. Representative
            </a>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label>
            <span>State</span>
            <input
              value={profile.stateName}
              onChange={(event) => updateProfileField("stateName", event.target.value)}
              placeholder="Example: California"
            />
          </label>
          <label>
            <span>State capital</span>
            <input
              value={profile.stateCapital}
              onChange={(event) => updateProfileField("stateCapital", event.target.value)}
              placeholder="Example: Sacramento"
            />
          </label>
          <label>
            <span>Governor</span>
            <input
              value={profile.governor}
              onChange={(event) => updateProfileField("governor", event.target.value)}
              placeholder="Governor name"
            />
          </label>
          <label>
            <span>Senator 1</span>
            <input
              value={profile.senatorOne}
              onChange={(event) => updateProfileField("senatorOne", event.target.value)}
              placeholder="One current U.S. senator"
            />
          </label>
          <label>
            <span>Senator 2</span>
            <input
              value={profile.senatorTwo}
              onChange={(event) => updateProfileField("senatorTwo", event.target.value)}
              placeholder="Second senator (optional)"
            />
          </label>
          <label>
            <span>Representative</span>
            <input
              value={profile.representative}
              onChange={(event) => updateProfileField("representative", event.target.value)}
              placeholder="Current U.S. Representative"
            />
          </label>
        </div>

        <div className={styles.currentAnswers}>
          <div className={styles.currentAnswerCard}>
            <strong>President</strong>
            <span>{CURRENT_FEDERAL_ANSWERS.president}</span>
          </div>
          <div className={styles.currentAnswerCard}>
            <strong>Vice President</strong>
            <span>{CURRENT_FEDERAL_ANSWERS.vicePresident}</span>
          </div>
          <div className={styles.currentAnswerCard}>
            <strong>Speaker of the House</strong>
            <span>{CURRENT_FEDERAL_ANSWERS.speakerOfHouse}</span>
          </div>
          <div className={styles.currentAnswerCard}>
            <strong>Chief Justice</strong>
            <span>{CURRENT_FEDERAL_ANSWERS.chiefJustice}</span>
          </div>
        </div>
      </section>

      <section className={styles.statsRow}>
        <div className={styles.metricCard}>
          <strong>Tests taken</strong>
          <span>{stats.testsTaken}</span>
        </div>
        <div className={styles.metricCard}>
          <strong>Tests passed</strong>
          <span>{stats.testsPassed}</span>
        </div>
        <div className={styles.metricCard}>
          <strong>Total correct</strong>
          <span>{stats.correctAnswers}</span>
        </div>
        <div className={styles.metricCard}>
          <strong>Total incorrect</strong>
          <span>{stats.incorrectAnswers}</span>
        </div>
      </section>

      {viewMode === "study" && (
        <section className={styles.studyPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>Study mode</span>
              <h3>Flip through the full question bank at your own pace.</h3>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.selectWrap}>
                <span>Question set</span>
                <select
                  value={studyFilter}
                  onChange={(event) => setStudyFilter(event.target.value as StudyFilter)}
                >
                  <option value="all">All 100 questions</option>
                  <option value="65-20">65/20 exemption questions</option>
                  <option value="dynamic">Current-answer questions</option>
                  <option value="review">Needs review only</option>
                </select>
              </label>

              <button type="button" className={styles.secondaryButton} onClick={reshuffleStudy}>
                Shuffle set
              </button>
            </div>
          </div>

          {currentStudyQuestion ? (
            <>
              <div className={styles.studyMeta}>
                <span>
                  Card {studyIndex + 1} of {studyQuestions.length}
                </span>
                <span>Question #{currentStudyQuestion.ID}</span>
              </div>

              <StudyCard
                isFlipped={isFlipped}
                onFlip={() => {
                  if (!isFlipped) {
                    markQuestionReviewed(currentStudyQuestion.ID);
                  }
                  setIsFlipped((current) => !current);
                }}
                frontContent={
                  <div className={styles.questionContent}>
                    <span className={styles.qId}>Question {currentStudyQuestion.ID}</span>
                    <p>{currentStudyQuestion.Question}</p>
                  </div>
                }
                backContent={renderAnswerBlock(currentStudyQuestion)}
              />

              <div className={styles.studyActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => moveStudy("prev")}>
                  Previous
                </button>
                <button type="button" className={styles.primaryButton} onClick={() => moveStudy("next")}>
                  Next
                </button>
              </div>

              {isFlipped && (
                <div className={styles.evaluationControls}>
                  <p>After checking the card, what should happen next?</p>
                  <div className={styles.evalButtons}>
                    <button
                      type="button"
                      className={styles.incorrectBtn}
                      onClick={() => setNeedsReview(currentStudyQuestion.ID, true)}
                    >
                      Save to review list
                    </button>
                    <button
                      type="button"
                      className={styles.correctBtn}
                      onClick={() => setNeedsReview(currentStudyQuestion.ID, false)}
                    >
                      I know this one
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <h4>No questions match this filter yet.</h4>
              <p>If you choose “Needs review only,” save a few cards first and they will appear here.</p>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && status === "idle" && (
        <section className={styles.studyPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>Test mode</span>
              <h3>Run the same 10-question civics format USCIS uses.</h3>
              <p>
                The session ends as soon as your mom gets 6 correct or 5 wrong. That matches the real
                civics test structure.
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
              <span>Use the 65/20 exemption question set</span>
            </label>

            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={startTest}>
                Start USCIS-style test
              </button>
            </div>
          </div>

          {stats.lastResult && (
            <div className={styles.lastResult}>
              <strong>Last result</strong>
              <span>
                {stats.lastResult.status === "passed" ? "Passed" : "Failed"} with{" "}
                {stats.lastResult.correct} correct and {stats.lastResult.incorrect} incorrect.
              </span>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && status === "in_progress" && currentTestQuestion && (
        <section className={styles.studyPanel}>
          <div className={styles.testHeader}>
            <div>
              <span className={styles.eyebrow}>Live test</span>
              <h3>Civics test session</h3>
            </div>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => {
                setStatus("idle");
                setIsFlipped(false);
              }}
            >
              End session
            </button>
          </div>

          <ProgressBar current={testIndex + 1} total={10} />

          <div className={styles.scoreBoard}>
            <span className={styles.correct}>✅ {score} / 6 to pass</span>
            <span className={styles.wrong}>❌ {incorrect} / 5 to fail</span>
          </div>

          <StudyCard
            isFlipped={isFlipped}
            onFlip={() => {
              if (!isFlipped) {
                markQuestionReviewed(currentTestQuestion.ID);
              }
              setIsFlipped((current) => !current);
            }}
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
              <p>After checking the answer, how did it go?</p>
              <div className={styles.evalButtons}>
                <button
                  type="button"
                  className={styles.incorrectBtn}
                  onClick={() => handleTestAnswer(false)}
                >
                  No, I got it wrong
                </button>
                <button
                  type="button"
                  className={styles.correctBtn}
                  onClick={() => handleTestAnswer(true)}
                >
                  Yes, I was right
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === "test" && (status === "passed" || status === "failed") && (
        <section className={styles.studyPanel}>
          <div className={`${styles.resultCard} ${status === "passed" ? styles.pass : styles.fail}`}>
            <h3>{status === "passed" ? "She passed this round." : "This round needs more review."}</h3>
            <p>
              Final score: {score} correct and {incorrect} incorrect.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={startTest}>
                Try another test
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
                Go back to study mode
              </button>
            </div>
          </div>
        </section>
      )}

      {!isLoaded && (
        <section className={styles.emptyState}>
          <p>Loading saved study progress…</p>
        </section>
      )}
    </div>
  );
}
