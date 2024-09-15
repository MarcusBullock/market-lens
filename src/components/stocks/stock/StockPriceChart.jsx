import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { PropTypes } from 'prop-types';
import styles from './StockPriceChart.module.scss';

function StockPriceChart({ data, timespan }) {
    const minPrice = Math.min(...data.map((row) => row.low));
    const maxPrice = Math.max(...data.map((row) => row.high));
    const yAxisDomain = [
        Math.floor(minPrice) < 0 ? 0 : Math.floor(minPrice),
        Math.ceil(maxPrice),
    ];

    const xAxisInterval = () => {
        const dataLength = data.length;
        switch (timespan) {
            case '5Y':
                return dataLength / 182;
            case '1Y':
                return dataLength / 37;
            case '6M':
                return dataLength / 18;
            case '3M':
                return dataLength / 6;
            case '1M':
                return dataLength / 3;
            case '5D':
                return dataLength / 1;
            default:
                return 10;
        }
    };

    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        return format(
            date,
            timespan === '5D' ||
                timespan === '1M' ||
                timespan === '3M' ||
                timespan === '6M'
                ? 'd MMM yy'
                : 'MMM yy'
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className={styles.customTooltip}
                    style={{
                        backgroundColor: 'rgb(242, 223, 206)',
                        border: '2px solid #3a3939',
                        padding: '12px',
                        borderRadius: '25px',
                    }}
                >
                    <p>
                        Date: <span>{format(label, "d MMM ''yy")}</span>
                    </p>
                    <p>
                        Close: <span>{payload[0].value.toFixed(2)}</span>
                    </p>
                    <p>
                        Open: <span>{payload[0].payload.open.toFixed(2)}</span>
                    </p>
                    <p>
                        Open: <span>{payload[0].payload.close.toFixed(2)}</span>
                    </p>
                    <p>
                        High: <span>{payload[0].payload.high.toFixed(2)}</span>
                    </p>
                    <p>
                        Low: <span>{payload[0].payload.low.toFixed(2)}</span>
                    </p>
                    <p>
                        Volume:{' '}
                        <span>
                            {payload[0].payload.volume.toLocaleString()}
                        </span>
                    </p>
                </div>
            );
        }

        return null;
    };

    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        payload: PropTypes.array,
        label: PropTypes.string,
    };

    return (
        <div className={styles.stockPriceChart}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        interval={xAxisInterval}
                        dataKey="date"
                        tickFormatter={formatXAxis}
                    />
                    <YAxis domain={yAxisDomain} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        dot={false}
                        stroke="#a400e0"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockPriceChart;

StockPriceChart.propTypes = {
    timespan: PropTypes.string,
    data: PropTypes.array,
};
