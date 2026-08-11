import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Start here</span>
          <h1>Practice for the citizenship test.</h1>
          <p className={styles.translation}>Practique para el examen de ciudadanía.</p>
          <p>Pick one part. Study a little at a time. Keep it simple.</p>

          <div className={styles.heroActions}>
            <Link href="/civics-test" className="button-primary">
              Start civics
            </Link>
            <Link href="/reading-writing" className="button-secondary">
              Start reading
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div>
              <strong>Step 1</strong>
              <span>Civics questions</span>
            </div>
            <div>
              <strong>Step 2</strong>
              <span>Reading and writing</span>
            </div>
            <div>
              <strong>Step 3</strong>
              <span>Interview practice</span>
            </div>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroPanelCard}>
            <span className={styles.panelLabel}>Today</span>
            <ol>
              <li>Answer 10 civics questions</li>
              <li>Read one sentence out loud</li>
              <li>Write one sentence</li>
              <li>Read a few interview questions</li>
            </ol>
          </div>

          <div className={styles.heroPanelQuote}>
            <p>Small steps are enough.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>How to use it</span>
          <h2>Choose one part and begin.</h2>
          <p className={styles.translation}>Elija una parte y empiece.</p>
        </div>

        <div className={styles.valueGrid}>
          <article className={styles.valueCard}>
            <h3>Civics</h3>
            <p className={styles.translation}>Educación cívica</p>
            <p>Answer the civics questions.</p>
          </article>

          <article className={styles.valueCard}>
            <h3>Reading and writing</h3>
            <p className={styles.translation}>Lectura y escritura</p>
            <p>Read a sentence. Write a sentence.</p>
          </article>

          <article className={styles.valueCard}>
            <h3>Interview</h3>
            <p className={styles.translation}>Entrevista</p>
            <p>Practice common interview questions.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Main sections</span>
          <h2>Open the part you want.</h2>
          <p className={styles.translation}>Abra la parte que quiere.</p>
        </div>

        <div className={styles.grid}>
          <Link href="/civics-test" className={styles.card}>
            <span className={styles.cardTag}>Civics</span>
            <h3>Civics questions</h3>
            <p className={styles.translation}>Preguntas de civismo</p>
            <p>Study 10 questions at a time.</p>
            <span className={styles.cardLink}>Open civics</span>
          </Link>

          <Link href="/reading-writing" className={styles.card}>
            <span className={styles.cardTag}>Read & write</span>
            <h3>Reading and writing</h3>
            <p className={styles.translation}>Lectura y escritura</p>
            <p>Practice short English sentences.</p>
            <span className={styles.cardLink}>Open reading</span>
          </Link>

          <Link href="/interview" className={styles.card}>
            <span className={styles.cardTag}>Interview</span>
            <h3>Interview questions</h3>
            <p className={styles.translation}>Preguntas de entrevista</p>
            <p>Read simple interview prompts.</p>
            <span className={styles.cardLink}>Open interview</span>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.eyebrow}>Easy start</span>
            <h2>Start with civics.</h2>
            <p className={styles.translation}>Empiece con civismo.</p>
            <p>Do 10 questions. Then stop or do one more section.</p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/civics-test" className="button-primary">
              Start now
            </Link>
            <Link href="/interview" className="button-ghost">
              Interview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
