import { CurrencyData } from '../../constants/constants';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import styles from './Currencies.module.scss';

function Currencies({ className }) {
    return (
        <div className={classNames(styles.currencies, className)}>
            <h3>Currencies</h3>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>EUR</th>
                            <th>JPY</th>
                            <th>GBP</th>
                            <th>USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CurrencyData.map((data) => (
                            <tr key={data.label}>
                                <td>{data.label}</td>
                                <td>{data.eur.toFixed(4)}</td>
                                <td>{data.jpy.toFixed(4)}</td>
                                <td>{data.gbp.toFixed(4)}</td>
                                <td>{data.usd.toFixed(4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Currencies;

Currencies.propTypes = {
    className: PropTypes.string,
};
