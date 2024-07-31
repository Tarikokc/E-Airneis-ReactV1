import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/OrderDetail.css";

function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "/img/";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/${orderId}`
        );
        setOrder(response.data);
      } catch (err) {
        setError("Erreur lors du chargement de la commande : " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Chargement de la commande...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!order) {
    return <div>La commande n'a pas été trouvée.</div>;
  }

  return (
    <div className="order-detail-container">
      <h2>Détails de la commande #{orderId}</h2>

      <h3>Informations client</h3>
      <p>
        Nom : {order.user.firstName} {order.user.lastName}
      </p>
      <p>Email : {order.user.email}</p>

      <h3>Panier</h3>
      <ul className="product-list">
        {order.orderDetails.map((detail) => (
          <li key={detail.product.productId} className="detail-item">
            {detail.product.productPhotos &&
              detail.product.productPhotos.length > 0 && (
                <img
                  src={`${baseUrl}${detail.product.productPhotos[0].photoUrl}`} //
                  alt={detail.product.nom}
                  className="product-image"
                />
              )}
            <div className="product-details">
              <h4>{detail.product.nom}</h4>
              <p>Description: {detail.product.description}</p>
              <p>Quantité: {detail.quantity}</p>
              <p>
                Prix unitaire: {parseFloat(detail.product.prix).toFixed(2)} €
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Livraison</h3>
      {order.user.address ? (
        <p>Adresse : {order.user.address}</p>
      ) : (
        <p>Adresse non renseignée</p>
      )}
      {order.shippingCodePostal ? (
        <p>Code postal : {order.shippingCodePostal}</p>
      ) : (
        <p>Code postal non renseigné</p>
      )}

      <h3>Facturation</h3>
      {order.user.paymentMethod ? (
        <p>Moyen de Paiement : {order.user.paymentMethod}</p>
      ) : (
        <p>Moyen de paiement non renseignée</p>
      )}

      <h3>Paiement</h3>
      <p>Statut du paiement : Confirmé</p>

      {order.orderDetails.map((detail) => (
        <p key={detail.product.productId}>
          Montant payé ({detail.product.nom}):{" "}
          {(detail.quantity * detail.product.prix).toFixed(2)} €
        </p>
      ))}
    </div>
  );
}

export default OrderDetail;
