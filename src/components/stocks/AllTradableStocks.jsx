import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllTradableStocks } from '../../services/api';
import { FixedSizeList as List } from 'react-window';
import styles from './AllTradableStocks.module.scss';
import classNames from 'classnames';

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
        return <div>Fucking wait, cunt!</div>;
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
                    .includes(searchQuery.toLowerCase())) ||
            (stock.type !== null &&
                stock.type !== undefined &&
                stock.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const Row = ({ index, style }) => (
        <div
            className={classNames(
                styles.row,
                index % 2 === 0 ? styles.even : styles.odd
            )}
            style={style}
        >
            <div className={classNames(styles.cell, styles.cell1)}>
                {filteredData[index]?.symbol}
            </div>
            <div className={classNames(styles.cell, styles.cell2)}>
                {filteredData[index]?.name}
            </div>
            <div className={classNames(styles.cell, styles.cell3)}>
                {filteredData[index]?.price}
            </div>
            <div className={classNames(styles.cell, styles.cell4)}>
                {filteredData[index]?.exchangeShortName}
            </div>
            <div className={classNames(styles.cell, styles.cell5)}>
                {filteredData[index]?.type === 'etf'
                    ? 'ETF'
                    : filteredData[index]?.type}
            </div>
        </div>
    );

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
                    Price
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
                itemCount={data.length}
                itemSize={50}
                width={'100%'}
            >
                {Row}
            </List>
        </div>
    );

    return (
        <div className={styles.allTradableStocks}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by stock symbol, name, exchange..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <VirtualizedTable />
        </div>
    );
}

export default AllTradableStocks;
