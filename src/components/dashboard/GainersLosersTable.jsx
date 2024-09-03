import styles from './GainersLosersTable.module.scss';
import { PropTypes } from 'prop-types';

function GainersLosersTable({ data, isGainers }) {
    return (
        <div className={styles.gainersLosersTable}>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.symbol}>
                            <td>{row.symbol}</td>
                            <td>{row.name}</td>
                            <td>${row.price}</td>
                            <td
                                className={
                                    isGainers ? styles.gainer : styles.loser
                                }
                            >
                                {isGainers ? '+' : ''}
                                {row.change}
                            </td>
                            <td
                                className={
                                    isGainers ? styles.gainer : styles.loser
                                }
                            >
                                {row.changesPercentage}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GainersLosersTable;

GainersLosersTable.propTypes = {
    data: PropTypes.array,
    isGainers: PropTypes.bool,
};
