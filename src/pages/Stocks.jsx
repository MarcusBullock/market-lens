import AllTradableStocks from '../components/stocks/AllTradableStocks';
import styles from './Stocks.module.scss';

function Stocks() {
    return (
        <div className={styles.stocks}>
            <h2>Search any stock...</h2>
            <AllTradableStocks />
        </div>
    );
}

export default Stocks;
