import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ProductSingle.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import des styles

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
        console.log("Données du produit :", product);
        console.log("Tentative de récupération du produit avec l'ID :", productId);


        const response = await axios.get(`http://localhost:8000/api/produit/${productId}`);
        console.log("Données du produit reçues :", response.data);

        const productData = response.data;
        setProduct(productData);

        // Récupère les produits similaires depuis l'API (si disponible)
        if (productData.similarProducts) {
          // console.log("Produits similaires reçus :", productData.similarProducts);

          setSimilarProducts(productData.similarProducts);
        } else {
          setSimilarProducts([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);

        setError("Erreur lors du chargement du produit");

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);


  const handleAddToCart = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      // Vérification si l'utilisateur est connecté
      if (!userData || !userData.user || !userData.user.id) {
        console.error('Utilisateur non connecté');
        // Rediriger ou afficher un message d'erreur
        return;
      }
      const userId = userData.user.id;
      console.log("Tentative d'ajout au panier pour l'utilisateur", userId, "et le produit", productId);

      const response = await axios.post(`http://localhost:8000/panier/add/${productId}/${userId}`);
      console.log("Produit ajouté au panier avec succès !");

      if (response.status === 200) {
        // Afficher le pop-up de succès
        toast.success('Le produit a été ajouté au panier !');

      } else {
        // Gérer les erreurs de l'API si nécessaire
        console.error('Erreur lors de l\'ajout au panier:', response.data.error);
        toast.error(response.data.error || 'Une erreur est survenue.'); // Notification d'erreur
      }

    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

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
              <div className="np-stock">
              <div className="name-price">
              <h1 className="product-name">{product.Nom}</h1>
              <p className="product-price">{product.prix} €</p>
              </div>
              <p className="product-stock">
                {product.Stock > 0 ? "En stock" : "Stock épuisé"}
              </p>
              </div>
              <p className="product-description">{product.Description}</p>
              <button
                onClick={handleAddToCart}
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

