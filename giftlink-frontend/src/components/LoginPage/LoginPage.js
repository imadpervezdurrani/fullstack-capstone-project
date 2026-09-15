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
        if (onLoginSuccess) {
          onLoginSuccess({
            email: json.email,
            firstName: json.firstName,
            lastName: json.lastName,
            token: json.authtoken
          });
        }
        if (setView) setView('main');
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
    <div className="modal-overlay">
      <div className="modal-card">
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
