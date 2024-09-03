import { useQuery } from '@tanstack/react-query';
import { getTopLosers } from '../../services/api';
import { PropTypes } from 'prop-types';
import GainersLosersTable from './GainersLosersTable';
import classNames from 'classnames';
import styles from './TopLosers.module.scss';

function TopLosers({ className }) {
    const {
        data: losersData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['topLosers'],
        queryFn: getTopLosers,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <h3>Top Losers</h3>
            <div className={classNames(styles.topLosers, className)}>
                <GainersLosersTable data={losersData} isGainers={false} />
            </div>
        </div>
    );
}

export default TopLosers;

TopLosers.propTypes = {
    className: PropTypes.string,
};
