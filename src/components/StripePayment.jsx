import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../css/StripeForm.css';
const stripePromise = loadStripe('pk_test_51PfKZmKixfMhfPrWZ2P1UQnTDA7ohWcfHkcDWiIc6tniqXtBo22m28m8TQAGZqHuReZ0Uo8dWUt8CSrnzI4IEONR00iLw1yFqJ'); // Initialisation de Stripe
function StripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const appearance = {
    theme: 'stripe', // Ou 'night' pour un thème sombre
    variables: {
      colorPrimary: '#ffffff', // Couleur du texte des labels (blanc)
      colorBackground: '#222222', // Couleur de fond (exemple de gris foncé)
      colorText: '#ffffff', // Couleur du texte général
      fontFamily: 'Arial, sans-serif', // Police de caractères
      borderRadius: '8px', // Rayon des coins arrondis
      // ... autres variables de style ...
    },
    rules: {
      '.Input': {
        backgroundColor: '#333333', // Couleur de fond des champs de saisie
        border: '1px solid #555555', // Bordure des champs de saisie
      },
      // ... autres règles de style ...
    },
  };
  
  useEffect(() => {
    // Récupérer le client secret depuis votre contrôleur Symfony
    fetch('http://localhost:8000/create-payment-intent')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      });
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return; // Stripe.js n'a pas encore chargé ou le clientSecret n'est pas disponible
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Utilisez une URL de retour qui sera gérée par votre contrôleur Symfony
        return_url: 'http://localhost:8000/paiement/success', // Exemple d'URL
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Le paiement a réussi ! Redirigez l'utilisateur ou effectuez d'autres actions
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && ( 
        <Elements stripe={stripePromise} options={{ clientSecret,appearance}}> 
          <PaymentElement />
        </Elements>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit" disabled={!stripe || !elements || !clientSecret}>
        Payer
      </button>
    </form>
  );
}

export default StripePayment;
