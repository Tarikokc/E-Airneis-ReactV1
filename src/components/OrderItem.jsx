import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div>
      <h3>Commande du {new Date(order.date).toLocaleDateString()}</h3>
      <p>Articles : {order.items.join(', ')}</p>
      <p>Total : {order.total}€</p>
    </div>
  );
};

export default OrderItem;
