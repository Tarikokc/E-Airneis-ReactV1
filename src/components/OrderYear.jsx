import React from 'react';
import OrderItem from './OrderItem';

const OrderYear = ({ year, orders }) => {
  return (
    <div>
      <h2>{year}</h2>
      {orders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderYear;
