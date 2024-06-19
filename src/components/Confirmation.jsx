import React from 'react';
import { Link } from 'react-router-dom';

function Confirmation() {
  const orderNumber = "XXXXXXXX"; // Remplacez par la logique pour récupérer le numéro de commande réel

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Commande effectuée ✓</h1>
      <p className="confirmation-message">Merci de votre achat !</p>
      <p>Votre commande a bien été enregistrée sous le numéro {orderNumber}.</p>
      <p>Vous pouvez suivre son état depuis votre <Link to="/orderHistory">espace client</Link>.</p>
      <Link to="/">
        <button className="confirmation-button">CONTINUER MES ACHATS</button>
      </Link>
    </div>
  );
}

export default Confirmation;
