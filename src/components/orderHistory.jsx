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

import React from 'react';
import '../css/orderHistory.css'; // Assurez-vous d'avoir ce fichier CSS

function OrderHistory() {
  // Données de commandes fictives (remplacez par vos données réelles)
  const groupedOrders = {
    2024: [
      {
        orderId: 12345,
        orderDate: new Date('2024-01-15'),
        totalAmount: 159.99,
        products: [
          { productId: 1, productName: 'Chaise design', quantity: 2, unitPrice: 79.99 },
        ],
      },
      {
        orderId: 67890,
        orderDate: new Date('2024-03-22'),
        totalAmount: 89.50,
        products: [
          { productId: 2, productName: 'Lampe de table', quantity: 1, unitPrice: 89.50 },
        ],
      },
    ],
    2023: [
      {
        orderId: 24680,
        orderDate: new Date('2023-11-08'),
        totalAmount: 235.20,
        products: [
          { productId: 3, productName: 'Canapé', quantity: 1, unitPrice: 235.20 },
        ],
      },
    ],
  };

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
                      <p>Date: {order.orderDate.toLocaleDateString()}</p>
                      <p>Montant total: {order.totalAmount.toFixed(2)} €</p>
                      <ul>
                        {order.products.map(product => (
                          <li key={product.productId}>
                            {product.productName} x {product.quantity}
                          </li>
                        ))}
                      </ul>
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
