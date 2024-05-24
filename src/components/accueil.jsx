import React from 'react';
import '../css/HomePage.css'; // Import your custom CSS file
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const baseUrl = '/img/'

const productCategories = [
  { 
      id: 1, 
      title: 'Mobilier de bureau', 
      description: 'Tables, chaises, bureaux ergonomiques', 
      products: [
          { image: 'https://via.placeholder.com/300', title: 'Bureau en bois massif', description: 'Elégant et robuste' },
          { image: 'https://via.placeholder.com/300', title: 'Chaise de bureau ergonomique', description: 'Confort et soutien' },
          { image: 'https://via.placeholder.com/300', title: 'Lampe de bureau LED', description: 'Eclairage optimal' }
      ] 
  },
  { 
      id: 2, 
      title: 'Canapés et fauteuils', 
      description: 'Relaxation et confort', 
      products: [
          { image: 'https://via.placeholder.com/300', title: 'Canapé d\'angle en cuir', description: 'Style et élégance' },
          { image: 'https://via.placeholder.com/300', title: 'Fauteuil scandinave', description: 'Design minimaliste' },
          { image: 'https://via.placeholder.com/300', title: 'Pouf en velours', description: 'Touche de couleur' }
      ] 
  },
  { 
      id: 3, 
      title: 'Décoration intérieure', 
      description: 'Personnalisez votre espace', 
      products: [
          { image: 'https://via.placeholder.com/300', title: 'Miroir mural design', description: 'Agrandit l\'espace' },
          { image: 'https://via.placeholder.com/300', title: 'Tapis berbère', description: 'Chaleur et authenticité' },
          { image: 'https://via.placeholder.com/300', title: 'Coussin à motifs', description: 'Originalité et confort' }
      ] 
  },
  // Ajoutez autant de catégories que vous souhaitez ici
];
const dataIMG = [
  {
    id: 1,
    image: `${baseUrl}table1.jpg`,
    title: "Table",
    price: 29.99,
  },

  {
    id: 2,
    image: `${baseUrl}chaise1.jpg`,
    title: "Chaise",
    price: 45.50,
  },

  {
    id: 3,
    image: `${baseUrl}bureau1.jpg`,
    title: "Bureau Gamer",
    price: 45.50,
  }
]

const HomePage = () => {
  return (
      <div className="home-page">

          {/* Carrousel principal */}
          <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} dynamicHeight={true}>
              {dataIMG.map((product) => (
                  <div key={product.id} className="carousel-slide">
                      <img src={product.image} alt={product.title} />
                  </div>
              ))}
          </Carousel>

          {/* Grille de catégories */}
          <div className="category-grid">
              {productCategories.map((category) => (
                  <div key={category.id} className="category-item">
                      <h3>{category.title}</h3>

                      <img src={category.products[0].image} alt={category.title} /> {/* Image de la première catégorie */}
                  </div>
              ))}
          </div>

          {/* Les Highlanders du moment */}
          <h2>Les Highlanders du moment</h2>

          {/* Grille de produits */}
          <div className="product-grid">
              {productCategories.flatMap(category => category.products).map((product) => (
                  <div key={product.id} className="product-item">
                      <img src={product.image} alt={product.title} />
                      
                      <h3>{product.title}</h3>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default HomePage;