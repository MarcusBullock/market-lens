import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/Container';
import Logo from '../../assets/logo.png';
import styles from './Navbar.module.scss';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={styles.navbar}>
            <Container>
                <div className={styles.navbarItems}>
                    <Link to="/dashboard">
                        <div className={styles.logo}>
                            <img src={Logo} className={styles.img} alt="logo" />
                        </div>
                    </Link>
                    <div
                        className={`${styles.navLinks} ${
                            isOpen ? styles.active : ''
                        }`}
                    >
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/stocks">Stocks</Link>
                        <Link to="/indices">Indices</Link>
                        <Link to="/futures">Futures</Link>
                    </div>
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/stocks">Stocks</Link>
                        <Link to="/indices">Indices</Link>
                        <Link to="/futures">Futures</Link>
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
