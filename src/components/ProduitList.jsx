import React, { useState } from 'react';
import '../css/ProduitList.css'; 
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

// import React, { useState, useEffect } from 'react';
// import './css/ProduitList.css';
// import Navbar from './nav.jsx';

// function Product({ product }) {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div className="product">
//       <img src={product.image} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.price} €</p>
//       <button onClick={() => setShowDetails(!showDetails)}>
//         {showDetails ? 'Masquer les détails' : 'Voir les détails'}
//       </button>
//       {showDetails && (
//         <div className="product-details">
//           {/* Détails supplémentaires du produit (description, etc.) */}
//           <p>{product.description}</p> 
//           {/* Ajoutez ici les détails que vous souhaitez afficher */}
//         </div>
//       )}
//       <button className="add-to-cart">Ajouter au panier</button>
//     </div>
//   );
// }

// function CategoryPage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('/api/products') // Remplacez par l'URL de votre API
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   return (
//     <div className="category-page">
//       <Navbar /> {/* Ajoutez votre barre de navigation ici */}
//       <section className="category">
//         <h2>Tables</h2>
//         <div className="product-grid">
//           {products.map((product) => (
//             <Product key={product.id} product={product} /> // Utilisez l'ID unique du produit comme clé
//           ))}
//         </div>
//       </section>
//       <footer>
//         {/* ... contenu du footer */}
//       </footer>
//     </div>
//   );
// }

// export default CategoryPage;
