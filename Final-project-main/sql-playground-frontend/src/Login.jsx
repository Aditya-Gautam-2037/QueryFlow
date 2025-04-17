import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file for styling
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error during login.');
    }
  };

  return (
    <div className='login-background' >
       <div className="login-container">
      <div className="login-content">
        {/* Left Section: Text */}
     

        {/* Right Section: Login Box */}
        <div className="login-card">
          <h1 style={{ fontFamily: 'Verdana, sans-serif' }}>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontFamily: 'Courier New, monospace' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontFamily: 'Courier New, monospace' }}
            />
            <button type="submit" style={{ fontFamily: 'Tahoma, sans-serif' }}>Login</button>
          </form>
          <p>
            No account? <Link to="/register" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Register</Link>
            <p>© 2025 QueryFlow™. All Rights Reserved.</p>

          </p>
        </div>
      </div>
    </div>
  </div>
   
  );
}

export default Login;