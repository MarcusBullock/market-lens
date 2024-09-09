import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllTradableStocks } from '../../services/dashboardApi';
import { FixedSizeList as List } from 'react-window';
import styles from './AllTradableStocks.module.scss';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import Loading from '../generic/Loading';
import { Link } from 'react-router-dom';

function AllTradableStocks() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getAllTradableStocks'],
        queryFn: getAllTradableStocks,
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Loading text="Loading all global stock data..." />
            </div>
        );
    }

    if (isError) {
        return <div>Error</div>;
    }

    const filteredData = data.filter(
        (stock) =>
            (stock.symbol !== null &&
                stock.symbol !== undefined &&
                stock.symbol
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
            (stock.name !== null &&
                stock.name !== undefined &&
                stock.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (stock.exchangeShortName !== null &&
                stock.exchangeShortName !== undefined &&
                stock.exchangeShortName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
    );

    const Row = ({ index, style }) => {
        const stock = filteredData[index];
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        console.log(`/stocks/${encodeURIComponent(stock?.symbol)}`);
        return (
            <Link
                to={`/stocks/${stock?.symbol}`}
                target="_blank"
                className={classNames(
                    styles.row,
                    index % 2 === 0 ? styles.even : styles.odd
                )}
                style={style}
            >
                <div className={classNames(styles.cell, styles.cell1)}>
                    {stock?.symbol}
                </div>
                <div className={classNames(styles.cell, styles.cell2)}>
                    {stock?.name}
                </div>
                <div className={classNames(styles.cell, styles.cell3)}>
                    {stock?.price}
                </div>
                <div className={classNames(styles.cell, styles.cell4)}>
                    {stock?.exchangeShortName}
                </div>
                <div className={classNames(styles.cell, styles.cell5)}>
                    {stock?.type === 'etf' ? 'ETF' : stock?.type}
                </div>
            </Link>
        );
    };

    Row.propTypes = {
        index: PropTypes.number,
        style: PropTypes.object,
    };

    const VirtualizedTable = () => (
        <div className={styles.table}>
            <div className={styles.header}>
                <div className={classNames(styles.headerCell, styles.header1)}>
                    Symbol
                </div>
                <div className={classNames(styles.headerCell, styles.header2)}>
                    Name
                </div>
                <div className={classNames(styles.headerCell, styles.header3)}>
                    $
                </div>
                <div className={classNames(styles.headerCell, styles.header4)}>
                    Exchange
                </div>
                <div className={classNames(styles.headerCell, styles.header5)}>
                    Type
                </div>
            </div>
            <List
                className={styles.list}
                height={500}
                itemCount={filteredData.length}
                itemSize={50}
                width={'100%'}
            >
                {Row}
            </List>
        </div>
    );

    return (
        <>
            <h2>Search any stock...</h2>
            <div className={styles.allTradableStocks}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search any stock by symbol, company, exchange..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.results}>
                    Showing{' '}
                    <span className={styles.count}>
                        {filteredData.length.toLocaleString()}
                    </span>{' '}
                    tradable stock{filteredData.length === 1 ? '' : 's'}...
                </div>
                <VirtualizedTable />
            </div>
        </>
    );
}

export default AllTradableStocks;
