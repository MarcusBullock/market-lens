import { useQuery } from '@tanstack/react-query';
import { getTopGainers } from '../../services/api';
import { string } from 'prop-types';
import GainersLosersTable from './GainersLosersTable';
import classNames from 'classnames';
import styles from './TopGainers.module.scss';

function TopGainers({ className }) {
    const {
        data: gainersData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['topGainers'],
        queryFn: getTopGainers,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <h3>Top Gainers</h3>
            <div className={classNames(styles.topGainers, className)}>
                <GainersLosersTable data={gainersData} isGainers={true} />
            </div>
        </div>
    );
}

export default TopGainers;

TopGainers.propTypes = {
    className: string,
};
