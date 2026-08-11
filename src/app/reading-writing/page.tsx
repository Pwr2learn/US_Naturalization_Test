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
        <span className={styles.eyebrow}>Read and write</span>
        <h1>Read one sentence. Write one sentence.</h1>
        <p className={styles.translation}>Lea una oración. Escriba una oración.</p>
        <p>This part is short. Go slowly.</p>

        <div className={styles.ctaRow}>
          <Link href="/civics-test" className="button-secondary">
            Civics
          </Link>
          <Link href="/" className="button-ghost">
            Home
          </Link>
        </div>

        <div className={styles.heroMeta}>
          <div className={styles.metaCard}>
            <strong>Read</strong>
            <span>Read 1 sentence correctly</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Write</strong>
            <span>Write 1 sentence correctly</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Tip</strong>
            <span>Say it slowly. Then write it slowly.</span>
          </div>
        </div>
      </section>

      <div className={styles.splitGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Reading practice</h3>
            <p className={styles.translation}>Práctica de lectura</p>
            <p>Read these out loud.</p>
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
            <p className={styles.translation}>Práctica de escritura</p>
            <p>Listen and write the sentence on paper.</p>
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
          <h3>Easy plan</h3>
          <p className={styles.translation}>Plan fácil</p>
          <p>Keep it short.</p>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.topicBlock}>
            <strong>Step 1</strong>
            <p>Read 2 or 3 sentences.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 2</strong>
            <p>Write 1 sentence.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 3</strong>
            <p>Repeat the hard one again.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Stop</strong>
            <p>Short practice is okay.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
