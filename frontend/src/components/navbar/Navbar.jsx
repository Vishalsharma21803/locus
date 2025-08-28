
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkLogin();

        // fires when localStorage changes in another tab or window.
        window.addEventListener('storage', checkLogin);
        return () => window.removeEventListener('storage', checkLogin);
    }, []);


    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
            if (window.innerWidth > 900) {
                setSideMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
        setSideMenuOpen(false);
    };


    return (
        <nav className={styles.navbar}>
            <div className={styles.logo} onClick={() => navigate('/')}>Canteen</div>
            {!isMobile && (
                <ul className={styles.navLinks}>
                    <li><a className={styles.navLink} href="/menu">Menu</a></li>
                </ul>
            )}
            {!isMobile && !isLoggedIn && (
                <div className={styles.authButtons}>
                    <button className={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
                    <button className={styles.signupBtn} onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            )}
            {!isMobile && isLoggedIn && (
                <div className={styles.authButtons}>
                    <button className={styles.profileBtn} onClick={() => navigate('/profile')}>Profile</button>
                    <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>
            )}
            {isMobile && (
                <span className={styles.menuIcon} onClick={() => setSideMenuOpen(true)}>
                    <Menu size={28} />
                </span>
            )}
            {isMobile && sideMenuOpen && (
                <div className={styles.sideMenu}>
                    <span className={styles.sideMenuClose} onClick={() => setSideMenuOpen(false)}>&times;</span>
                    <ul className={styles.sideMenuLinks}>
                        <li><a className={styles.sideMenuLink} href="/menu" onClick={() => setSideMenuOpen(false)}>Menu</a></li>
                    </ul>
                    {!isLoggedIn ? (
                        <div className={styles.sideMenuAuth}>
                            <button className={styles.loginBtn} onClick={() => {navigate('/login'); setSideMenuOpen(false);}}>Login</button>
                            <button className={styles.signupBtn} onClick={() => {navigate('/signup'); setSideMenuOpen(false);}}>Sign Up</button>
                        </div>
                    ) : (
                        <div className={styles.sideMenuAuth}>
                            <button className={styles.profileBtn} onClick={() => {navigate('/profile'); setSideMenuOpen(false);}}>Profile</button>
                            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;