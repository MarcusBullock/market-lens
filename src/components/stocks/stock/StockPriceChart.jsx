import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { StockPriceData } from '../../../constants/constants';
import styles from './StockPriceChart.module.scss';
import { format } from 'date-fns';
import { PropTypes } from 'prop-types';

function StockPriceChart() {
    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        return format(date, 'MMM yy');
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
                        Close: <span>{payload[0].value}</span>
                    </p>
                    <p>
                        Open: <span>{payload[0].payload.open}</span>
                    </p>
                    <p>
                        Open: <span>{payload[0].payload.close}</span>
                    </p>
                    <p>
                        High: <span>{payload[0].payload.high}</span>
                    </p>
                    <p>
                        Low: <span>{payload[0].payload.low}</span>
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
        payload: PropTypes.object,
        label: PropTypes.string,
    };

    return (
        <div className={styles.stockPriceChart}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={StockPriceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        interval={220}
                        dataKey="date"
                        tickFormatter={formatXAxis}
                    />
                    <YAxis domain={[100, 160]} />
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
