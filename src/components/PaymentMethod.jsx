import React from 'react';

function PaymentMethod({ method, onDelete, onChange, index }) {
  return (
    <div>
      <p>
        {method.cardType} ending in {method.last4Digits}
      </p>
      <input
        type="text"
        name={`paymentMethods.${index}.cardType`}
        value={method.cardType}
        onChange={onChange}
      />
      <input
        type="text"
        name={`paymentMethods.${index}.last4Digits`}
        value={method.last4Digits}
        onChange={onChange}
      />
      <button type="button" onClick={() => onDelete(method.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default PaymentMethod;
