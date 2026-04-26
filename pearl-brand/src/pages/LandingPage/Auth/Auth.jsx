import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser } from '../../../api/auth';

const Auth = () => {
  const [isLogin, setIsLogin]     = useState(true);
  const [username, setUsername]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [message, setMessage]     = useState('');
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = isLogin
        ? await loginUser({ email, password })
        : await signupUser({ username, email, password });

      const { token, user } = res.data;

      // ✅ Save BOTH token and user
      localStorage.setItem('pearlToken', token);
      localStorage.setItem('pearlUser', JSON.stringify(user));

      setMessage(isLogin ? 'Welcome back 👑' : 'Welcome to PEARL 🎊');
      setTimeout(() => navigate('/'), 1200);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login to PEARL' : 'Join PEARL'}</h2>
        <p className="auth-slogan">"Every masterpiece begins with a signature. Yours starts here."</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p>
          {isLogin ? "Don't have an account?" : 'Already a member?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
            {isLogin ? 'Sign up here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;