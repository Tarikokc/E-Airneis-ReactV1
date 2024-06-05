// Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="/login" onClick={toggleMenu}>Se connecter</Link></li>
        <li><Link to="/register" onClick={toggleMenu}>S'inscrire</Link></li>
        <li><Link to="/recherche" onClick={toggleMenu}>Recherche</Link></li>
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
