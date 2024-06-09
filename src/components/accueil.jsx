import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = '/img/';

const HomePage = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const defaultImage = baseUrl + 'React-JS';

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

      <h2>Venant des hautes terres d'Ecosse
        <br></br>
        Nos Meubles sont IMMORTELS
      </h2>

      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.categoryId} className="category-item">
            <img
              src={category.defaultPhotoUrl ? baseUrl + category.defaultPhotoUrl : defaultImage}
              alt={category.categoryName}
            />
            <h3>{category.categoryName}</h3>
          </div>
        ))}
      </div>

      <h2>Les Highlanders du moment</h2>

      {/* <div className="product-grid">
        {produits.map((produit) => ( // Itère sur tous les produits
          <div key={produit.productId} className="product-item">
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
            <h3>{produit.Nom}</h3>
            <p>Prix : {produit.prix} €</p>
          </div>
        ))}
      </div> */}

      <div className="product-grid">
        {produits.map((produit) => (
          <Link // Utilise Link pour rendre l'élément cliquable
            key={produit.productId}
            to={`/product/${produit.productId}`} // Redirige vers la page du produit
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
