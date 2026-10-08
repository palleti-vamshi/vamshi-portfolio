import { useState, useEffect } from 'react';
import { checkHealth } from '../../services/api';
import './SystemStatus.css';

export default function SystemStatus() {
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
    <div className="system-status" aria-label="System Runtime Diagnostics">
      <div className="system-status__row">
        <span className="system-status__indicator system-status__indicator--live"></span>
        <span className="system-status__label">CLIENT:</span>
        <span className="system-status__val">REACT + VITE (ONLINE)</span>
      </div>

      <div className="system-status__divider">/</div>

      <div className="system-status__row">
        <span
          className={`system-status__indicator ${
            backendStatus.connected
              ? 'system-status__indicator--live'
              : backendStatus.loading
              ? 'system-status__indicator--pending'
              : 'system-status__indicator--error'
          }`}
        ></span>
        <span className="system-status__label">API GATEWAY (/api/health):</span>
        <span className="system-status__val">
          {backendStatus.loading && 'VERIFYING...'}
          {!backendStatus.loading && backendStatus.connected && (
            `CONNECTED (${backendStatus.data?.status?.toUpperCase() || 'OK'})`
          )}
          {!backendStatus.loading && !backendStatus.connected && 'OFFLINE (DEV STANDBY)'}
        </span>
      </div>
    </div>
  );
}
