import React, { useState } from 'react';
import { VscSearch, VscThreeBars } from 'react-icons/vsc';
import { ShoppingCart } from 'lucide-react';
import '../css/Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
