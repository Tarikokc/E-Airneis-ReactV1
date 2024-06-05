import React, { useState } from 'react';

const products = [
    {
        id: 1,
        title: 'Produit A',
        description: 'Description A',
        price: 100,
        color: 'Rouge',
        type: 'Type 1',
        material: 'Coton',
        in_stock: true
    },
    {
        id: 2,
        title: 'Produit B',
        description: 'Description B',
        price: 150,
        color: 'Bleu',
        type: 'Type 2',
        material: 'Polyester',
        in_stock: false
    },
    // Ajoutez plus de produits selon vos besoins
];

const Search = () => {
    const [filters, setFilters] = useState({
        color: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        material: '',
        inStock: false
    });
    const [results, setResults] = useState(products);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const filteredProducts = products.filter(product => {
            return (
                (filters.color === '' || product.color.toLowerCase().includes(filters.color.toLowerCase())) &&
                (filters.type === '' || product.type.toLowerCase().includes(filters.type.toLowerCase())) &&
                (filters.minPrice === '' || product.price >= parseFloat(filters.minPrice)) &&
                (filters.maxPrice === '' || product.price <= parseFloat(filters.maxPrice)) &&
                (filters.material === '' || product.material.toLowerCase().includes(filters.material.toLowerCase())) &&
                (!filters.inStock || product.in_stock)
            );
        });
        setResults(filteredProducts);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', padding: '20px' }}>
                <h2>Filtres</h2>
                <form onSubmit={handleSearch}>
                    <div>
                        <label>Couleur:</label>
                        <input
                            type="text"
                            name="color"
                            value={filters.color}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={filters.type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Prix minimum:</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Prix maximum:</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Matière:</label>
                        <input
                            type="text"
                            name="material"
                            value={filters.material}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={filters.inStock}
                                onChange={handleInputChange}
                            />
                            Uniquement en stock
                        </label>
                    </div>
                    <button type="submit">Rechercher</button>
                </form>
            </div>
            <div style={{ flex: '3', padding: '20px' }}>
                <h2>Résultats</h2>
                <div>
                    {results.length > 0 ? (
                        <ul>
                            {results.map((product) => (
                                <li key={product.id}>
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <p>Prix: {product.price} €</p>
                                    <p>Couleur: {product.color}</p>
                                    <p>Type: {product.type}</p>
                                    <p>Matière: {product.material}</p>
                                    <p>{product.in_stock ? 'En stock' : 'Rupture de stock'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun produit trouvé</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
