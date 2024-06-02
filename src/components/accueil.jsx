// import React from 'react';
// import '../css/HomePage.css'; // Import your custom CSS file
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';

// const baseUrl = '/img/'

// const productCategories = [
//   { 
//       id: 1, 
//       title: 'Mobilier de bureau', 
//       description: 'Tables, chaises, bureaux ergonomiques', 
//       products: [
//           { image: 'https://via.placeholder.com/300', title: 'Bureau en bois massif', description: 'Elégant et robuste' },
//           { image: 'https://via.placeholder.com/300', title: 'Chaise de bureau ergonomique', description: 'Confort et soutien' },
//           { image: 'https://via.placeholder.com/300', title: 'Lampe de bureau LED', description: 'Eclairage optimal' }
//       ] 
//   },
//   { 
//       id: 2, 
//       title: 'Canapés et fauteuils', 
//       description: 'Relaxation et confort', 
//       products: [
//           { image: 'https://via.placeholder.com/300', title: 'Canapé d\'angle en cuir', description: 'Style et élégance' },
//           { image: 'https://via.placeholder.com/300', title: 'Fauteuil scandinave', description: 'Design minimaliste' },
//           { image: 'https://via.placeholder.com/300', title: 'Pouf en velours', description: 'Touche de couleur' }
//       ] 
//   },
//   { 
//       id: 3, 
//       title: 'Décoration intérieure', 
//       description: 'Personnalisez votre espace', 
//       products: [
//           { image: 'https://via.placeholder.com/300', title: 'Miroir mural design', description: 'Agrandit l\'espace' },
//           { image: 'https://via.placeholder.com/300', title: 'Tapis berbère', description: 'Chaleur et authenticité' },
//           { image: 'https://via.placeholder.com/300', title: 'Coussin à motifs', description: 'Originalité et confort' }
//       ] 
//   },
//   // Ajoutez autant de catégories que vous souhaitez ici
// ];
// const dataIMG = [
//   {
//     id: 1,
//     image: `${baseUrl}table1.jpg`,
//     title: "Table",
//     price: 29.99,
//   },

//   {
//     id: 2,
//     image: `${baseUrl}chaise1.jpg`,
//     title: "Chaise",
//     price: 45.50,
//   },

//   {
//     id: 3,
//     image: `${baseUrl}bureau1.jpg`,
//     title: "Bureau Gamer",
//     price: 45.50,
//   }
// ]

// const HomePage = () => {
//   return (
//       <div className="home-page">

//           {/* Carrousel principal */}
//           <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} dynamicHeight={true}>
//               {dataIMG.map((product) => (
//                   <div key={product.id} className="carousel-slide">
//                       <img src={product.image} alt={product.title} />
//                   </div>
//               ))}
//           </Carousel>

//           {/* Grille de catégories */}
//           <div className="category-grid">
//               {productCategories.map((category) => (
//                   <div key={category.id} className="category-item">
//                       <h3>{category.title}</h3>

//                       <img src={category.products[0].image} alt={category.title} /> {/* Image de la première catégorie */}
//                   </div>
//               ))}
//           </div>

//           {/* Les Highlanders du moment */}
//           <h2>Les Highlanders du moment</h2>

//           {/* Grille de produits */}
//           <div className="product-grid">
//               {productCategories.flatMap(category => category.products).map((product) => (
//                   <div key={product.id} className="product-item">
//                       <img src={product.image} alt={product.title} />

//                       <h3>{product.title}</h3>
//                   </div>
//               ))}
//           </div>
//       </div>
//   );
// };

// export default HomePage;
// import React, { useState, useEffect } from 'react';
// import '../css/HomePage.css';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
// import axios from 'axios';

// const baseUrl = '/img/'; // Assurez-vous que ce chemin est correct

// const HomePage = () => {
//   const [produits, setProduits] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/produits')
//       .then(response => {
//         setProduits(response.data);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des produits :', error);
//       });
//   }, []);

//   return (
//     <div className="home-page">

//       {/* Carrousel principal */}
//       <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} dynamicHeight={true}>
//         {produits.map((produit) => (
//           <div key={produit.id} className="carousel-slide">

//             <img src={baseUrl + produit.image} alt={produit.nom} /> 
//           </div>
//         ))}
//       </Carousel>

      // Grille de catégories
      // <div className="category-grid">
      //   {/* Ici, vous pouvez mapper les catégories si vous les avez récupérées de l'API */}
      // </div>

//       {/* Les Highlanders du moment */}
//       <h2>Les Highlanders du moment</h2>

//       {/* Grille de produits */}
//       <div className="product-grid">
//         {produits.map((produit) => (
//           <div key={produit.id} className="product-item">
//             <img src={baseUrl + produit.image} alt={produit.nom} />
//             <h3>{produit.nom}</h3>
//             <p>{produit.description}</p> {/* Ajout de la description */}
//             <p>Prix : {produit.price} €</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

const baseUrl = '/uploads/images/'; // Chemin vers le dossier d'images

const HomePage = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/produits')
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

  return (
    <div className="home-page">

      {/* Carrousel principal */}
      <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} dynamicHeight={true}>
        {produits.map((produit) => (
          <div key={produit.id} className="carousel-slide">
            {/* Affichage de la première photo de chaque produit dans le carrousel */}
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
          </div>
        ))}
      </Carousel>

      {/* Grille de catégories */}
      {/* Pour l'instant, on garde la structure existante */}
      {/* <div className="category-grid">
        {productCategories.map((category) => (
          <div key={category.id} className="category-item">
            <h3>{category.title}</h3>
            <img src={category.products[0].image} alt={category.title} />
          </div>
        ))}
      </div> */}
      
      Grille de catégories
      <div className="category-grid">
        {/* Ici, vous pouvez mapper les catégories si vous les avez récupérées de l'API */}
      </div>


      {/* Les Highlanders du moment */}
      <h2>Les Highlanders du moment</h2>

      {/* Grille de produits */}
      <div className="product-grid">
        {produits.map((produit) => (
          <div key={produit.id} className="product-item">
            {/* Affichage de la première photo de chaque produit dans la grille */}
            {produit.productPhotos.length > 0 && (
              <img src={baseUrl + produit.productPhotos[0].photoUrl} alt={produit.Nom} />
            )}
            <h3>{produit.Nom}</h3>
            <p>{produit.Description}</p>
            <p>Prix : {produit.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

