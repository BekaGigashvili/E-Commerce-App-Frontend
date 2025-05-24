import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/SignIn.scss"

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/auth/login', {
        email,
        password
      });

      const token = response.data;

      localStorage.setItem('jwtToken', token);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Login failed. Please check your email or password.');
    }
  };

  return (
    <div className="signin-container">
      <h1>ავტორიზაცია</h1>
      <form onSubmit={handleLogin} className="signin-form">
        <input
          type="email"
          placeholder="მეილი"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="პაროლი"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="error">{errorMsg}</p>}
        <button type="submit">შესვლა</button>
      </form>
    </div>
  );
};

export default SignIn;
