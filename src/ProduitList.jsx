import React, { useState } from 'react';
import './css/ProduitList.css'; 
import Navbar from './nav.jsx';
function Product({ product }) {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
    </div>
  );
}

function CategoryPage() {
  const [products] = useState([
    { name: "Produit 1", price: 29.99, image: "placeholder.jpg" },
    { name: "Produit 2", price: 45.50, image: "placeholder.jpg" },
    { name: "Produit 3", price: 45.50, image: "placeholder.jpg" },
    { name: "Produit 4", price: 45.50, image: "placeholder.jpg" },
    { name: "Produit 5", price: 45.50, image: "placeholder.jpg" },


  ]);

  return (
    <div className="category-page">
      {/* Header */}
      <header>
      </header>

      {/* Catégorie */}
      <section className="category">
        <h2>Tables</h2> 
  
        
        {/* Grille de produits */}
        <div className="product-grid">
          {products.map((product, index) => (
            <Product key={index} product={product} />
            
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        {/* ... contenu du footer */}
      </footer>
    </div>
  );
}

export default CategoryPage;