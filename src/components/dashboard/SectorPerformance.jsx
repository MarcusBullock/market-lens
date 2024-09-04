import classNames from 'classnames';
import styles from './SectorPerformance.module.scss';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getSectorPerformance } from '../../services/api';

function SectorPerformance({ className }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getSectorPerformance'],
        queryFn: getSectorPerformance,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>ERROR</div>;
    }

    function parseChangePercentage(changePercentage) {
        let formattedStr = changePercentage.replace('%', '');
        return parseFloat(formattedStr);
    }

    const sortedData = [...data].sort((a, b) => {
        return (
            parseChangePercentage(b.changesPercentage) -
            parseChangePercentage(a.changesPercentage)
        );
    });

    function getString(changePercentage, removeDash) {
        let formattedStr = changePercentage.replace('%', '');
        if (formattedStr.startsWith('-') && removeDash) {
            formattedStr = formattedStr.substring(1);
        }
        return formattedStr;
    }

    return (
        <div className={classNames(styles.sectorPerformance, className)}>
            <h3>Sector Performance</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Change %</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row) => (
                        <tr key={row.sector}>
                            <td>{row.sector}</td>
                            <td
                                className={
                                    parseChangePercentage(
                                        row.changesPercentage
                                    ) >= 0
                                        ? styles.gainer
                                        : styles.loser
                                }
                            >
                                {getString(row.changesPercentage, true)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SectorPerformance;

SectorPerformance.propTypes = {
    className: PropTypes.string,
};
