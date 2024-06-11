import React, { useState } from 'react';
import AddressForm from './AddressForm';
import PaymentMethod from './PaymentMethod';

function AccountSettings() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    shippingAddress: { street: '', city: '', zipCode: '', country: '' },
    billingAddress: { street: '', city: '', zipCode: '', country: '' },
    paymentMethods: [], 
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (name.startsWith('shippingAddress') || name.startsWith('billingAddress')) {
        const addressType = name.split('.')[0];
        const field = name.split('.')[1];
        return {
          ...prevData,
          [addressType]: { ...prevData[addressType], [field]: value },
        };
      } else if (name.startsWith('paymentMethods')) {
        const methodIndex = parseInt(name.split('.')[1], 10);
        const field = name.split('.')[2];
        return {
          ...prevData,
          paymentMethods: prevData.paymentMethods.map((method, index) =>
            index === methodIndex ? { ...method, [field]: value } : method
          ),
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePaymentMethodDelete = (methodId) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethods: prevData.paymentMethods.filter((method) => method.id !== methodId),
    }));
  };

  const handleAddPaymentMethod = () => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethods: [...prevData.paymentMethods, { id: Date.now(), cardType: '', last4Digits: '' }],
    }));
  };

  // Fonction handleSubmit corrigée et placée avant le JSX
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Validation du formulaire (à compléter selon vos règles)
      const newErrors = {};
      if (formData.password && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
      // ... autres validations (email, champs obligatoires, etc.)

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/update-account', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Vos informations ont été mises à jour avec succès !');
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations :', error);
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Paramètres du compte</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (Champs de formulaire pour les informations personnelles) */}
        <div>
          <label htmlFor="fullName">Nom complet:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Nouveau mot de passe:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </div>

        <h3>Carnet d'adresses</h3>
        <AddressForm addressType="shipping" addressData={formData.shippingAddress} onChange={handleChange} />
        <AddressForm addressType="billing" addressData={formData.billingAddress} onChange={handleChange} />

        <h3>Méthodes de paiement</h3>
        {formData.paymentMethods.map((method, index) => (
          <PaymentMethod key={method.id} method={method} onDelete={handlePaymentMethodDelete} onChange={handleChange} index={index} />
        ))}
        <button type="button" onClick={handleAddPaymentMethod}>
          Ajouter une méthode de paiement
        </button>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>

        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      </form>
    </div>
  );
}

export default AccountSettings;
