import React, { useState } from 'react';
import { VscSearch } from "react-icons/vsc";
import { VscThreeBars } from "react-icons/vsc";
import { ShoppingCart } from 'lucide-react';
import '../css/Nav.css';
import { Link } from 'react-router-dom';
import Menu from './menu';
import searchData from './search'; // Importez vos données de recherche fictives

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Nouvel état pour la barre de recherche

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    
    // Filtrer les résultats en temps réel (facultatif)
    const results = searchData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          <h1>AIRNEIS</h1>
        </div>
      </Link>

      <div className="icons">
        <button className="search-button" onClick={toggleSearch}>
          <VscSearch />
        </button>

        {isSearchOpen && ( // Afficher la barre de recherche si ouverte
          <input 
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input" // Ajoutez une classe pour le style
          />
        )}

        <button className="cart-button">
          <ShoppingCart />
        </button>
        <button className="menu-button" onClick={toggleMenu}>
          <VscThreeBars />
        </button>
        {isMenuOpen && (
          <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        )}

        {searchResults.length > 0 && isSearchOpen && (
          <div className="search-results">
            <h2>Résultats :</h2>
            <ul>
              {searchResults.map(item => (
                <li key={item.id}>
                  <Link to={`/product/${item.id}`} onClick={toggleSearch}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
