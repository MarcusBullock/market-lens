import { useQuery } from '@tanstack/react-query';
import { getTopGainers } from '../services/api';
import styles from './Dashboard.module.scss';

function Dashboard() {
    const {
        data: gainersData,
        error,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['topGainers'],
        queryFn: getTopGainers,
    });

    console.log(gainersData);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.gainers}>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Change Percent</th>
                    </tr>
                </thead>
                <tbody>
                    {gainersData.map((x) => (
                        <tr key={x.symbol}>
                            <td>{x.symbol}</td>
                            <td>{x.name}</td>
                            <td>{x.price}</td>
                            <td>{x.change}</td>
                            <td>{x.changesPercentage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
