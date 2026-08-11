import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Built for calm, steady practice</span>
          <h1>Help your mom study with less stress and more confidence.</h1>
          <p>
            Civics Companion turns USCIS prep into a simple routine: practice the civics questions,
            review English reading and writing, and get comfortable with the N-400 interview.
          </p>

          <div className={styles.heroActions}>
            <Link href="/civics-test" className="button-primary">
              Start studying
            </Link>
            <Link href="/reading-writing" className="button-secondary">
              Practice English
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div>
              <strong>3 study modes</strong>
              <span>Civics, English practice, and interview prep</span>
            </div>
            <div>
              <strong>USCIS-style logic</strong>
              <span>Practice the 6-correct-to-pass civics format</span>
            </div>
            <div>
              <strong>Clear next steps</strong>
              <span>Know what to study today instead of guessing</span>
            </div>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroPanelCard}>
            <span className={styles.panelLabel}>A simple plan</span>
            <ol>
              <li>Warm up with 10 civics questions</li>
              <li>Read one sentence out loud</li>
              <li>Write one sentence by hand</li>
              <li>Review common interview questions</li>
            </ol>
          </div>

          <div className={styles.heroPanelQuote}>
            <p>
              “The goal isn’t to study everything at once. It’s to help her feel ready one step at a time.”
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Why this works</span>
          <h2>A practical study tool for a real family goal.</h2>
          <p>
            This app is designed to reduce overwhelm. Instead of generic test prep, it focuses on the
            exact parts of the naturalization process most people need to practice.
          </p>
        </div>

        <div className={styles.valueGrid}>
          <article className={styles.valueCard}>
            <h3>Simple enough to use every day</h3>
            <p>Clear sections, readable screens, and a calm layout make it easier to build a routine.</p>
          </article>

          <article className={styles.valueCard}>
            <h3>Focused on what USCIS actually asks</h3>
            <p>Study the civics test, reading and writing prompts, and interview topics in one place.</p>
          </article>

          <article className={styles.valueCard}>
            <h3>Built to create confidence</h3>
            <p>Practice in a way that feels steady and manageable, especially for someone nervous about the interview.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Study paths</span>
          <h2>Everything she needs in one place.</h2>
        </div>

        <div className={styles.grid}>
          <Link href="/civics-test" className={styles.card}>
            <span className={styles.cardTag}>Civics test</span>
            <h3>Practice the official 100-question bank</h3>
            <p>Run through USCIS-style questions and track whether she reaches the 6-correct passing mark.</p>
            <span className={styles.cardLink}>Open civics practice</span>
          </Link>

          <Link href="/reading-writing" className={styles.card}>
            <span className={styles.cardTag}>Reading & writing</span>
            <h3>Practice the English part without overcomplicating it</h3>
            <p>Use official-style sentences and vocabulary to rehearse the read-one, write-one passing format.</p>
            <span className={styles.cardLink}>Open English practice</span>
          </Link>

          <Link href="/interview" className={styles.card}>
            <span className={styles.cardTag}>Interview</span>
            <h3>Get familiar with the N-400 conversation</h3>
            <p>Review common officer commands, interview topics, and the kind of answers she should be ready to give.</p>
            <span className={styles.cardLink}>Open interview prep</span>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.eyebrow}>Start here</span>
            <h2>Keep the first session simple.</h2>
            <p>Start with the civics test, then move into reading and writing. The goal is momentum, not perfection.</p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/civics-test" className="button-primary">
              Start studying now
            </Link>
            <Link href="/interview" className="button-ghost">
              Review interview topics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
