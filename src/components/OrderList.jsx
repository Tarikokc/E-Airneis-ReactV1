import React from 'react';
import OrderYear from './OrderYear';

const OrderList = ({ orders }) => {
  // Regrouper les commandes par année
  const ordersByYear = orders.reduce((acc, order) => {
    const year = new Date(order.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(order);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(ordersByYear).map(year => (
        <OrderYear key={year} year={year} orders={ordersByYear[year]} />
      ))}
    </div>
  );
};

export default OrderList;
