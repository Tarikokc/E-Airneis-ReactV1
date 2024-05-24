
import React, { useState, useEffect } from 'react';
import '../css/ProduitList.css';
import Navbar from './nav.jsx';

function Product({ product }) {
  return (
    <div className={`product ${product.stock === 0 ? 'out-of-stock' : ''}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      {product.stock === 0 && <p className="stock-status">Stock épuisé</p>}
    </div>
  );
}

function CategoryPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Table en chêne",
      price: 349.99,
      image: "https://placehold.co/200x200",
      stock: 10,
      priority: 1
    },
    {
      id: 2,
      name: "Table basse moderne",
      price: 150.00,
      image: "https://placehold.co/200x200",
      stock: 0, // Stock épuisé
      priority: 2
    },
    {
      id: 3,
      name: "Table de nuit classique",
      price: 75.50,
      image: "https://placehold.co/200x200",
      stock: 5,
      priority: 3
    },
    {
      id: 4,
      name: "Table de cuisine familiale",
      price: 220.00,
      image: "https://placehold.co/200x200",
      stock: 2,
      priority: 1
    },
    {
      id: 5,
      name: "Table d'appoint",
      price: 89.99,
      image: "https://placehold.co/200x200",
      stock: 0, // Stock épuisé
      priority: 2
    },
    {
      id: 6,
      name: "Table de jardin en teck",
      price: 499.99,
      image: "https://placehold.co/200x200",
      stock: 8,
      priority: 1
    },
    {
      id: 7,
      name: "Table de travail ergonomique",
      price: 199.99,
      image: "https://placehold.co/200x200",
      stock: 3,
      priority: 2
    },
    {
      id: 8,
      name: "Table à manger extensible",
      price: 349.00,
      image: "https://placehold.co/200x200",
      stock: 1,
      priority: 1
    },
    {
      id: 9,
      name: "Table de salon en verre",
      price: 279.99,
      image: "https://placehold.co/200x200",
      stock: 0, // Stock épuisé
      priority: 3
    },
    {
      id: 10,
      name: "Table de chevet en pin",
      price: 59.99,
      image: "https://placehold.co/200x200",
      stock: 12,
      priority: 2
    },
  ]);

  useEffect(() => {
    // Remplacez par l'URL de votre API pour récupérer les produits
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Trier les produits par priorité et stock
        const sortedProducts = data.sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          if (a.stock === 0) {
            return 1;
          }
          if (b.stock === 0) {
            return -1;
          }
          return 0;
        });
        setProducts(sortedProducts);
      });
  }, []);

  return (
    <div className="category-page">

      <section className="category">
        <div className="category-header">
          <img src="https://placehold.co/1910x300" alt="Category" />
          <h1 className="category-title">Tables</h1>
        </div>
        <p className="category-description">Découvrez notre sélection de tables pour tous les styles.</p>
        <div className="product-grid">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default CategoryPage;