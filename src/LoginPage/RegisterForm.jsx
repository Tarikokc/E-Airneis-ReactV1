import React, { useState } from "react";
import axios from "axios";
import "../css/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!firstname || !lastname || !email || !password) {
      toast.success("Tous les champs sont obligatoires !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        firstname,
        lastname,
        email,
        password,
        role: "user",
      });
      console.log("Registration successful", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error(
        "Registration failed",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.message : "Une erreur est survenue"
      );
    }
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="firstname">Prénom*</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="register-form-input"
          required
        />
        <label htmlFor="lastname">Nom*</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="register-form-input"
          required
        />
        <label htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-form-input"
          required
        />
        <label htmlFor="password">Mot de passe*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-input"
          required
        />
        {error && <div className="register-form-error">{error}</div>}
        <button type="submit" className="register-form-button">
          S'INSCRIRE
        </button>
        <p>
          Déjà un compte ? <Link to="/login">Connectez-vous.</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
