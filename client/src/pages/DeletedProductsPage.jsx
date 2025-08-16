import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const DeletedProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    axios.get('/api/profile/my-products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("❌ Failed to fetch", err));
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/profile/delete/${productId}`);
      setProducts(products.filter(item => item._id !== productId));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("❌ Delete failed", err);
    }
  };

  return (
    <div className="profile-container">
      <h2>🗑️ Your Uploaded Products</h2>
      {products.map(item => (
        <div key={item._id} className="product-card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <button onClick={() => setConfirmDeleteId(item._id)}>Delete Item</button>

          {confirmDeleteId === item._id && (
            <div className="popup-confirm">
              <p>Are you sure you want to delete this product?</p>
              <button onClick={() => handleDelete(item._id)}>Yes</button>
              <button onClick={() => setConfirmDeleteId(null)}>No</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeletedProductsPage;
