// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // function Confirmation() {
// //   const orderNumber = "XXXXXXXX"; // Remplacez par la logique pour récupérer le numéro de commande réel

// //   return (
// //     <div className="confirmation-container">
// //       <h1 className="confirmation-title">Commande effectuée ✓</h1>
// //       <p className="confirmation-message">Merci de votre achat !</p>
// //       <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>
// //       <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
// //       <Link to="/">
// //         <button className="confirmation-button">CONTINUER MES ACHATS</button>
// //       </Link>
// //     </div>
// //   );
// // }

// // export default Confirmation;
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Importer useNavigate

// function Confirmation() {
//   const location = useLocation();
//   const [orderNumber, setOrderNumber] = useState(null);
//   const [totalTTC, setTotalTTC] = useState(0);
//   const [orderDate, setOrderDate] = useState(new Date());
//   const navigate = useNavigate(); // Obtenir l'objet history

//   const generateOrderNumber = () => {
//     const randomDigits = Math.floor(100000 + Math.random() * 900000); // Génère 6 chiffres aléatoires
//     return `E-${randomDigits}S`;
//   };

//   useEffect(() => {
//     const storedTotalTTC = sessionStorage.getItem('totalTTC');
//     if (storedTotalTTC) {
//       setTotalTTC(parseFloat(storedTotalTTC));
//     }
//     setOrderNumber(generateOrderNumber());

//     // Envoi des données à Symfony
//     const sendOrderData = async () => {
//       try {
//         const userData = JSON.parse(localStorage.getItem('user'));
//         const userId = userData.user.id;

//         if (!userData || !userData.token || !userData.user || !userData.user.id) {
//           console.error('User data or token is missing or invalid:', userData);
//           navigate('/login');
//           return;
//         }
//         await axios.post(`http://localhost:8000/api/order/${userId}/create`, {
//           orderDate: orderDate.toISOString().slice(0, 10), // Format YYYY-MM-DD
//           totalAmount: totalTTC,
//         });
//         // Vous pouvez ajouter une gestion de la réponse ici si nécessaire
//       } catch (error) {
//         console.error('Erreur lors de la création de la commande:', error);
//         // Gérez l'erreur de manière appropriée (affichage d'un message, etc.)
//       }
//     };

//     if (orderNumber && totalTTC) { // Envoyer les données uniquement si elles sont disponibles
//       sendOrderData();
//     }
    

    
//   }, [location.state, orderDate, totalTTC]); // Dépendances pour déclencher l'effet

//   return (
//     <div className="confirmation-container">
//       <h1 className="confirmation-title">Commande effectuée ✓</h1>
//       <p className="confirmation-message">Merci pour votre achat !</p>
//       <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>
//       <p>Date de la commande : {orderDate.toLocaleDateString()}</p>
//       <p>Montant total : {totalTTC.toFixed(2)} €</p>
//       <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
//       <Link to="/">
//         <button className="confirmation-button">CONTINUER MES ACHATS</button>
//       </Link>
//     </div>
//   );
// }

// export default Confirmation;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling   

function Confirmation() {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalTTC, setTotalTTC] = useState(0);
  const [orderDate, setOrderDate] = useState(new Date());
  const navigate = useNavigate();

  const generateOrderNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `E-${randomDigits}S`; 
  };

  useEffect(() => {
    const storedTotalTTC = sessionStorage.getItem('totalTTC');
    if (storedTotalTTC) {
      setTotalTTC(parseFloat(storedTotalTTC));
    }
    if (location.state && location.state.orderNumber) {
      setOrderNumber(location.state.orderNumber);
    } else {
      setOrderNumber(generateOrderNumber());
    }

    const sendOrderData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.token || !userData.user || !userData.user.id) {
          console.error('User data or token is missing or invalid:', userData);
          navigate('/login'); 
          return;
        }

        const response = await axios.post(`http://localhost:8000/api/order/${userData.user.id}/create`, {
          orderDate: orderDate.toISOString().slice(0, 10),
          totalAmount: totalTTC,
        });

        if (response.status === 201) {
          toast.success('La commande a bien été enregistrée !');
        } else {
          console.error('Erreur lors de l\'enregistrement de la commande :', response.data.error);
          toast.error(response.data.error || 'Une erreur est survenue.');
        }
        setOrderNumber(response.data.orderId); 
      } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        toast.error('Une erreur est survenue lors de la création de la commande.'); 

      }
    };

    if (totalTTC && !location.state?.orderNumber) { 
      sendOrderData();
    }
  }, [location.state, orderDate, totalTTC]);

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Commande effectuée ✓</h1>
      <p className="confirmation-message">Merci pour votre achat !</p>
      {orderNumber && <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>}
      <p>Date de la commande : {orderDate.toLocaleDateString()}</p>
      <p>Montant total : {totalTTC.toFixed(2)} €</p>
      <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
      <Link to="/">
        <button className="confirmation-button">CONTINUER MES ACHATS</button>
      </Link>

      <ToastContainer 
        position="top-center" // Position du toast (optionnel)
        autoClose={3000}      // Durée d'affichage en millisecondes (optionnel)
        hideProgressBar={false} // Masquer la barre de progression (optionnel)
        newestOnTop={false}    // Afficher les nouveaux toasts en haut (optionnel)
        closeOnClick          // Fermer le toast au clic (optionnel)
        rtl={false}            // Activer le mode RTL (optionnel)
        pauseOnFocusLoss       // Mettre en pause le compte à rebours lorsque la fenêtre perd le focus (optionnel)
        draggable             // Rendre le toast déplaçable (optionnel)
        pauseOnHover          // Mettre en pause le compte à rebours lorsque le curseur est sur le toast (optionnel)
      /> 
    </div>
  );
}

export default Confirmation;

