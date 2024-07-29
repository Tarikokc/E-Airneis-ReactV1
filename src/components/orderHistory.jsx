import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/orderHistory.css"; // Assurez-vous d'avoir ce fichier CSS
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Obtenir l'objet history

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.user.id;

        if (!userData || !userData.token || !userData.user || !userData.user.id) {
          console.error('User data or token is missing or invalid:', userData);
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/order/history/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des commandes: " + err.message); // Message d'erreur plus détaillé
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const groupedOrders = orders.reduce((acc, order) => {
    const year = new Date(order.order_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(order);
    return acc;
  }, {});

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  const handleOrderClick = (orderId) => {
    navigate(`/orderDetail/${orderId}`); // Rediriger vers /orderDetail/:orderId
  };

  return (
    <div className="order-history-container">
      <h2>Mes commandes</h2>
      {Object.entries(groupedOrders).map(([year, orders]) => (
        <div key={year} className="year-section">
          <h3>{year}</h3>
          <ul>
            {orders.map((order) => (
              <li
                key={order.order_id}
                onClick={() => handleOrderClick(order.order_id)}
                className="order-item" 
              >
                <div className="order-details">
                  <p>Commande #{order.order_id} - {order.order_date}</p>
                  <p>Montant total: {parseFloat(order.total_amount).toFixed(2)} €</p>
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
