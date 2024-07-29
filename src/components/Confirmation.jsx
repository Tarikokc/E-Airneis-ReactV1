import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Confirmation() {
  console.log('Confirmation component rendered'); // Log au rendu du composant

  const location = useLocation();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);
  const orderDate = new Date();

  const panier = JSON.parse(sessionStorage.getItem('panier')) || [];
  const totalTTC = parseFloat(sessionStorage.getItem('totalTTC')) || 0;
  console.log('Panier:', panier); // Log du contenu du panier
  console.log('Total TTC:', totalTTC); // Log du total TTC
  useEffect(() => {
    console.log('useEffect triggered'); // Log pour savoir quand useEffect est déclenché

    const generateOrderNumber = () => {
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      console.log('Generated order number:', `E-${randomDigits}S`); // Log du numéro de commande généré

      return `E-${randomDigits}S`;
    };

    // Génération du numéro de commande (une seule fois)
    if (!orderNumber) {
      setOrderNumber(generateOrderNumber());
    }

    const sendOrderData = async () => {
      console.log('sendOrderData started'); // Log avant l'envoi de la commande

      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.token || !userData.user || !userData.user.id) {
          console.error('User data or token is missing or invalid:', userData);
          navigate('/login');
          return;
        }
        console.log('Sending order data to API...', {
          orderDate: orderDate.toISOString().slice(0, 10),
          totalAmount: totalTTC,
        }); // Log des données envoyées à l'API
        const response = await axios.post(`http://localhost:8000/api/order/${userData.user.id}/create`, {
          orderDate: orderDate.toISOString().slice(0, 10),
          totalAmount: totalTTC,
        }, {
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        });
        console.log('API response:', response); // Log de la réponse de l'API


        if (response.status === 201) {
          toast.success('La commande a bien été enregistrée !');
          setOrderNumber(response.data.orderId);
          const orderId = response.data.orderId; // Récupérer l'orderId de la réponse
          try {
            const orderDetailsData = panier.map(item => ({
              product_id: item.productId,
              quantity: item.quantite,
              unit_price: item.prix,
            }));

            const detailsResponse = await axios.post(
              `http://localhost:8000/api/orders/${orderId}/details`,
              orderDetailsData,
              {
                headers: {
                  Authorization: `Bearer ${userData.token}`,
                },
              }
            );

            if (detailsResponse.status === 201) {
              console.log('Détails de la commande envoyés avec succès');
            } else {
              console.error(
                'Erreur lors de l\'envoi des détails de la commande :',
                detailsResponse.data
              );
              toast.error(
                detailsResponse.data.error || 'Une erreur est survenue.'
              );
            }
          } catch (error) {
            console.error('Erreur lors de l\'envoi des détails de la commande:', error);
            toast.error(
              'Une erreur est survenue lors de l\'envoi des détails de la commande.'
            );
          }

        } else {
          console.error('Erreur lors de l\'enregistrement de la commande :', response.data); // Afficher la réponse complète en cas d'erreur
          toast.error(response.data.error || 'Une erreur est survenue.');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        toast.error('Une erreur est survenue lors de la création de la commande.');
      }
    };

    // Déplacer l'envoi de la commande À L'INTÉRIEUR de useEffect
    if (panier.length > 0 && !orderNumber) { // Vérifier si orderNumber n'est pas encore défini
      setOrderNumber(generateOrderNumber()); // Générer le numéro de commande avant l'envoi
      sendOrderData();
    }

  }, []); 

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
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Confirmation;

