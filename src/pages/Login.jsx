import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';
import bookMe from '../assets/landing.png';
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Store the last visited page before redirecting to login
  useEffect(() => {
    if (location.pathname !== '/login') {
      localStorage.setItem('lastPage', location.pathname);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setError({ email: '', password: '', general: '' });

    if (!email.includes('@')) {
      setError((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      setLoggingIn(false);
      return;
    }

    if (password.length < 6) {
      setError((prev) => ({ ...prev, password: 'Password must be at least 6 characters.' }));
      setLoggingIn(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Get the last visited page or default to "/add-ticket"
      const lastPage = localStorage.getItem('lastPage') || '/add-ticket';
      navigate(lastPage);
    } catch (error) {
      console.error("Error logging in: ", error);
      if (error.code === 'auth/user-not-found') {
        setError((prev) => ({ ...prev, general: 'No account found with this email.' }));
      } else if (error.code === 'auth/wrong-password') {
        setError((prev) => ({ ...prev, general: 'Incorrect password. Try again.' }));
      } else {
        setError((prev) => ({ ...prev, general: 'Login failed. Please confirm details and try again.' }));
      }
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={bookMe} alt="Flight" className="login-image" />

        <div className="login-header">Authorised Access Required</div>
        <p className="login-subtext">Sign in to gain administrative access.</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className={`input-field ${error.email ? 'input-error' : ''}`}
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className={`input-field ${error.password ? 'input-error' : ''}`}
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>
          {error.general && <p className="error-message">{error.general}</p>}

          <button className={`login-button ${loggingIn ? 'loading' : ''}`} type="submit" disabled={loggingIn}>
            {loggingIn ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
