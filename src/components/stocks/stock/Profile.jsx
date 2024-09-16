import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Profile.module.scss';
import { PropTypes } from 'prop-types';

function Profile({ data, className }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    console.log(data);

    return (
        <div className={className}>
            <AnimatePresence>
                {isCollapsed && (
                    <div className={styles.see} onClick={toggleCollapse}>
                        See the full company profile for {data.companyName}
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        className={styles.profile}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <h2>{data.companyName}</h2>
                        <div className={styles.content}>
                            <p>{data.description}</p>
                            <div className={styles.metrics}>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Symbol
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.symbol}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Currency
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.currency}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        CUSIP
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.cusip}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Country
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.country}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        City
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.city}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Industry
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.industry}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Sector
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.sector}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Exchange
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.exchangeShortName}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        CEO
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.ceo}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Employees
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.fullTimeEmployees}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        IPO date
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        {data.ipoDate}
                                    </div>
                                </div>
                                <div className={styles.stockDetail}>
                                    <div className={styles.stockDetailLabel}>
                                        Website
                                    </div>
                                    <div className={styles.stockDetailValue}>
                                        <a href={data.website} target="_blank">
                                            Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className={styles.collapseBtn}
                            onClick={toggleCollapse}
                        >
                            {isCollapsed ? 'Expand' : 'Collapse'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Profile;

Profile.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
};
