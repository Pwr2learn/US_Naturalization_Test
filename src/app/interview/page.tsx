import Link from 'next/link';
import styles from '../study.module.css';

export default function InterviewGuide() {
  const commands = [
    "Please remain standing.",
    "Raise your right hand.",
    "Do you swear to tell the truth, the whole truth, and nothing but the truth?",
    "You can put your hand down and take a seat.",
    "Show me your permanent resident card (green card).",
    "Please hand me your passport(s).",
    "Please sign your name here."
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>N-400 interview</span>
        <h1>Get familiar with the interview before the real appointment.</h1>
        <p>
          The speaking test happens throughout the interview. That means confidence comes from
          understanding the officer’s instructions and being ready for common personal questions.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/civics-test" className="button-secondary">
            Practice civics first
          </Link>
          <Link href="/" className="button-ghost">
            Back to home
          </Link>
        </div>

        <div className={styles.heroMeta}>
          <div className={styles.metaCard}>
            <strong>What the officer checks</strong>
            <span>Can she understand the questions and answer in basic English?</span>
          </div>
          <div className={styles.metaCard}>
            <strong>What helps most</strong>
            <span>Practicing the same command phrases until they feel familiar</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Best mindset</strong>
            <span>Stay calm, answer clearly, and ask for repetition if needed</span>
          </div>
        </div>
      </section>

      <div className={styles.splitGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Common officer commands</h3>
            <p>These are worth practicing out loud until they feel normal.</p>
          </div>

          <ul className={styles.list}>
            {commands.map((c, i) => (
              <li key={i} className={styles.listItem}>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Main interview topics</h3>
            <p>Most interview questions fall into a small number of categories.</p>
          </div>

          <div className={styles.list}>
            <div className={styles.topicBlock}>
              <strong>Personal information</strong>
              <p>Name, address, family, work, travel history, and key details from the N-400.</p>
            </div>
            <div className={styles.topicBlock}>
              <strong>Good moral character</strong>
              <p>Questions about taxes, arrests, organizations, and past legal issues.</p>
            </div>
            <div className={styles.topicBlock}>
              <strong>Oath of allegiance</strong>
              <p>Whether she is willing to support the Constitution and complete the oath process.</p>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>How to practice at home</h3>
          <p>Keep it conversational. The point is to make the format feel familiar.</p>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.topicBlock}>
            <strong>Step 1</strong>
            <p>Read one officer command out loud and have her respond physically or verbally.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 2</strong>
            <p>Ask simple personal questions from the application and let her answer in her own words.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 3</strong>
            <p>Repeat the hardest questions once more, then stop before it becomes tiring.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Important reminder</strong>
            <p>She does not need perfect English. She needs to understand and respond clearly enough.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
