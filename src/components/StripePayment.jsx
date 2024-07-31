import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../LoginPage/LoginForm';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../css/StripeForm.css';
import Confirmation from './Confirmation';
import { useLocation } from 'react-router-dom'; 

const stripePromise = loadStripe('pk_test_51PfKZmKixfMhfPrWZ2P1UQnTDA7ohWcfHkcDWiIc6tniqXtBo22m28m8TQAGZqHuReZ0Uo8dWUt8CSrnzI4IEONR00iLw1yFqJ');

function Checkout() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [useExistingData, setUseExistingData] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const location = useLocation();
  const [totalTTC, setTotalTTC] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const fieldData = [
    { id: 'firstName', label: 'Prénom:', value: firstName, setter: setFirstName },
    { id: 'lastName', label: 'Nom:', value: lastName, setter: setLastName },
    { id: 'email', label: 'Email:', value: email, setter: setEmail },
    { id: 'address', label: 'Adresse:', value: address, setter: setAddress },
    { id: 'city', label: 'Ville:', value: city, setter: setCity },
    { id: 'country', label: 'Pays:', value: country, setter: setCountry },
    { id: 'phoneNumber', label: 'Numéro de téléphone:', value: phoneNumber, setter: setPhoneNumber },
  ];

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ffffff',
      colorBackground: '#222222',
      colorText: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        backgroundColor: '#333333',
        border: '1px solid #555555',
      },
    },
  };

  useEffect(() => {
    const storedTotalTTC = sessionStorage.getItem('totalTTC');
    if (storedTotalTTC) {
      const parsedTotalTTC = parseFloat(storedTotalTTC);
      setTotalTTC(parsedTotalTTC);

      console.log("Montant total du panier (avant requête):", parsedTotalTTC);

      fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalTTC: parsedTotalTTC }) 
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErrorMessage(data.error);
            console.error("Erreur lors de la création du Payment Intent:", data.error);
          } else {
            setClientSecret(data.clientSecret);
            console.log("Client Secret reçu:", data.clientSecret);
          }
        })
        .catch(error => {
          setErrorMessage('Erreur réseau lors de la création du Payment Intent');
          console.error("Erreur réseau:", error);
        });
    } else {
      console.error("Total TTC non trouvé dans sessionStorage");
    }
  }, []); 

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.token || !storedUser.user || !storedUser.user.id) {
        console.error('User data or token is missing or invalid:', storedUser);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/account/${storedUser.user.id}`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setUserData(data);

       
        if (useExistingData && data) {
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setAddress(data.address || '');
          setCity(data.city || '');
          setCountry(data.country || '');
          setPhoneNumber(data.phoneNumber || '');
        }

        setStep(2); 
      } catch (error) {
        console.error('Error fetching user data:', error);
       
      }
    };

    fetchUserData();
  }, [navigate, useExistingData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
   
    navigate('/confirmation'); 
  };

  return (
    <>
      {step === 1 ? (
        <Login onNext={setStep} />
      ) : (
        <>
          {!showConfirmation && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Étape 2 : Informations de livraison et paiement</h2>

                <label>
                  <input
                    type="checkbox"
                    checked={useExistingData}
                    onChange={() => setUseExistingData(!useExistingData)}
                  />
                  Utiliser mes informations de livraison existantes
                </label>

                <h3>Adresse de livraison</h3>

                {fieldData.map(field => (
                  <div className="form-group" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type={field.id === 'email' ? 'email' : field.id === 'phoneNumber' ? 'tel' : 'text'}
                      id={field.id}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      disabled={useExistingData}
                    />
                  </div>
                ))}

                <h3>Informations de paiement</h3>
                <PaymentElement />

                <button type="submit" disabled={!stripe || !elements || !clientSecret}>
                  Payer
                </button>
                {errorMessage && <div className="error">{errorMessage}</div>}
              </form>
            </Elements>
          )}

          {showConfirmation && (
            <Confirmation />
          )}
        </>
      )}
    </>
  );

}

export default Checkout;
