import { Outlet } from 'react-router-dom';
import Container from './container/Container';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import styles from './AppLayout.module.scss';

function AppLayout() {
    return (
        <div className={styles.appLayout}>
            <Navbar />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
