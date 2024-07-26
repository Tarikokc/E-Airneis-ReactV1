import React, { useState, useEffect } from 'react';
import '../css/Panier.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { ImBin2 } from "react-icons/im";

const baseUrl = '/img/';

function Panier() {
  const [panier, setPanier] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Obtenir l'objet history
  const [totalTTC, setTotalTTC] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.user && userData.user.id) {
      setUserId(userData.user.id);
    } else {
      console.error('User data or token is missing or invalid:', userData);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchPanier = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/panier/${userId}`);
          const data = await response.json();
          console.log("Données du panier :", data); // Afficher les données du panier dans la console

          setPanier(data);
        } catch (error) {
          console.error('Erreur lors de la récupération du panier:', error);
        }
      };

      fetchPanier();
    }
  }, [userId]);

  const handleModifierProduit = async (productId, nouvelleQuantite) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData.user.id;

      console.log("Envoi de la requête PUT avec les données suivantes :");
      console.log("productId:", productId);
      console.log("userId:", userId);
      console.log("nouvelleQuantite:", nouvelleQuantite);

      const response = await fetch(`http://localhost:8000/api/panier/${productId}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantite: nouvelleQuantite }),
      });

      console.log("Réponse de l'API :", response);

      if (response.ok) {
        const updatedPanierData = await response.json();
        console.log("Données du panier mis à jour :", updatedPanierData);

        const updatedPanierItem = updatedPanierData.panier;
        setPanier(prevPanier => prevPanier.map(p =>
          p.productId === productId ? { ...p, quantite: updatedPanierItem.quantite } : p
        ));
        toast.success('Quantité mise à jour !');
      } else {
        console.error('Erreur lors de la modification:', response.statusText);
        toast.error('Erreur lors de la modification de la quantité.');

        // Récupérer le message d'erreur détaillé depuis la réponse
        try {
          const errorData = await response.json();
          console.error("Détails de l'erreur :", errorData);
          if (errorData.error) {
            toast.error(errorData.error);
          }
        } catch (parseError) {
          console.error("Erreur lors de l'analyse de la réponse d'erreur :", parseError);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      toast.error('Une erreur est survenue.');
    }
  };


  const handleSupprimerProduit = async (panierId) => { // Utilisez panierId
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData.user.id;

      const response = await fetch(`http://localhost:8000/api/panier/${panierId}/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPanier(prevPanier => prevPanier.filter(p => p.panierId !== panierId));
        toast.success('Produit supprimé du panier !');
      } else {
        console.error('Erreur lors de la suppression:', response.statusText);
        toast.error('Erreur lors de la suppression du produit.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      toast.error('Une erreur est survenue.');
    }
  };

  const calculerTotal = () => {
    const totalHT = panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
    const tauxTVA = 0.2;
    const montantTVA = totalHT * tauxTVA;
    const totalTTC = totalHT + montantTVA;

    console.log("Total HT:", totalHT);        // Log du total HT
    console.log("Montant TVA:", montantTVA);   // Log du montant de la TVA
    console.log("Total TTC:", totalTTC);      // Log du total TTC

    return { totalTTC, montantTVA }; // Renvoyer un objet avec les deux valeurs
  };

  useEffect(() => {
    // Mettez à jour le total TTC lorsque le panier change
    setTotalTTC(calculerTotal().totalTTC);
  }, [panier]); // Déclenchez l'effet à chaque changement du panier

  const handlePasserCommande = () => {
    navigate('/StripeForm');
  };

  return (
    <div className="panier">
      <h2>Panier</h2>
      <ul className="liste-produits">
        {panier.map((produit) => (
          <li key={produit.productId} className="produit-panier">
            {/* Affichage de l'image */}
            {produit.photoUrl && ( // Vérifier si photoUrl existe
              <img src={baseUrl + produit.photoUrl} alt={produit.Nom} />
            )}
            <div className="details-produit">
              <h3>{produit.Nom}</h3>
              <p>{produit.Description}</p>
              <p>{produit.prix} €</p>
              <div className="quantite">
                <button onClick={() => {
                  console.log("Type de produit.quantite :", typeof produit.quantite);
                  handleModifierProduit(produit.productId, produit.quantite - 1);
                }}>-</button>
                <span>{produit.quantite}</span>
                <button onClick={() => {
                  console.log("Type de produit.quantite :", typeof produit.quantite);
                  handleModifierProduit(produit.productId, produit.quantite + 1);
                }}>+</button>
              </div>
              <button onClick={() => handleSupprimerProduit(produit.id)} className="supprimer-produit">
                <ImBin2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total">
        <h3>Total (TVA incluse) : {calculerTotal().totalTTC.toFixed(2)} €</h3>
        <p>dont TVA : {calculerTotal().montantTVA.toFixed(2)} €</p>
      </div>
      <button className="passer-commande" onClick={() => {
        console.log("Total TTC transmis à Checkout:", totalTTC); // Log avant la navigation
        sessionStorage.setItem('totalTTC', totalTTC);
        navigate('/checkout');
        }}>
        Passer la commande
      </button>
    </div>
  );
}

export default Panier;
