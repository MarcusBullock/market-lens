import IndexCarousel from '../components/dashboard/IndexCarousel';
import TopGainers from '../components/dashboard/TopGainers';
import TopLosers from '../components/dashboard/TopLosers';
import styles from './Dashboard.module.scss';

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <IndexCarousel className={styles.indexCarousel} />
            <TopGainers className={styles.topGainers} />
            <TopLosers className={styles.topLosers} />
        </div>
    );
}

export default Dashboard;
