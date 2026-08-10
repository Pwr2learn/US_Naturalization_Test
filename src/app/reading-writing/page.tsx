import Link from 'next/link';

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
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
          &larr; Back to Home
        </Link>
      </div>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Reading & Writing Practice</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        The officer will ask you to read up to 3 sentences and write up to 3 sentences. You must get 1 of each correct to pass.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Reading Practice</h3>
          <p style={{ marginBottom: '1rem' }}>Read these sentences out loud clearly:</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {readingSentences.map((s, i) => (
              <li key={i} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '1.1rem' }}>
                &quot;{s}&quot;
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Writing Practice</h3>
          <p style={{ marginBottom: '1rem' }}>Listen to the officer (or have a friend read these) and write them down:</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {writingSentences.map((s, i) => (
              <li key={i} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '1.1rem' }}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
