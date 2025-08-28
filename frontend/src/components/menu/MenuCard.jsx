import React from 'react';
import styles from './MenuCard.module.css';

const MenuCard = ({ name, price, stock, imageUrl, description, onAdd, disabled, isAdmin }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imageUrl} alt={name} className={styles.image} />
        {stock === 0 && <span className={styles.outOfStock}>Out of Stock</span>}
      </div>
      <div className={styles.infoBox}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.details}>
          <span className={styles.price}>₹{price}</span>
          <span className={styles.stock}>Stock: {stock}</span>
        </div>
        {isAdmin ? (
          <button
            className={styles.addButton}
            onClick={onAdd}
            style={{ background: 'linear-gradient(90deg, #2980b9 0%, #6dd5fa 100%)' }}
          >
            Edit Product
          </button>
        ) : (
          <button
            className={styles.addButton}
            onClick={onAdd}
            disabled={disabled || stock === 0}
          >
            {stock === 0 ? 'Out of Stock' : <span><span role="img" aria-label="cart">🛒</span> Add to Cart</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
