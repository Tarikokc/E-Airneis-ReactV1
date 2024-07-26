// import React from 'react';
// import { Link } from 'react-router-dom';

// function Confirmation() {
//   const orderNumber = "XXXXXXXX"; // Remplacez par la logique pour récupérer le numéro de commande réel

//   return (
//     <div className="confirmation-container">
//       <h1 className="confirmation-title">Commande effectuée ✓</h1>
//       <p className="confirmation-message">Merci de votre achat !</p>
//       <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>
//       <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
//       <Link to="/">
//         <button className="confirmation-button">CONTINUER MES ACHATS</button>
//       </Link>
//     </div>
//   );
// }

// export default Confirmation;
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Confirmation() {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalTTC, setTotalTTC] = useState(0);
  const [orderDate, setOrderDate] = useState(new Date());

  const generateOrderNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // Génère 6 chiffres aléatoires
    return `E-${randomDigits}S`;
  };

  useEffect(() => {
    const storedTotalTTC = sessionStorage.getItem('totalTTC');
    if (storedTotalTTC) {
      setTotalTTC(parseFloat(storedTotalTTC));
    }
    setOrderNumber(generateOrderNumber());
  }, [location.state]);

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Commande effectuée ✓</h1>
      <p className="confirmation-message">Merci pour votre achat !</p>
      <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>
      <p>Date de la commande : {orderDate.toLocaleDateString()}</p>
      <p>Montant total : {totalTTC.toFixed(2)} €</p>
      <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
      <Link to="/">
        <button className="confirmation-button">CONTINUER MES ACHATS</button>
      </Link>
    </div>
  );
}

export default Confirmation;
