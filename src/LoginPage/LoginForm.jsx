import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email, 
        password 
      });

      console.log('Login successful', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/');
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
      setError(error.response?.data.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
        />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
        />
        {error && <div className="login-form-error">{error}</div>}
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'SE CONNECTER'}
        </button>
      </form>

      <p>
        Pas de compte? <Link to="/register">Inscrivez-vous.</Link>
      </p>
    </div>
  );
};

export default LoginForm;
