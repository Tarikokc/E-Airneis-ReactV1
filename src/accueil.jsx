import React from 'react';
import './css/HomePage.css'; // Import your custom CSS file
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const productCategories = [
  { id: 1, title: 'CATÉGORIE 1', description: 'Description de la catégorie 1', products: [{ image: '/images/product1.jpg', title: 'PROD 1', description: 'Description du produit 1' }, { image: '/images/product2.jpg', title: 'PROD 2', description: 'Description du produit 2' }, { image: '/images/product3.jpg', title: 'PROD 3', description: 'Description du produit 3' }] },
  { id: 2, title: 'CATÉGORIE 2', description: 'Description de dssdala catégorie 2', products: [{ image: '/images/product4.jpg', title: 'PROD 4', description: 'Description du produit 4' }, { image: '/images/product5.jpg', title: 'PROD 5', description: 'Description du produit 5' }, { image: '/images/product6.jpg', title: 'PROD 6', description: 'Description du produit 6' }] },
  { id: 3, title: 'CATÉGORIE 3', description: 'Description de la catégorie 3', products: [{ image: '/images/product7.jpg', title: 'PROD 7', description: 'Description du produit 7' }, { image: '/images/product8.jpg', title: 'PROD 8', description: 'Description du produit 8' }, { image: '/images/product9.jpg', title: 'PROD 9', description: 'Description du produit 9' }] },
]; 

const HomePage = () => {
  return (
    <div className="home-page">
      

      {/* First Category carousel */}
      <div className="category-carousel">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          slidesPerView="auto"
        >
          {productCategories.map((category) => (
            <div key={category.id} className="category">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Second Carousel */}
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
      >
        <div>
          <p className="carousel-caption">Bienvenue sur notre site</p>
        </div>
      </Carousel>

      {/* Third Category carousel */}
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
      >
        <div className="category-squares">
          {productCategories.map((category) => (
            <div key={category.id} className="category-square">
              <img src={category.products[0].image} alt={category.title} />
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HomePage;
