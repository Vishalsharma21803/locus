import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import MenuCard from "../../components/menu/MenuCard";

const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || 'user';
  } catch {
    return 'user';
  }
};


const Menu = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    setRole(getUserRole());
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load menu');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.itemId === product._id);
      if (exists) {
        return prev.map(item => item.itemId === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { itemId: product._id, name: product.name, quantity: 1, price: product.price }];
    });
  };

  const handleAddProduct = () => {
    // Show modal or redirect to add product page (to be implemented)
    alert('Add Product (Admin only)');
  };

  return (
    <div className={styles.menuWrapper}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className={styles.menuTitle}>Menu</h2>
        {role === 'admin' && (
          <button className={styles.addButton} onClick={handleAddProduct} style={{ minWidth: 120 }}>
            + Add Product
          </button>
        )}
      </div>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <div className={styles.menuGrid}>
          {products.map(product => (
            <MenuCard
              key={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              imageUrl={product.imageUrl}
              description={product.description}
              onAdd={role === 'admin' ? handleAddProduct : () => addToCart(product)}
              disabled={role === 'admin'}
              isAdmin={role === 'admin'}
            />
          ))}
        </div>
      )}
      {role !== 'admin' && (
        <div className={styles.cartBox}>
          <h3>Your Cart</h3>
          {cart.length === 0 ? <p>No items in cart.</p> : (
            <ul>
              {cart.map(item => (
                <li key={item.itemId}>
                  {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          )}
          {/* Order button will be added after login/signup integration */}
        </div>
      )}
    </div>
  );
};

export default Menu;
