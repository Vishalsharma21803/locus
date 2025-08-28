
import React from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.landingPageWrapper}>
            <div className={styles.contentBox}>
                <h1 className={styles.title}>Welcome to the Canteen Ordering System</h1>
                <p className={styles.subtitle}>
                    Experience hassle-free online ordering at our canteen! Browse a live menu with real-time stock counts, place your order, and your items are instantly reserved. If payment or pickup isn't completed within 15 minutes, your order is auto-cancelled and stock is restored for others. Enjoy a secure, transparent, and efficient canteen experience with order history and instant notifications.
                </p>
                <div className={styles.buttonGroup}>
                    <button className={styles.navButton} onClick={() => navigate('/menu')}>Get Started</button>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;