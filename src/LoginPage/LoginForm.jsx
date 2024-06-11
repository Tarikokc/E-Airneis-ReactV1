// import React from "react";
// import '../css/LoginForm.css';
// import { Link } from 'react-router-dom';

// const LoginForm = () => {
//   return (
//     <div className="login-form">
//       <label htmlFor="email">E-mail*</label>
//       <input type="email" id="email" defaultValue="john@smith.com" />
//       <label htmlFor="password">Mot de passe*</label>
//       <input type="password" id="password" />
//       <button className="login-button">SE CONNECTER</button>
//       <p>
//         Pas de compte? <Link to="/register">Inscrivez-vous.</Link> 
//       </p>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email, 
        password 
      });

      console.log('Login successful', response.data);

      // Stocker le token dans le localStorage (si votre backend renvoie un token)
      localStorage.setItem('token', response.data.token); // Adaptez la clé si nécessaire

      // Stocker les informations de l'utilisateur (si votre backend les renvoie)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Rediriger l'utilisateur vers la page d'accueil
      navigate('/');
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
      setError(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div className="login-form">
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="login-form-error">{error}</div>}
        <button type="submit" className="login-button">
          SE CONNECTER
        </button>
      </form>

      <p>
        Pas de compte? <Link to="/register">Inscrivez-vous.</Link>
      </p>
    </div>
  );
};

export default LoginForm;
