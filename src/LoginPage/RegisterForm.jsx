import React, { useState } from 'react';
import '../css/RegisterForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [firstname, lastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="name" className="register-form-label">
          Nom*
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-form-input"
        />
        <label htmlFor="name" className="register-form-label">
          Prénom*
        </label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setName(e.target.value)}
          className="register-form-input"
        />

        <label htmlFor="email" className="register-form-label">
          E-mail*
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-form-input"
        />

        <label htmlFor="password" className="register-form-label">
          Mot de passe*
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-input"
        />

        <button type="submit" className="register-form-button">
          S'INSCRIRE
        </button>

        <p className="register-form-qre">
          Déjà un compte ? <a href="./LoginForm.jsx">Connectez-vous.</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;