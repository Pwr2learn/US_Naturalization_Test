import Link from 'next/link';
import styles from '../study.module.css';

export default function ReadingWriting() {
  const readingSentences = [
    "Who is the President?",
    "What is the capital of the United States?",
    "Who was George Washington?",
    "When is Labor Day?",
    "The President lives in the White House."
  ];

  const writingSentences = [
    "Washington D.C. is the capital of the United States.",
    "Citizens have the right to vote.",
    "Congress meets in Washington D.C.",
    "We pay taxes in the United States.",
    "The flag is red, white, and blue."
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Reading & writing</span>
        <h1>Practice the English portion in a simple, repeatable way.</h1>
        <p>
          For this part of the test, she only needs to read one sentence correctly and write one
          sentence correctly. The goal is calm repetition, not memorizing everything at once.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/civics-test" className="button-secondary">
            Start with civics
          </Link>
          <Link href="/" className="button-ghost">
            Back to home
          </Link>
        </div>

        <div className={styles.heroMeta}>
          <div className={styles.metaCard}>
            <strong>Passing rule</strong>
            <span>1 correct reading sentence out of up to 3 attempts</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Writing rule</strong>
            <span>1 correct writing sentence out of up to 3 attempts</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Best approach</strong>
            <span>Read out loud slowly, then copy one sentence by hand</span>
          </div>
        </div>
      </section>

      <div className={styles.splitGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Reading practice</h3>
            <p>Read these out loud clearly and slowly. Repeat the ones that feel hard.</p>
          </div>

          <ul className={styles.list}>
            {readingSentences.map((s, i) => (
              <li key={i} className={styles.listItem}>
                “{s}”
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Writing practice</h3>
            <p>Have someone read these aloud, then write them down on paper exactly as you hear them.</p>
          </div>

          <ul className={styles.list}>
            {writingSentences.map((s, i) => (
              <li key={i} className={styles.listItem}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>A simple 10-minute routine</h3>
          <p>Keep each study session short enough that it actually happens.</p>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.topicBlock}>
            <strong>Minute 1-3</strong>
            <p>Read two or three sentences out loud.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Minute 4-7</strong>
            <p>Write one sentence by hand, then check spelling and clarity.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Minute 8-10</strong>
            <p>Repeat the hardest sentence one more time before stopping.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>What matters most</strong>
            <p>Steady practice beats long, stressful study sessions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
