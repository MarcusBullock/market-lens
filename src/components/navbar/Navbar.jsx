import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Container from '../container/Container';
import Logo from '../../assets/logo.png';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import IconButton from '../generic/IconButton';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('dashboard');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectTab = (tab) => {
        setSelectedTab(tab);
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
                    <div className={styles.navLinks}>
                        <Link
                            to="/stocks"
                            onClick={() => selectTab('stocks')}
                            className={classNames(
                                styles.link,
                                selectedTab === 'stocks' ? styles.active : ''
                            )}
                        >
                            Stocks
                        </Link>
                        <Link
                            to="/indices"
                            onClick={() => selectTab('indices')}
                            className={classNames(
                                styles.link,
                                selectedTab === 'indices' ? styles.active : ''
                            )}
                        >
                            Indices
                        </Link>
                        <Link
                            to="/futures"
                            onClick={() => selectTab('futures')}
                            className={classNames(
                                styles.link,
                                selectedTab === 'futures' ? styles.active : ''
                            )}
                        >
                            Futures
                        </Link>
                    </div>
                    <div className={styles.hamburger}>
                        <div>
                            <IconButton
                                icon={FaBars}
                                onClick={toggleMenu}
                                label="Menu"
                                className="menu-button"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
