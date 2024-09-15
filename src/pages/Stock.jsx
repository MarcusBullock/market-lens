import { useParams } from 'react-router-dom';
import { getProfile } from '../services/stocksApi';
import styles from './Stock.module.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/generic/Loading';
import StockPriceChart from '../components/stocks/stock/StockPriceChart';
import classNames from 'classnames';
import Metrics from '../components/stocks/stock/Metrics';
import { useState, useEffect } from 'react';
import { isAfter, subDays, subMonths, subYears } from 'date-fns';

function Stock() {
    const { symbol } = useParams();

    const [selectedTimespan, setSelectedTimespan] = useState('5Y');
    const [filteredData, setFilteredData] = useState([]);

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
    } = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(symbol),
    });

    useEffect(() => {
        if (
            profileData &&
            profileData[1] !== null &&
            profileData[1] !== undefined
        ) {
            const data = profileData[1];
            setFilteredData(
                data.filter((row) => filterRow(row, selectedTimespan))
            );
        }
    }, [profileData, selectedTimespan]);

    if (isProfileLoading) {
        return (
            <div className={styles.loading}>
                <Loading text="Loading all global stock data..." />
            </div>
        );
    }

    if (isProfileError || profileData == null || profileData?.length < 1) {
        return (
            <div>
                Sorry I&apos;m on a free API plan and can only do American
                stocks!
            </div>
        );
    }

    const {
        price,
        volAvg,
        changes,
        mktCap,
        range,
        companyName,
        //   currency,
        //   exchange,
        //   exchangeShortName,
        //   industry,
        //   website,
        //   description,
        //   ceo,
        //   sector,
        //   fullTimeEmployees,
        //   city,
        //   image,
        //   isEtf,
        //   isActivelyTrading,
        //   isAdr,
        //   isFund,
    } = profileData[0][0];

    const previousPrice = price - changes;
    const changesPercent = (changes / previousPrice) * 100;

    function filterRow(row, timespan) {
        const today = new Date();
        const rowDate = new Date(row.date);
        switch (timespan) {
            case '5Y':
                return isAfter(rowDate, subYears(today, 5));
            case '1Y':
                return isAfter(rowDate, subYears(today, 1));
            case '6M':
                return isAfter(rowDate, subMonths(today, 6));
            case '3M':
                return isAfter(rowDate, subMonths(today, 3));
            case '1M':
                return isAfter(rowDate, subMonths(today, 1));
            case '5D':
                return isAfter(rowDate, subDays(today, 5));
            default:
                throw new Error('Woops, bad timespan');
        }
    }

    return (
        <div className={styles.stock}>
            <h1>
                {companyName} Common Stock ({symbol})
            </h1>
            <div className={styles.headerRow}>
                <span className={styles.headerPrice}>
                    {price.toLocaleString()}
                </span>
                <span
                    className={classNames(
                        styles.headerChange,
                        changes >= 0 ? styles.green : styles.red
                    )}
                >
                    {changes} ({changesPercent.toFixed(2)}%)
                </span>
                <div className={styles.actions}>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '5D' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('5D')}
                    >
                        5D
                    </button>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '1M' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('1M')}
                    >
                        1M
                    </button>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '3M' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('3M')}
                    >
                        3M
                    </button>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '6M' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('6M')}
                    >
                        6M
                    </button>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '1Y' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('1Y')}
                    >
                        1Y
                    </button>
                    <button
                        className={classNames(
                            styles.action,
                            selectedTimespan === '5Y' ? styles.selected : ''
                        )}
                        onClick={() => setSelectedTimespan('5Y')}
                    >
                        5Y
                    </button>
                </div>
            </div>
            <StockPriceChart timespan={selectedTimespan} data={filteredData} />
            <Metrics
                price={price}
                volAvg={volAvg}
                mktCap={mktCap}
                range={range}
            />
            {/* <div>{description}</div> */}
        </div>
    );
}

export default Stock;
