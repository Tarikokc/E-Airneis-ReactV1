import React, { useState, useRef, useEffect } from 'react';
import { VscSearch, VscThreeBars } from 'react-icons/vsc';
import { ShoppingCart } from 'lucide-react';
import '../css/Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    navigate('/recherche'); // Rediriger vers la page Recherche
  };

  const handleCartClick = () => {
    navigate('/Panier'); // Rediriger vers la page Panier
  };

  // Fonction pour fermer le menu lorsqu'on clique en dehors
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-button')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Ajouter l'écouteur d'événements pour les clics en dehors
    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>ÀIRNEIS</h1>
      </Link>

      <div className="icons">
        <button className="search-button" onClick={handleSearchClick}>
          <VscSearch />
        </button>

        <button className="cart-button" onClick={handleCartClick}>
          <ShoppingCart />
        </button>
        <button className="menu-button" onClick={toggleMenu}>
          <VscThreeBars />
        </button>
        {isMenuOpen && (
          <div ref={menuRef}>
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
