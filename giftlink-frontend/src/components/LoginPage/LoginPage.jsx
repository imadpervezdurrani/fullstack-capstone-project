import React, { useState } from 'react';
import { urlConfig } from '../../config';

export default function LoginPage({ onLoginSuccess, setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth-token') || ''}`
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const json = await response.json();

      if (response.ok && json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', json.email);
        sessionStorage.setItem('firstName', json.firstName || '');
        sessionStorage.setItem('lastName', json.lastName || '');
        onLoginSuccess({
          email: json.email,
          firstName: json.firstName,
          lastName: json.lastName,
          token: json.authtoken
        });
        setView('main');
      } else {
        setError(json.error || 'Login failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError('Cannot reach authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setView('main')}>
      <div className="modal-card" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()} id="login-modal-card">
        <button className="modal-close" onClick={() => setView('main')}>✕</button>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Sign in to your GiftLink account to manage listings
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', color: '#f87171', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} id="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              id="login-email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              id="login-password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading} id="login-submit-btn">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <span
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
            onClick={() => setView('register')}
          >
            Create one
          </span>
        </div>
      </div>
    </div>
  );
}
