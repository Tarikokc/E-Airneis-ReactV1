import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../css/AccountSettings.css';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function AccountSettings() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const { getValues } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);



  useEffect(() => {
    setStripePromise(loadStripe('pk_test_51PfKZmKixfMhfPrWZ2P1UQnTDA7ohWcfHkcDWiIc6tniqXtBo22m28m8TQAGZqHuReZ0Uo8dWUt8CSrnzI4IEONR00iLw1yFqJ')); // Remplacez par votre clé
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));

      if (!userData || !userData.token || !userData.user || !userData.user.id) {
        console.error('User data or token is missing or invalid:', userData);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/account/${userData.user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        });
        console.log('Requête GET envoyée :', {
          url: `http://localhost:8000/api/account/${userData.user.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données utilisateur');
        }
        const data = await response.json();

        console.log('Données utilisateur reçues (brutes) :', data); // <-- Ajout de ce log

        if (data) {
          setUserData(data); // Stockez les données de l'utilisateur dans l'état
        }
      
      } catch (error) {
        console.error(error);
        setApiErrors(error.message);
      }
    };

    fetchUserData();
  }, [navigate, reset]);

  useEffect(() => {
    Object.keys(getValues()).forEach(field => {
      console.log(`Valeur du champ ${field} :`, getValues(field));
    });
  }, [getValues]);

  const onSubmit = async (data) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.token || !userData.user || !userData.user.id) {
      console.error('User data or token is missing or invalid:', userData);
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setApiErrors(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`http://localhost:8000/api/account/${userData.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(data)
      });

      console.log('Requête envoyée :', {
        url: `http://localhost:8000/api/account/${userData.user.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: data 
      });

      if (!response.ok) {
        const errorData = await response.json();
        setApiErrors(errorData.errors || { general: "Erreur lors de la mise à jour." }); // Gestion plus robuste des erreurs
      } else {
        setSuccessMessage('Informations mises à jour avec succès !');
        const updatedData = await response.json();
        reset(updatedData.user); // Réinitialiser le formulaire avec les données mises à jour
        setEditing(null);
      }
    } catch (error) {
      console.error(error);
      setApiErrors({ general: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteField = async (field) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.token || !userData.user || !userData.user.id) {
      console.error('User data or token is missing or invalid:', userData);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/account/${userData.user.id}/${field}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du champ');
      }

      setValue(field, null);
      setSuccessMessage('Champ supprimé avec succès !');
    } catch (error) {
      console.error(error);
      setApiErrors({ general: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  };

  const startEditing = (field) => {
    setEditing(field);
  };

  const cancelEditing = () => {
    setEditing(null);
    reset();
  };

  const handleCardDetailsChange = (event) => {
    // Vous pouvez gérer la validation de la saisie de la carte ici si nécessaire
    console.log(event);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card account-settings">
            <div className="card-body">
              <h2 className="card-title">Paramètres du compte</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                {userData ? (
                  <>
                    <div className="form-group row">
                      <label htmlFor="firstName" className="col-sm-3 col-form-label">Prénom:</label>
                      <div className="col-sm-9">
                        {editing === 'firstName' ? (
                          <input
                            type="text"
                            {...register("firstName", { required: true, minLength: 2, maxLength: 50 })}
                            className="form-control"
                            defaultValue={userData.firstName}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.firstName}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('firstName')}>Modifier</button>
                          </>
                        )}
                        {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="lastName" className="col-sm-3 col-form-label">Nom:</label>
                      <div className="col-sm-9">
                        {editing === 'lastName' ? (
                          <input
                            type="text"
                            {...register("lastName", { required: true, minLength: 2, maxLength: 50 })}
                            className="form-control"
                            defaultValue={userData.lastName}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.lastName}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('lastName')}>Modifier</button>
                          </>
                        )}
                        {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
                      <div className="col-sm-9">
                        {editing === 'email' ? (
                          <input
                            type="email"
                            {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            className="form-control"
                            defaultValue={userData.email}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.email}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('email')}>Modifier</button>
                          </>
                        )}
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                      </div>
                    </div>
                    {/* Mot de passe */}
                    <div className="form-group row">
                      <label htmlFor="password" className="col-sm-3 col-form-label">Nouveau mot de passe:</label>
                      <div className="col-sm-9">
                        {editing === 'password' ? (
                          <>
                            <input type="password" {...register("password", { minLength: 8 })} className="form-control mb-2" />
                            <input
                              type="password"
                              placeholder="Confirmer le mot de passe"
                              {...register("confirmPassword", {
                                validate: (value) => value === watch('password') || "Les mots de passe ne correspondent pas",
                              })}
                              className="form-control"
                            />
                          </>
                        ) : (
                          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('password')}>Modifier le mot de passe</button>
                        )}
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                      </div>
                    </div>
                    {/* Les autres champs */}
                    <div className="form-group row">
                      <label htmlFor="address" className="col-sm-3 col-form-label">Adresse:</label>
                      <div className="col-sm-9">
                        {editing === 'address' ? (
                          <input
                            type="text"
                            {...register("address", { required: true, minLength: 2, maxLength: 100 })}
                            className="form-control"
                            defaultValue={userData.address}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.address}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('address')}>Modifier</button>
                          </>
                        )}
                        {errors.address && <span className="error-message">{errors.address.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="city" className="col-sm-3 col-form-label">Ville:</label>
                      <div className="col-sm-9">
                        {editing === 'city' ? (
                          <input
                            type="text"
                            {...register("city", { required: true, minLength: 2, maxLength: 50 })}
                            className="form-control"
                            defaultValue={userData.city}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.city}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('city')}>Modifier</button>
                          </>
                        )}
                        {errors.city && <span className="error-message">{errors.city.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="country" className="col-sm-3 col-form-label">Pays:</label>
                      <div className="col-sm-9">
                        {editing === 'country' ? (
                          <input
                            type="text"
                            {...register("country", { required: true, minLength: 2, maxLength: 50 })}
                            className="form-control"
                            defaultValue={userData.country}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.country}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('country')}>Modifier</button>
                          </>
                        )}
                        {errors.country && <span className="error-message">{errors.country.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Téléphone:</label>
                      <div className="col-sm-9">
                        {editing === 'phoneNumber' ? (
                          <input
                            type="tel"
                            {...register("phoneNumber", { required: true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ })}
                            className="form-control"
                            defaultValue={userData.phoneNumber}
                          />
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.phoneNumber}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('phoneNumber')}>Modifier</button>
                          </>
                        )}
                        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber.message}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="paymentMethod" className="col-sm-3 col-form-label">Moyen de paiement :</label>
                      <div className="col-sm-9">
                        {editing === 'paymentMethod' ? (
                          <select id="paymentMethod" {...register("paymentMethod")}>
                            <option value="">Sélectionnez un moyen de paiement</option>
                            <option value="credit_card">Carte de crédit</option>
                            <option value="paypal">PayPal</option>
                          </select>
                        ) : (
                          <>
                            <p className="form-control-plaintext">{userData.paymentMethod || "Aucun moyen de paiement enregistré"}</p>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => startEditing('paymentMethod')}>
                              Modifier
                            </button>
                          </>
                        )}
                        {errors.paymentMethod && <span className="error-message">{errors.paymentMethod.message}</span>}
                      </div>
                    </div>
                    {editing === 'paymentMethod' && watch('paymentMethod') === 'credit_card' && stripePromise ? (
                      <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                          {({ elements, stripe }) => (
                            <div className="mt-2">
                              <CardElement
                                options={{
                                  style: {
                                    base: {
                                      fontSize: '16px',
                                      color: '#424770',
                                      '::placeholder': {
                                        color: '#aab7c4',
                                      },
                                      colorText: '#ffffff', // Couleur du texte général

                                    },
                                    invalid: {
                                      color: '#9e2146',
                                    },
                                  },
                                }}
                                onChange={handleCardDetailsChange}
                              />
                            </div>
                          )}
                        </ElementsConsumer>
                      </Elements>
                    ) : null}

                  </>
                ) : (
                  <p>Chargement des données utilisateur...</p>
                )
                }

                {editing && (
                  <div className="buttons mt-3">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>Enregistrer les modifications</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelEditing}>Annuler</button>
                  </div>
                )}
              </form>

              {/* Message de succès */}
              {successMessage && <p className="success-message mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AccountSettings;


