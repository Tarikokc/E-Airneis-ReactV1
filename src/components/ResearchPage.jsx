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
  const [sort, setSort] = useState('prix-asc');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  const fetchData = async () => {
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
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, filters, sort]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };

      if (Array.isArray(prevFilters[filterName])) {
        if (prevFilters[filterName].includes(filterValue)) {
          updatedFilters[filterName] = prevFilters[filterName].filter(item => item !== filterValue);
        } else {
          updatedFilters[filterName] = [...prevFilters[filterName], filterValue];
        }
      } else {
        updatedFilters[filterName] = filterValue;
      }

      return updatedFilters;
    });
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setShowFilters(false); // Masquer les filtres après la recherche
  };

  const handleShowFilters = () => {
    setShowFilters(true);
  };

  return (
    <div className="recherche-page">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {showFilters && (
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="materiaux">Matériaux :</label>
              <div className="checkbox-group">
                <div>
                  <input 
                    type="checkbox" 
                    id="bois" 
                    value="bois" 
                    checked={filters.materiaux.includes('bois')} 
                    onChange={(e) => handleFilterChange('materiaux', e.target.value)} 
                  />
                  <label htmlFor="bois">Bois</label>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    id="metal" 
                    value="metal" 
                    checked={filters.materiaux.includes('metal')} 
                    onChange={(e) => handleFilterChange('materiaux', e.target.value)} 
                  />
                  <label htmlFor="metal">Métal</label>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    id="plastique" 
                    value="plastique" 
                    checked={filters.materiaux.includes('plastique')} 
                    onChange={(e) => handleFilterChange('materiaux', e.target.value)} 
                  />
                  <label htmlFor="plastique">Plastique</label>
                </div>
              </div>
            </div>

            <div className="filter-group prix">
              <div className="filter-group-item">
                <label htmlFor="prixMin">Prix min :</label>
                <input
                  type="number"
                  id="prixMin"
                  value={filters.prixMin}
                  onChange={(e) => handleFilterChange('prixMin', e.target.value)}
                />
              </div>

              <div className="filter-group-item">
                <label htmlFor="prixMax">Prix max :</label>
                <input
                  type="number"
                  id="prixMax"
                  value={filters.prixMax}
                  onChange={(e) => handleFilterChange('prixMax', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="categories">Catégories :</label>
              <div className="checkbox-group">
                {categories.map(category => (
                  <div key={category.categoryId}>
                    <input 
                      type="checkbox" 
                      id={category.categoryId} 
                      value={category.categoryId} 
                      checked={filters.categories.includes(String(category.categoryId))} 
                      onChange={(e) => handleFilterChange('categories', e.target.value)} 
                    />
                    <label htmlFor={category.categoryId}>{category.categoryName}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <input
                type="checkbox"
                id="enStock"
                checked={filters.enStock}
                onChange={(e) => handleFilterChange('enStock', e.target.checked)}
              />
              <label htmlFor="enStock">Uniquement en stock</label>
            </div>
          </div>
        )}

        <div className="sort">
          <label htmlFor="sort">Trier par :</label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </div>

        <button type="submit">Rechercher</button>
      </form>

      {!showFilters && (
        <button onClick={handleShowFilters} className="show-filters-button">
          Afficher les filtres
        </button>
      )}

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
