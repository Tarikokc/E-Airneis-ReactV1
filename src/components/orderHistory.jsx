// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../css/orderHistory.css";

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('/api/orders.php') // Appel à l'API PHP
//       .then(response => {
//         setOrders(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const groupByYear = () => {
//     const grouped = {};
//     orders.forEach(order => {
//       const year = new Date(order.order_date).getFullYear();
//       grouped[year] = grouped[year] || [];
//       grouped[year].push(order);
//     });
//     return grouped;
//   };

//   const groupedOrders = groupByYear();

//   if (loading) {
//     return <div>Chargement des commandes...</div>;
//   }

//   if (error) {
//     return <div>Erreur lors du chargement des commandes : {error.message}</div>;
//   }

//   return (
//     <div className="order-history-container">
//       <h2>Mes commandes</h2>
//       {Object.entries(groupedOrders).map(([year, orders]) => (
//         <div key={year} className="year-section">
//           <h3>{year}</h3>
//           <ul>
//             {orders.map(order => (
//               <li key={order.order_id}>
//                 <div className="order-details">
//                   <p>Commande #{order.order_id} - {order.order_date}</p>
//                   <p>Montant total: {order.total_amount} €</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default OrderHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/orderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Adaptez l'URL de votre API
        const response = await axios.get("http://localhost:8000/api/order");
        setOrders(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des commandes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Regrouper les commandes par année (si nécessaire)
  const groupedOrders = orders.reduce((acc, order) => {
    const year = order.orderDate.slice(0, 4); // Assumes orderDate is a string like "2024-01-15"
    acc[year] = acc[year] || [];
    acc[year].push(order);
    return acc;
  }, {});

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-history">
      <div className="container">
        <div className="form">
          <h2>Mes commandes</h2>

          {Object.entries(groupedOrders).map(([year, orders]) => (
            <div key={year} className="year-section">
              <h3>{year}</h3>
              <ul>
                {orders.map(order => (
                  <li key={order.orderId}>
                    <div className="order-details">
                      <h4>Commande #{order.orderId}</h4>
                      <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                      {/* ... (affichage des autres détails de la commande) ... */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
