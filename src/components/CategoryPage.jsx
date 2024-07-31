import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/CategoryPage.css";

const baseUrl = "/img/";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultImage = baseUrl + "React-JS";

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${categoryId}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la catégorie :",
          error
        );
      });

    axios
      .get(`http://localhost:8000/api/categories/${categoryId}/produits`)
      .then((response) => {
        setCategoryProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="category-page">
      {category && (
        <div className="category-title-container">
          {categoryProducts.length > 0 && (
            <img
              src={baseUrl + categoryProducts[0].productPhotos[0]?.photoUrl}
              alt={categoryProducts[0].Nom}
            />
          )}
          <div className="category-title-overlay">
            <h1 className="category-title">{category.categoryName}</h1>
            <p className="category-description">{category.description}</p>
          </div>
        </div>
      )}

      <div className="product-grid">
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          categoryProducts.map((product) => (
            <Link
              key={product.productId}
              to={`/product/${product.productId}`}
              className="product-card"
            >
              <img
                src={baseUrl + product.productPhotos[0]?.photoUrl}
                alt={product.Nom}
              />
              <div className="product-card-details">
                <h2 className="product-card-title">{product.Nom}</h2>
                <p className="product-card-price">{product.prix} €</p>
                <p className="product-card-stock">
                  {product.Stock > 0 ? "En stock" : "Stock épuisé"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
