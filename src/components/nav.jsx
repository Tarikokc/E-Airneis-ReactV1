import React, { useState, useRef, useEffect } from 'react';
import { VscSearch, VscThreeBars } from 'react-icons/vsc';
import { ShoppingCart } from 'lucide-react';
import '../css/Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);

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

  useEffect(() => {
    const fetchPanierCount = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.user && userData.user.id) {
        // Utilisateur connecté : récupérer le nombre depuis le backend (route existante)
        try {
          const response = await fetch(`http://localhost:8000/api/panier/${userData.user.id}`);
          if (response.ok) {
            const data = await response.json();
            const count = data.length; 
            setPanierCount(count);
          } else {
            console.error("Erreur lors de la récupération du panier:", response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du nombre d\'articles :', error);
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const count = guestCart.reduce((total, item) => total + item.quantite, 0);
        setPanierCount(count);
      }
    };

    fetchPanierCount();
  }, []);

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

        {/* <button className="cart-button" onClick={handleCartClick}>
          <ShoppingCart />
        </button> */}
        <button className="cart-button" onClick={handleCartClick}>
          <ShoppingCart />
          {panierCount > 0 && (
            <span className="cart-dot"></span> // Afficher un point rouge si panierCount > 0
          )}
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
