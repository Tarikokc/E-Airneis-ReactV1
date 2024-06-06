import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/orderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('..api/orders.php') // Appel à l'API PHP
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const groupByYear = () => {
    const grouped = {};
    orders.forEach(order => {
      const year = new Date(order.order_date).getFullYear();
      grouped[year] = grouped[year] || [];
      grouped[year].push(order);
    });
    return grouped;
  };

  const groupedOrders = groupByYear();

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des commandes : {error.message}</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Mes commandes</h2>
      {Object.entries(groupedOrders).map(([year, orders]) => (
        <div key={year} className="year-section">
          <h3>{year}</h3>
          <ul>
            {orders.map(order => (
              <li key={order.order_id}>
                <div className="order-details">
                  <p>Commande #{order.order_id} - {order.order_date}</p>
                  <p>Montant total: {order.total_amount} €</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
