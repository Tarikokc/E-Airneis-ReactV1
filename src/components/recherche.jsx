import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search'; // Importez le composant Search

function Recherche() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products?search=${searchTerm}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, [searchTerm]); // Exécutez l'effet à chaque changement de searchTerm

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Search onSearch={handleSearch} /> {/* Utilisez le composant Search */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.product_id} className="product-item">
            {/* ... (affichage des détails du produit) ... */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recherche;
