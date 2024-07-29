import React, { useState, useEffect } from 'react';
import '../css/Panier.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { ImBin2 } from "react-icons/im";

const baseUrl = '/img/';

function Panier() {
  const [panier, setPanier] = useState([]);
  const [userId, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);

  const navigate = useNavigate();
  const [totalTTC, setTotalTTC] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.user && userData.user.id) {
      setUserId(userData.user.id);
      fetchPanier(userData.user.id);
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      setPanier(guestCart);
      fetchPanier(); 

    }
  }, []);

  const fetchPanier = async (userId = null) => {
    try {
      if (userId) {
        const response = await fetch(`http://localhost:8000/api/panier/${userId}`);
        const data = await response.json();
        setPanier(data);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        const formattedGuestCart = guestCart.map(item => ({
          productId: parseInt(item.productId, 10) || 0,
          Nom: item.Nom || '',
          prix: parseFloat(item.prix) || 0,
          quantite: parseInt(item.quantite, 10) || 0,
          photoUrl: item.photoUrl || ''
        }));

        setPanier(formattedGuestCart);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    }
  };

  const handleModifierProduit = async (productId, nouvelleQuantite) => {
    console.log("Début de handleModifierProduit");
    console.log("productId:", productId, "nouvelleQuantite:", nouvelleQuantite);

    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.user && userData.user.id) {
      console.log("Utilisateur connecté, modification via API");
      try {
        const userId = userData.user.id;
        console.log("userId:", userId);

        const response = await fetch(`http://localhost:8000/api/panier/${productId}/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantite: nouvelleQuantite }),
        });

        console.log("Réponse API (PUT):", response);

        if (response.ok) {
          const updatedPanierData = await response.json();
          console.log("Données du panier mis à jour (API):", updatedPanierData);

          const updatedPanierItem = updatedPanierData.panier;
          setPanier(prevPanier => prevPanier.map(p =>
            p.productId === productId ? { ...p, quantite: updatedPanierItem.quantite } : p
          ));
          toast.success('Quantité mise à jour !');
        } else {
          console.error('Erreur API (PUT):', response.statusText);
          toast.error('Erreur lors de la modification de la quantité.');

          try {
            const errorData = await response.json();
            console.error("Détails de l'erreur API (PUT):", errorData);
            if (errorData.error) {
              toast.error(errorData.error);
            }
          } catch (parseError) {
            console.error("Erreur lors de l'analyse de la réponse d'erreur (PUT):", parseError);
          }
        }
      } catch (error) {
        console.error('Erreur requête (PUT):', error);
        toast.error('Une erreur est survenue.');
      }
    } else {
      console.log("Utilisateur non connecté, modification localStorage");

      const updatedPanier = panier.map(p =>
        p.productId === productId ? { ...p, quantite: nouvelleQuantite } : p
        
      );
      localStorage.setItem('guestCart', JSON.stringify(updatedPanier));
      toast.success('Quantité mise à jour avec succès !'); 


      setPanier(updatedPanier);
      console.log("Panier après modification (localStorage):", updatedPanier); 
    }
  };

  const handleSupprimerProduit = async (productId) => {
    console.log("Début de handleSupprimerProduit");
    console.log("productId:", productId);

    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.user && userData.user.id) {
      console.log("Utilisateur connecté, suppression via API");
      try {
        const userId = userData.user.id;
        console.log("userId:", userId);

        const response = await fetch(`http://localhost:8000/api/panier/${productId}/${userId}`, {
          method: 'DELETE',
        });

        console.log("Réponse API (DELETE):", response);

        if (response.ok) {
          setPanier(prevPanier => prevPanier.filter(p => p.productId !== productId));
          toast.success('Produit supprimé du panier !');
        } else {
          console.error('Erreur API (DELETE):', response.statusText);
          toast.error('Erreur lors de la suppression du produit.');
        }
      } catch (error) {
        console.error('Erreur requête (DELETE):', error);
        toast.error('Une erreur est survenue.');
      }
    } else {
      console.log("Utilisateur non connecté, suppression localStorage");

      const updatedPanier = panier.filter(p => p.productId !== productId);
      localStorage.setItem('guestCart', JSON.stringify(updatedPanier));
      toast.success('Produit supprimé du panier avec succès !'); // Toast de succès


      setPanier(updatedPanier);
      console.log("Panier après suppression (localStorage):", updatedPanier); 
    }
  };

  const calculerTotal = () => {
    const totalHT = panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
    const tauxTVA = 0.2;
    const montantTVA = totalHT * tauxTVA;
    const totalTTC = totalHT + montantTVA;

    console.log("Total HT:", totalHT);       
    console.log("Montant TVA:", montantTVA);   
    console.log("Total TTC:", totalTTC);      

    return { totalTTC, montantTVA }; 
  };

  useEffect(() => {
    setTotalTTC(calculerTotal().totalTTC);
    sessionStorage.setItem('panier', JSON.stringify(panier)); 
    console.log("Panier mis à jour dans le sessionStorage:", panier); 
  }, [panier]); 

  const handlePasserCommande = () => {
    navigate('/StripeForm');
  };

  return (
    <div className="panier">
      <h2>Panier</h2>
      <ul className="liste-produits">
        {panier.map((produit) => (
          <li key={produit.productId} className="produit-panier">
            {produit.photoUrl && ( 
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
              <button onClick={() => handleSupprimerProduit(produit.productId)} className="supprimer-produit">
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
        console.log("Total TTC transmis à Checkout:", totalTTC); 
        sessionStorage.setItem('totalTTC', totalTTC);
        navigate('/checkout', { state: { panier } }); 
      }}>
        Passer la commande
      </button>
      <ToastContainer />
    </div>
  );
}

export default Panier;
