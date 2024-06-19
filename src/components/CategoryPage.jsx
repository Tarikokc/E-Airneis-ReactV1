import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/CategoryPage.css'; // Importez votre fichier CSS pour les styles

const baseUrl = '/img/';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null); // État pour stocker les informations de la catégorie
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultImage = baseUrl + 'React-JS';


  useEffect(() => {
    // Récupération des informations de la catégorie
    axios.get(`http://localhost:8000/api/categories/${categoryId}`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la catégorie :', error);
      });

    // Récupération des produits de la catégorie
    axios.get(`http://localhost:8000/api/categories/${categoryId}/produits`)
      .then(response => {
        setCategoryProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="category-page">
      {category && (
        <div className="category-header">
          <div className="category-image-container"> {/* Conteneur pour l'image et le titre */}
            <img src={baseUrl + category.defaultPhotoUrl} alt={category.categoryName} />
            <h2 className="category-title">{category.categoryName}</h2>
          </div>
          <p className="category-description">{category.description}</p>
        </div>
      )}

      <div className={`product-list ${isLoading ? 'loading' : ''}`}> {/* Grille ou liste selon la taille de l'écran */}
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <Link key={product.productId} to={`/product/${product.productId}`} className="product-item">
              <img src={baseUrl + product.productPhotos[0].photoUrl} alt={product.Nom} />
              <h3>{product.Nom}</h3>
              <p>Prix : {product.prix} €</p>
            </Link>
          ))
        ) : (
          <p>Aucun produit trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
