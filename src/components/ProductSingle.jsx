// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import '../css/ProductSingle.css';



// // const ProductSingle = () => {
// //   const { productId } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fonction pour récupérer les détails du produit
// //     const fetchProduct = async () => {
// //       try {
// //         const response = await axios.get(`/api/products/${productId}`);
// //         setProduct(response.data);
// //       } catch (err) {
// //         setError('Erreur lors du chargement du produit');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [productId]);

// //   if (loading) return <div>Chargement...</div>;
// //   if (error) return <div>{error}</div>;

// //   return (
// //     <div className="product-container">
// //       {product && (
// //         <>
// //           <h1 className="product-name">{product.name}</h1>
// //           <div className="product-details">
// //             <div className="product-images">
// //               {product.photos && product.photos.map(photo => (
// //                 <img
// //                   key={photo.photo_id}
// //                   src={photo.photo_url}
// //                   alt={product.name}
// //                   className="product-image"
// //                 />
// //               ))}
// //             </div>
// //             <div className="product-info">
// //               <p className="product-description">{product.description}</p>
// //               <p className="product-price">Prix : {product.price} €</p>
// //               <p className="product-stock">Quantité en stock : {product.stock_quantity}</p>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };


// // export default ProductSingle;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/ProductSingle.css';


// // jeu de data 
// export const productsData = [
//     {
//       id: 1,
//       name: "Table en chêne",
//       price: 349.99,
//       image: "https://placehold.co/200x200",
//       stock: 10,
//       priority: 1
//     },
//     {
//       id: 2,
//       name: "Table basse moderne",
//       price: 150.00,
//       image: "https://placehold.co/200x200",
//       stock: 0, // Stock épuisé
//       priority: 2
//     },
//     {
//       id: 3,
//       name: "Table de nuit classique",
//       price: 75.50,
//       image: "https://placehold.co/200x200",
//       stock: 5,
//       priority: 3
//     },
//     {
//       id: 4,
//       name: "Table de cuisine familiale",
//       price: 220.00,
//       image: "https://placehold.co/200x200",
//       stock: 2,
//       priority: 1
//     },
//     {
//       id: 5,
//       name: "Table d'appoint",
//       price: 89.99,
//       image: "https://placehold.co/200x200",
//       stock: 0, // Stock épuisé
//       priority: 2
//     },
//     {
//       id: 6,
//       name: "Table de jardin en teck",
//       price: 499.99,
//       image: "https://placehold.co/200x200",
//       stock: 8,
//       priority: 1
//     },
//     {
//       id: 7,
//       name: "Table de travail ergonomique",
//       price: 199.99,
//       image: "https://placehold.co/200x200",
//       stock: 3,
//       priority: 2
//     },
//     {
//       id: 8,
//       name: "Table à manger extensible",
//       price: 349.00,
//       image: "https://placehold.co/200x200",
//       stock: 1,
//       priority: 1
//     },
//     {
//       id: 9,
//       name: "Table de salon en verre",
//       price: 279.99,
//       image: "https://placehold.co/200x200",
//       stock: 0, // Stock épuisé
//       priority: 3
//     },
//     {
//       id: 10,
//       name: "Table de chevet en pin",
//       price: 59.99,
//       image: "https://placehold.co/200x200",
//       stock: 12,
//       priority: 2
//     },
//   ];


//   const ProductSingle = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [similarProducts, setSimilarProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       const fetchProduct = () => {
//         try {
//           const product = productsData.find(p => p.id === parseInt(productId));
//           if (!product) {
//             setError('Produit non trouvé');
//           } else {
//             setProduct(product);
//             // Trouver des produits similaires
//             const similar = productsData
//               .filter(p => p.id !== product.id && p.priority === product.priority && p.stock > 0)
//               .sort(() => 0.5 - Math.random()) // Trier aléatoirement
//               .slice(0, 6); // Prendre les 6 premiers produits
//             setSimilarProducts(similar);
//           }
//         } catch (err) {
//           setError('Erreur lors du chargement du produit');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProduct();
//     }, [productId]);

//     if (loading) return <div>Chargement...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//       <div className="product-container">
//         {product && (
//           <>
//             <div className="product-details">
//               <div className="product-images">
//                 <div className="product-image-carousel">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                   />
//                 </div>
//               </div>
//               <div className="product-info">
//                 <h1 className="product-name">{product.name}</h1>
//                 <p className="product-price">{product.price} €</p>
//                 <p className="product-stock">{product.stock > 0 ? 'En stock' : 'Stock épuisé'}</p>
//                 <p className="product-description">{product.description || 'Description non disponible'}</p>
//                 <p className="product-materials">Matériaux : {product.materials || 'Matériau non disponible'}</p>
//                 <button 
//                   disabled={product.stock === 0} 
//                   className={`product-button ${product.stock === 0 ? 'out-of-stock' : ''}`}
//                 >
//                   {product.stock === 0 ? 'STOCK ÉPUISÉ' : 'AJOUTER AU PANIER'}
//                 </button>
//               </div>
//             </div>
//             <div className="similar-products">
//               <h2>Produits similaires</h2>
//               <div className="similar-products-list">
//                 {similarProducts.map(sp => (
//                   <div key={sp.id} className="similar-product">
//                     <img src={sp.image} alt={sp.name} className="similar-product-image" />
//                     <p className="similar-product-name">{sp.name}</p>
//                     <p className="similar-product-price">Prix : {sp.price} €</p>
//                     <p className="similar-product-stock">En stock : {sp.stock}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   export default ProductSingle;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ProductSingle.css";
import axios from "axios";

const ProductSingle = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "/img/";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/produit/${productId}`);
        const productData = response.data;
        setProduct(productData);

        // Récupère les produits similaires depuis l'API (si disponible)
        if (productData.similarProducts) {
          setSimilarProducts(productData.similarProducts);
        } else {
          setSimilarProducts([]);
        }
      } catch (err) {
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-container">
      {product && (
        <>
          <div className="product-details">
            <div className="product-images">
              <div className="product-image-carousel">
                {product.productPhotos.map((photo, index) => (
                  <div key={index} className="carousel-slide"> 
                    <img src={baseUrl + photo.photoUrl} alt={photo.photoUrl} />
                  </div>
                ))}
              </div>
            </div>
            <div className="product-info">
              <h1 className="product-name">{product.Nom}</h1>
              <p className="product-price">{product.prix} €</p>
              <p className="product-stock">
                {product.Stock > 0 ? "En stock" : "Stock épuisé"}
              </p>
              <p className="product-description">{product.Description}</p>
              <button
                disabled={product.Stock === 0}
                className={`product-button ${product.Stock === 0 ? "out-of-stock" : ""}`}
              >
                {product.Stock === 0 ? "STOCK ÉPUISÉ" : "AJOUTER AU PANIER"}
              </button>
            </div>
          </div>

          <div className="similar-products">
            <h2>Produits similaires</h2>
            {similarProducts.length > 0 ? ( // Vérification si similarProducts existe et n'est pas vide
              <div className="product-grid">
                {similarProducts.map((produit) => (
                  <Link
                    key={produit.productId} 
                    to={`/product/${produit.productId}`}
                    className="product-item"
                  >
                    {/* Vérification si productPhotos existe et n'est pas vide */}
                    {produit.productPhotos && produit.productPhotos.length > 0 && (
                      <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
                    )}
                    <h3>{produit.Nom}</h3>
                    <p>Prix : {produit.prix} €</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div>Aucun produit similaire trouvé</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSingle;

