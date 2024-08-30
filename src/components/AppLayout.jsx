import { Outlet } from 'react-router-dom';
import Container from './container/Container';
import Navbar from './navbar/Navbar';

function AppLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </>
    );
}

export default AppLayout;
