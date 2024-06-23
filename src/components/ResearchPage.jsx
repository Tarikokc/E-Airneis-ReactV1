import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/RecherchePage.css';

const baseUrl = '/img/';

const RecherchePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    materiaux: [],
    prixMin: '',
    prixMax: '',
    categories: [],
    enStock: false,
  });
  const [sort, setSort] = useState('prix-asc'); // Tri par défaut
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Pour les options de filtre de catégorie

  useEffect(() => {
    // Récupérer les catégories pour les options de filtre
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  const fetchData = async () => { // Déplacer fetchData ici
    setIsLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/api/recherche', {
        params: {
          search: searchTerm,
          materiaux: filters.materiaux.length > 0 ? filters.materiaux.join(',') : null,
          prixMin: filters.prixMin !== '' ? filters.prixMin : null,
          prixMax: filters.prixMax !== '' ? filters.prixMax : null,
          categories: filters.categories.length > 0 ? filters.categories.join(',') : null,
          enStock: filters.enStock,
          sort,
        },
      });

      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Récupérer les catégories pour les options de filtre
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchTerm, filters, sort]); // Dépendances inchangées

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    fetchData();
  };
  return (
    <div className="recherche-page">
      <form onSubmit={handleSubmit}> {/* Ajouter onSubmit */}
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Filtres */}
        <div className="filters">
          {/* Filtre par matériau */}
          {/* ... (champs de sélection pour les matériaux) */}

          {/* Filtre par prix */}
          <div>
            <label htmlFor="prixMin">Prix min:</label>
            <input
              type="number"
              id="prixMin"
              value={filters.prixMin}
              onChange={(e) => handleFilterChange('prixMin', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="prixMax">Prix max:</label>
            <input
              type="number"
              id="prixMax"
              value={filters.prixMax}
              onChange={(e) => handleFilterChange('prixMax', e.target.value)}
            />
          </div>

          {/* Filtre par catégorie */}
          <div>
            <label htmlFor="categories">Catégories:</label>
            <select
              id="categories"
              multiple // Permettre la sélection multiple
              value={filters.categories}
              onChange={(e) => handleFilterChange('categories', Array.from(e.target.selectedOptions, option => option.value))}
            >
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par disponibilité */}
          <div>
            <input
              type="checkbox"
              id="enStock"
              checked={filters.enStock}
              onChange={(e) => handleFilterChange('enStock', e.target.checked)}
            />
            <label htmlFor="enStock">Uniquement en stock</label>
          </div>
        </div>

        {/* Tri */}
        <div className="sort">
          <label htmlFor="sort">Trier par:</label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            {/* ... (autres options de tri) */}
          </select>
        </div>

        <button type="submit">Rechercher</button>
      </form>

      {/* Résultats de la recherche */}
      <div className="product-grid">
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          products.length > 0 ? (
            products.map(product => (
              <Link key={product.productId} to={`/product/${product.productId}`} className="product-card">
                <img src={baseUrl + product.productPhotos[0]?.photoUrl} alt={product.Nom} />
                <div className="product-card-details">
                  <h2 className="product-card-title">{product.Nom}</h2>
                  <p className="product-card-price">{product.prix} €</p>
                  <p className="product-card-stock">
                    {product.Stock > 0 ? "En stock" : "Stock épuisé"}
                  </p>                
                  </div>
              </Link>
            ))
          ) : (
            <p>Aucun produit ne correspond à votre recherche.</p>
          )
        )}
      </div>
    </div>
  );
};

export default RecherchePage;
