import React from 'react';

export default function Product({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img 
        src={product.image_url || 'https://via.placeholder.com/250?text=No+Image'} 
        alt={product.name} 
        className="product-image" 
      />
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <button className="add-btn" onClick={() => onAddToCart(product)}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}