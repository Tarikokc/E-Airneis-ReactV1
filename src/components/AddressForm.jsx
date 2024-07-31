import React from "react";

function AddressForm({ addressType, addressData, onChange }) {
  const fields = ["street", "city", "zipCode", "country"];

  return (
    <div>
      <h4>
        {addressType === "shipping"
          ? "Adresse de livraison"
          : "Adresse de facturation"}
      </h4>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={`${addressType}.${field}`}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            id={`${addressType}.${field}`}
            name={`${addressType}.${field}`}
            value={addressData[field]}
            onChange={onChange} // Pas besoin depasser addressType et field ici
          />
        </div>
      ))}
    </div>
  );
}

export default AddressForm;
