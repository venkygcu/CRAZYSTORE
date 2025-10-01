import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/client';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const ENABLE_MOCK = String(process.env.REACT_APP_ENABLE_MOCK_DATA).toLowerCase() === 'true';
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  const storeAuth = (token, user) => {
    if (token) localStorage.setItem('authToken', token);
    if (user) localStorage.setItem('authUser', JSON.stringify(user));
    window.dispatchEvent(new Event('auth-changed'));
  };

  const maybeRedirectAdmin = (user) => {
    if (user?.email === 'gunjivenkatesh072@gmail.com') {
      navigate('/admin/manage');
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (ENABLE_MOCK) {
        await new Promise(res => setTimeout(res, 500));
        const mockUser = { username, email };
        storeAuth('mock-signup-token', mockUser);
        setSuccess('Signup successful. Redirecting...');
        if (!maybeRedirectAdmin(mockUser)) navigate(redirectTo);
        return;
      }
      const res = await api.post('/auth/signup', {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      const token = res?.data?.token;
      const user = res?.data?.user;
      storeAuth(token, user);
      setSuccess('Signup successful. Redirecting...');
      if (!maybeRedirectAdmin(user)) navigate(redirectTo);
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message;
      if (message && /email/i.test(message) && /registered/i.test(message)) {
        setError('Email already registered. Please login instead.');
        setIsLogin(true);
      } else {
        setError(message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (ENABLE_MOCK) {
        await new Promise(res => setTimeout(res, 500));
        const mockUser = { email };
        storeAuth('mock-login-token', mockUser);
        setSuccess('Login successful. Redirecting...');
        if (!maybeRedirectAdmin(mockUser)) navigate(redirectTo);
        return;
      }
      const res = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });
      const token = res?.data?.token;
      const user = res?.data?.user;
      storeAuth(token, user);
      setSuccess('Login successful. Redirecting...');
      if (!maybeRedirectAdmin(user)) navigate(redirectTo);
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      if (status === 401) {
        setError('Invalid email or password.');
      } else if (status === 500) {
        setError('Server unavailable. Please try again later.');
      } else {
        setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
            <p className="loginsignup-login"> Don't have an account? <span onClick={() => setIsLogin(false)}>Signup</span> </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <div className="loginsignup-fields">
              <input type="text" placeholder='Enter your name' value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Signup'}</button>
            <p className="loginsignup-login"> Already have an account? <span onClick={() => setIsLogin(true)}>Login</span> </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
