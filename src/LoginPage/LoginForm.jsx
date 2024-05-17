import React from "react";
import '../css/LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-form">
      <label htmlFor="email">E-mail*</label>
      <input type="email" id="email" defaultValue="john@smith.com" />
      <label htmlFor="password">Mot de passe*</label>
      <input type="password" id="password" />
      <button className="login-button">SE CONNECTER</button>
      <p>
        Pas de compte? <a href="/signup">Inscrivez-vous.</a>
      </p>
    </div>
  );
};

export default LoginForm;