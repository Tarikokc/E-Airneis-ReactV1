import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;
