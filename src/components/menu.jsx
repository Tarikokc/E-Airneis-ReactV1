import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({ isMenuOpen, toggleMenu }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification de l'état de connexion au chargement initial
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une fois

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); // Redirection vers la page d'accueil après la déconnexion
  };

  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        {/* Affichage conditionnel des liens */}
        {!isLoggedIn ? (
          <>
            <li><Link to="/login" onClick={toggleMenu}>Se connecter</Link></li>
            <li><Link to="/register" onClick={toggleMenu}>S'inscrire</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" onClick={toggleMenu}>Mon profil</Link></li>
            <li onClick={handleLogout}>Déconnexion</li>
          </>
        )}

        {/* <li><Link to="/recherche" onClick={toggleMenu}>Recherche</Link></li> */}
        <li><Link to="/OrderPage" onClick={toggleMenu}>Mes commandes</Link></li>
        <li><Link to="/cgu" onClick={toggleMenu}>CGU</Link></li>
        <li><Link to="/legal" onClick={toggleMenu}>Mentions légales</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>À propos d’ÀIRNEIS</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
