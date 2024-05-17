import React, { useState } from 'react';
import { VscSearch } from "react-icons/vsc";
import { VscThreeBars } from "react-icons/vsc";
import { ShoppingCart } from 'lucide-react';
import './css/Nav.css'
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>AIRNEIS</h1>
      </div>
      <div className="icons">
        <button className="search-button">
            <VscSearch />
        </button>
        <button className="cart-button">
            <ShoppingCart />
        </button>
        <button className="menu-button" onClick={toggleMenu}>
            <VscThreeBars />
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
          </div>
        )}
      </div>
      
    </nav>
  );
}

export default Navbar;
