import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simuler la récupération des données de commande
    const fetchOrders = async () => {
      const mockOrders = [
        { id: 1, date: '2023-03-15', items: ['Produit A', 'Produit B'], total: 100 },
        { id: 2, date: '2022-07-22', items: ['Produit C'], total: 50 },
        { id: 3, date: '2022-12-01', items: ['Produit D', 'Produit E'], total: 150 },
        // Ajoutez plus de commandes fictives ici
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Mes commandes</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrderPage;