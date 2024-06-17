import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import AddressForm from './AddressForm';
import { loadStripe } from '@stripe/stripe-js';

function Checkout() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleNextStep = async () => {
    if (activeStep === 1) {
      // Vérification de connexion (à implémenter)
      // ...
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Validation de l'adresse
      const newErrors = {};
      if (!formData.firstName || !formData.lastName) {
        newErrors.fullName = 'Veuillez entrer votre nom complet.';
      }
      // ... autres validations d'adresse
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          body: JSON.stringify({
            customer_email: formData.email,
            line_items: [
              // ... Vos articles de panier ici (à récupérer depuis votre state)
            ],
            success_url: `${window.location.origin}/confirmation`, // URL de succès
            cancel_url: `${window.location.origin}/cart`, // URL d'annulation
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const { sessionId } = await response.json();
          const stripe = await loadStripe('VOTRE_CLÉ_PUBLIQUE_STRIPE'); // Charger Stripe.js
          stripe.redirectToCheckout({ sessionId }); // Rediriger vers la page de paiement Stripe
        } else {
          // Gérer les erreurs de la requête
          console.error('Erreur lors de la création de la session de paiement:', response);
        }
      } catch (error) {
        // Gérer les erreurs réseau
        console.error('Erreur réseau:', error);
      }
    }
  };

  return (
    <div>
      <h2>Paiement</h2>

      {activeStep === 1 && (
        <div>
          {/* Formulaire de connexion ou liens vers les pages de connexion/inscription */}
          {/* ... */}
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <h3>Adresse de livraison</h3>
          <AddressForm addressType="shipping" addressData={formData.shippingAddress} onChange={handleChange} />
          {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
          {/* ... autres erreurs d'adresse */}
          <button onClick={handleNextStep}>Suivant</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
