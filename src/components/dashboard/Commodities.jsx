import { CommoditiesData } from '../../constants/constants';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import styles from './Commodities.module.scss';

function Commodities({ className }) {
    return (
        <div className={classNames(styles.commodities, className)}>
            <h3>Commodities</h3>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Commodities</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CommoditiesData.map((data) => (
                            <tr key={data.commodity}>
                                <td>{data.commodity}</td>
                                <td>
                                    {data.currencySymbol} {data.lastPrice}
                                </td>
                                <td
                                    className={
                                        data.todayChange >= 0
                                            ? styles.gainer
                                            : styles.loser
                                    }
                                >
                                    {data.todayChange >= 0 ? '+' : ''}
                                    {data.todayChange}
                                </td>
                                <td
                                    className={
                                        data.todayChange >= 0
                                            ? styles.gainer
                                            : styles.loser
                                    }
                                >
                                    {data.todayChange >= 0 ? '+' : ''}
                                    {data.todayChangePercent}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Commodities;

Commodities.propTypes = {
    className: PropTypes.string,
};
