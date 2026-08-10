import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h2>Prepare for your U.S. Citizenship</h2>
        <p>Master the 2008 Civics Test and practice your English skills for the naturalization interview.</p>
      </div>
      
      <div className={styles.grid}>
        <Link href="/civics-test" className={styles.card}>
          <h3>Civics Test 🇺🇸</h3>
          <p>Practice the official 100 questions. Pass by answering 6 out of 10 correctly.</p>
        </Link>
        
        <Link href="/reading-writing" className={styles.card}>
          <h3>Reading & Writing 📝</h3>
          <p>Study the official vocabulary and practice writing English sentences.</p>
        </Link>
        
        <Link href="/interview" className={styles.card}>
          <h3>N-400 Interview 🗣️</h3>
          <p>Review common interview questions and officer commands.</p>
        </Link>
      </div>
    </div>
  );
}
