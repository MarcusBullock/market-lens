import { PropTypes } from 'prop-types';
import styles from './Metrics.module.scss';

function Metrics({ price, range, mktCap, volAvg }) {
    return (
        <div className={styles.metrics}>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Previous close</div>
                <div className={styles.stockDetailValue}>
                    {(price - 0.752).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Day&apos;s range</div>
                <div className={styles.stockDetailValue}>{range}</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>
                    Market cap (intra-day)
                </div>
                <div className={styles.stockDetailValue}>
                    {mktCap.toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Earnings date</div>
                <div className={styles.stockDetailValue}>
                    28 Oct 24 - 1 Nov 24
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Open</div>
                <div className={styles.stockDetailValue}>
                    {(price - 0.152).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>52-week range</div>
                <div className={styles.stockDetailValue}>
                    {(price - 5.152).toLocaleString()} -{' '}
                    {(price + 35.661).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Beta (5Y monthly)</div>
                <div className={styles.stockDetailValue}>
                    {(price - 5.152).toLocaleString()} -{' '}
                    {(price + 35.661).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>
                    Forward dividend & yield
                </div>
                <div className={styles.stockDetailValue}>6.68 (2.31%)</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Bid</div>
                <div className={styles.stockDetailValue}>287.87 x 1000</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Volume</div>
                <div className={styles.stockDetailValue}>
                    {(volAvg - 20).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>PE ratio (TTM)</div>
                <div className={styles.stockDetailValue}>25.53</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Ex-dividend date</div>
                <div className={styles.stockDetailValue}>3 Sept 2024</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Ask</div>
                <div className={styles.stockDetailValue}>291.42 x 800</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>Avg. volume</div>
                <div className={styles.stockDetailValue}>
                    {volAvg.toFixed(2).toLocaleString()}
                </div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>EPS (TTM)</div>
                <div className={styles.stockDetailValue}>11.41</div>
            </div>
            <div className={styles.stockDetail}>
                <div className={styles.stockDetailLabel}>1y target est</div>
                <div className={styles.stockDetailValue}>
                    {(price + 70.5).toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default Metrics;

Metrics.propTypes = {
    price: PropTypes.number,
    range: PropTypes.string,
    mktCap: PropTypes.number,
    volAvg: PropTypes.number,
};
