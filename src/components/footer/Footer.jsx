import Logo from '../../assets/logo.png';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <img src={Logo} className={styles.img} alt="logo" />
                <div>© Copyright 2024</div>
            </div>
            <span>
                This website is a demo, please don&apos;t use any of this
                information for commercial purposes.
            </span>
        </footer>
    );
}

export default Footer;
