import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({ isMenuOpen, toggleMenu }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login" onClick={toggleMenu}>Connexion</Link></li>
            <li><Link to="/register" onClick={toggleMenu}>Inscription</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/AccountSettings" onClick={toggleMenu}>Mes paramètres</Link></li>
            <li><Link to="/orderHistory" onClick={toggleMenu}>Mes commandes</Link></li></>
        )}

        <li><Link to="/cgu" onClick={toggleMenu}>CGU</Link></li>
        <li><Link to="/legal" onClick={toggleMenu}>Mentions légales</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>À propos d’ÀIRNEIS</Link></li>

        {isLoggedIn && (
          <li onClick={handleLogout} id="logout" >Déconnexion</li>
        )}
          
        
      </ul>
    </div>
  );
};

export default Menu;
