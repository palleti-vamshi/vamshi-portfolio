import { useState, useEffect } from 'react';
import { checkHealth } from './services/api';
import { profile } from './data/profile';

export default function App() {
  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    connected: false,
    data: null,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    async function verifyBackend() {
      try {
        const response = await checkHealth();
        if (isMounted) {
          setBackendStatus({
            loading: false,
            connected: true,
            data: response.data,
            error: null
          });
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus({
            loading: false,
            connected: false,
            data: null,
            error: err.message
          });
        }
      }
    }

    verifyBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={{ maxWidth: '640px', margin: '2rem auto', padding: '1.5rem' }}>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '2rem',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>
          {profile.name} — Technical Portfolio
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Phase 1: Project Foundation & Architecture
        </p>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Profile Data</h2>
          <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: '#334155', lineHeight: 1.8 }}>
            <li><strong>Degree:</strong> {profile.degree}</li>
            <li><strong>Institution:</strong> {profile.college}</li>
            <li><strong>Academic Standing:</strong> {profile.year} (Graduation: {profile.graduation})</li>
            <li><strong>Location:</strong> {profile.location}</li>
          </ul>
        </section>

        <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>System Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div>
              <span>Frontend: </span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>Active (React + Vite)</span>
            </div>
            <div>
              <span>Backend API (<code>/api/health</code>): </span>
              {backendStatus.loading && <span style={{ color: '#d97706' }}>Connecting...</span>}
              {!backendStatus.loading && backendStatus.connected && (
                <span style={{ color: '#16a34a', fontWeight: 600 }}>
                  Connected ({backendStatus.data?.status || 'OK'})
                </span>
              )}
              {!backendStatus.loading && !backendStatus.connected && (
                <span style={{ color: '#dc2626', fontWeight: 600 }}>
                  Disconnected ({backendStatus.error})
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
