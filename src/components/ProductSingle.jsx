import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ProductSingle.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductSingle = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const baseUrl = "/img/";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Tentative de récupération du produit avec l'ID :", productId);

        const response = await axios.get(`http://localhost:8000/api/produit/${productId}`);
        console.log("Données du produit reçues :", response.data);

        const productData = response.data;
        setProduct(productData);

        if (productData.category && productData.category.categoryId) {
          setCategoryId(parseInt(productData.category.categoryId, 10));
        } else {
          console.log("Le produit n'a pas de catégorie associée ou l'ID de la catégorie est invalide.");
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

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (categoryId) {
        console.log("Récupération des produits similaires de la catégorie :", categoryId);
        try {
          const responseSimilar = await axios.get(`http://localhost:8000/api/categories/${categoryId}/produits`);
          const filteredSimilarProducts = responseSimilar.data.filter(p => p.productId !== parseInt(productId, 10));
          console.log("Produits similaires reçus (filtrés) :", filteredSimilarProducts);
          setSimilarProducts(filteredSimilarProducts);
        } catch (err) {
          console.error("Erreur lors de la récupération des produits similaires :", err);
          setSimilarProducts([]);
        }
      } else {
        setSimilarProducts([]);
      }
    };

    fetchSimilarProducts();
  }, [categoryId, productId]);

  const handleAddToCart = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.user && userData.user.id) {
        const userId = userData.user.id;
        console.log("Tentative d'ajout au panier pour l'utilisateur", userId, "et le produit", productId);

        const response = await axios.post(`http://localhost:8000/panier/add/${productId}/${userId}`);
        console.log("Produit ajouté au panier avec succès !");
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        const existingProductIndex = guestCart.findIndex(item => item.productId === product.productId);

        if (existingProductIndex !== -1) {
          guestCart[existingProductIndex].quantite++;
        } else {
          guestCart.push({
            productId: product.productId,
            Nom: product.Nom,
            prix: product.prix,
            quantite: 1,
            photoUrl: product.productPhotos[0].photoUrl
          });
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        toast.success('Produit ajouté au panier !');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Une erreur est survenue lors de l\'ajout au panier.');
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === product.productPhotos.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product.productPhotos.length - 1 : prevSlide - 1
    );
  };


  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-container">
      {product && (
        <>
          <div className="product-details">
            {/* <div className="product-images">
              <div className="product-image-carousel">
                {product.productPhotos.map((photo, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={baseUrl + photo.photoUrl} alt={photo.photoUrl} />
                  </div>
                ))}
              </div>
            </div> */}
            <div className="product-images">
              <div className="product-image-carousel">
                <button className="carousel-prev" onClick={prevSlide}>&#10094;</button>
                <button className="carousel-next" onClick={nextSlide}>&#10095;</button>
                <div
                  className="carousel-slides">
                  {product.productPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                    >
                      <img src={baseUrl + photo.photoUrl} alt={photo.photoUrl} />
                    </div>
                  ))}
                </div>
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

          {/* <div className="similar-products">
            <h2>Produits similaires</h2>
            {similarProducts.length > 0 ? ( 
              <div className="product-grid">
                {similarProducts.map((produit) => (
                  <Link
                    key={produit.productId}
                    to={`/product/${produit.productId}`}
                    className="product-item"
                  >
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
          </div> */}
          <div className="similar-products">
            <h2>Produits similaires</h2>
            {similarProducts.length > 0 ? (
              <div className="product-grid">
                {similarProducts.slice(0, 4).map((produit) => (
                  <Link key={produit.productId} to={`/product/${produit.productId}`} className="product-item">
                    {produit.productPhotos && produit.productPhotos.length > 0 && (
                      <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
                    )}
                    <h3>{produit.Nom}</h3>
                    <p>{produit.prix} €</p>
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

