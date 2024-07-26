import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from './popUp';

const baseUrl = '/img/';

const HomePage = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const defaultImage = baseUrl + 'React-JS';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/produits')
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setShowPopup(true); 
    }

  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="home-page">

      {/* Carrousel principal */}
      <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} dynamicHeight={true}>
        {produits.map((produit) => (
          <div key={produit.productId} className="carousel-slide">
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
          </div>
        ))}
      </Carousel>

      {showPopup && (
        <Popup
          className={showPopup ? 'show' : ''} 
          message={`Bienvenue, ${JSON.parse(localStorage.getItem('user')).firstname}!`}
          onClose={handleClosePopup}
        />
      )}
      <h2>Venant des hautes terres d'Écosse
        <br/>
        Nos Meubles sont IMMORTELS
      </h2>

      <div className="category-grid">
        {categories.slice(0, 3).map((category) => (
          <Link
            key={category.categoryId}
            to={`/category/${category.categoryId}`}
            className="category-item"
          >
            <img
              src={category.defaultPhotoUrl ? baseUrl + category.defaultPhotoUrl : defaultImage}
              alt={category.categoryName}
            />
            <h3>{category.categoryName}</h3>
          </Link>
        ))}
      </div>

      <h2>Les Highlanders du moment</h2>

      <div className="product-grid">
        {produits.slice(0, 3).map((produit) => ( 
        // Affiche seulement les 3 premiers produits

          <Link 
            key={produit.productId}
            to={`/product/${produit.productId}`} 
            className="product-item"
          >
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
            <h3>{produit.Nom}</h3>
            <p>Prix : {produit.prix} €</p>
          </Link>
        ))}


      </div>
    </div>
  );
};

export default HomePage;
