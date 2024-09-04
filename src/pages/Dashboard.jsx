import Commodities from '../components/dashboard/Commodities';
import Currencies from '../components/dashboard/Currencies';
import IndexCarousel from '../components/dashboard/IndexCarousel';
import News from '../components/dashboard/News';
import SectorPerformance from '../components/dashboard/SectorPerformance';
import TopGainers from '../components/dashboard/TopGainers';
import TopLosers from '../components/dashboard/TopLosers';
import styles from './Dashboard.module.scss';

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <IndexCarousel />
            <div className={styles.gainersLosers}>
                <TopGainers />
                <TopLosers />
            </div>
            <News className={styles.news} />
            <div className={styles.general}>
                <Currencies className={styles.currencies} />
                <SectorPerformance className={styles.sector} />
                <Commodities className={styles.commodities} />
            </div>
        </div>
    );
}

export default Dashboard;
