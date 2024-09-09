import AllTradableStocks from '../components/stocks/AllTradableStocks';
import styles from './Stocks.module.scss';

function Stocks() {
    return (
        <div className={styles.stocks}>
            <AllTradableStocks />
        </div>
    );
}

export default Stocks;
