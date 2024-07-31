import React, { useState, useEffect } from "react";
import "../css/HomePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "./popUp";

const baseUrl = "/img/";

const HomePage = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const defaultImage = baseUrl + "React-JS";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((response) => {
        setProduits(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const Carousel = ({ images }) => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    return (
      <div class="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`slide-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const images = [
    "img/imgdiapo/woodhouse.jpg",
    "img/imgdiapo/norwaywoods.jpg",
    "img/imgdiapo/Scandinavian-Forest.jpg",
  ];

  return (
    <div className="home-page">
      {showPopup && (
        <Popup
          className={showPopup ? "show" : ""}
          message={`Bienvenue, ${
            JSON.parse(localStorage.getItem("user")).firstname
          }!`}
          onClose={handleClosePopup}
        />
      )}

      <div class="carousel-container">
        <Carousel images={images} />
      </div>

      <h3 id="slogan">
        VENANT DES HAUTES TERRES D'ECOSSE
        <br />
        NOS MEUBLES SONT IMMORTELS
      </h3>

      <div className="category-grid">
        {categories.slice(0, 3).map((category) => (
          <Link
            key={category.categoryId}
            to={`/category/${category.categoryId}`}
            className="category-item"
          >
            <img
              src={
                category.defaultPhotoUrl
                  ? baseUrl + category.defaultPhotoUrl
                  : defaultImage
              }
              alt={category.categoryName}
            />
            <h3>{category.categoryName}</h3>
          </Link>
        ))}
      </div>

      <h2>Les Highlanders du moment</h2>

      <div className="product-grid">
        {produits.slice(0, 3).map((produit) => (
          <Link
            key={produit.productId}
            to={`/product/${produit.productId}`}
            className="product-item"
          >
            {produit.productPhotos.length > 0 && (
              <img
                src={baseUrl + produit.productPhotos[0].photoUrl}
                alt={produit.Nom}
              />
            )}
            <h3>{produit.Nom}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
