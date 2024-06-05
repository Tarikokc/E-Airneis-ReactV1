import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

const baseUrl = '/img/'; // Chemin vers le dossier d'images

const HomePage = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/produits')
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

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

      {/* Les Highlanders du moment */}
      <h2>Les Highlanders du moment</h2>

      {/* Grille de produits */}
      <div className="product-grid">
        {produits.map((produit) => (
          <div key={produit.productId} className="product-item"> 
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
            <h3>{produit.Nom}</h3>
            <p>{produit.Description}</p>
            <p>Prix : {produit.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
