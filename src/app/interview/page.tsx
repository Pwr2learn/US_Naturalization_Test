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
        <span className={styles.eyebrow}>Interview</span>
        <h1>Practice the interview questions.</h1>
        <p className={styles.translation}>Practique las preguntas de la entrevista.</p>
        <p>Read the question. Answer in simple English.</p>

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
            <strong>Goal</strong>
            <span>Understand the question and answer clearly</span>
          </div>
          <div className={styles.metaCard}>
            <strong>Tip</strong>
            <span>Short answers are okay</span>
          </div>
          <div className={styles.metaCard}>
            <strong>If needed</strong>
            <span>Ask the officer to repeat</span>
          </div>
        </div>
      </section>

      <div className={styles.splitGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Common officer commands</h3>
            <p className={styles.translation}>Comandos comunes del oficial</p>
            <p>Practice these simple commands.</p>
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
            <p className={styles.translation}>Temas principales</p>
            <p>Most questions are about these topics.</p>
          </div>

          <div className={styles.list}>
            <div className={styles.topicBlock}>
              <strong>Personal information</strong>
              <p>Name, address, family, work, and travel.</p>
            </div>
            <div className={styles.topicBlock}>
              <strong>Good moral character</strong>
              <p>Questions about taxes, arrests, and legal issues.</p>
            </div>
            <div className={styles.topicBlock}>
              <strong>Oath of allegiance</strong>
              <p>Questions about the oath.</p>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Easy plan</h3>
          <p className={styles.translation}>Plan fácil</p>
          <p>Practice a few questions at a time.</p>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.topicBlock}>
            <strong>Step 1</strong>
            <p>Read one command out loud.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 2</strong>
            <p>Ask one simple question.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Step 3</strong>
            <p>Repeat the hard question once more.</p>
          </div>
          <div className={styles.topicBlock}>
            <strong>Remember</strong>
            <p>Simple English is okay.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
