import Link from 'next/link';

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
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
          &larr; Back to Home
        </Link>
      </div>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>N-400 Interview Guide</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        The speaking test takes place during your N-400 interview. The officer will verify your application and ask questions about your background.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Common Officer Commands</h3>
          <p style={{ marginBottom: '1rem' }}>You must understand and follow these instructions in English:</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {commands.map((c, i) => (
              <li key={i} style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderLeft: '4px solid var(--primary-color)' }}>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Interview Topics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <strong>1. Personal Information</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Verify your name, address, employment, and travel history.</p>
            </div>
            <div>
              <strong>2. Good Moral Character (&quot;Have you ever...&quot;)</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Questions about taxes, memberships, and criminal history.</p>
            </div>
            <div>
              <strong>3. Oath of Allegiance</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Willingness to support the Constitution and bear arms for the U.S.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
