export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f4fbf6', minHeight: '100vh' }}>
      <section style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>Reloop</div>
          <nav style={{ display: 'flex', gap: '1rem', color: '#334155' }}>
            <span>Marketplace</span>
            <span>Map</span>
            <span>Repair</span>
            <span>Chat</span>
          </nav>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#16a34a', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Campus Circular Economy</p>
            <h1 style={{ fontSize: '3.2rem', lineHeight: 1.1, margin: '1rem 0', color: '#0f172a' }}>
              A smarter campus where every unwanted item gets a second chance.
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Sell, donate, exchange, repair, upcycle, and recycle campus items through one simple platform built for hostel students.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '0.9rem 1.5rem', borderRadius: 12, fontWeight: 600 }}>List an Item</button>
              <button style={{ background: 'white', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0.9rem 1.5rem', borderRadius: 12, fontWeight: 600 }}>Explore Map</button>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #dcfce7, #dbeafe)', borderRadius: '24px', padding: '1.5rem', minHeight: '320px', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '16px', padding: '1rem' }}>
                <strong>Nearby opportunities</strong>
                <p style={{ margin: '0.5rem 0 0', color: '#334155' }}>5 items near your hostel</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '16px', padding: '1rem' }}>
                <strong>Best next step</strong>
                <p style={{ margin: '0.5rem 0 0', color: '#334155' }}>Donate or sell: study lamp, books, and clothes</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '16px', padding: '1rem' }}>
                <strong>Repair hub</strong>
                <p style={{ margin: '0.5rem 0 0', color: '#334155' }}>2 repair points available today</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
