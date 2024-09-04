import { useQuery } from '@tanstack/react-query';
import { getIndexCarouselData } from '../../services/api';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import styles from './IndexCarousel.module.scss';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

function IndexCarousel({ className }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getIndexCarouselData'],
        queryFn: getIndexCarouselData,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div className={classNames(styles.indexCarousel, className)}>
            <Splide
                options={{
                    type: 'loop',
                    autoScroll: {
                        pauseOnHover: true,
                        pauseOnFocus: false,
                        rewind: true,
                        speed: 1,
                    },
                    arrows: false,
                    pagination: false,
                    fixedWidth: '220px',
                    gap: '12px',
                }}
                extensions={{ AutoScroll }}
            >
                {data.map((exchange) => (
                    <SplideSlide key={exchange.index} className={styles.card}>
                        <h5 className={styles.header}>{exchange.index}</h5>
                        <div className={styles.headerRow}>
                            <span className={styles.headerMetrics}>
                                ${' '}
                                <span
                                    className={
                                        exchange.change >= 0
                                            ? styles.gainer
                                            : styles.loser
                                    }
                                >
                                    {exchange.change}
                                </span>{' '}
                                |{' '}
                                <span
                                    className={
                                        exchange.change >= 0
                                            ? styles.gainer
                                            : styles.loser
                                    }
                                >
                                    {exchange.changePercent}
                                </span>{' '}
                                % | {exchange.values[4].toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.chart}>
                            <AreaChart
                                width={220}
                                height={80}
                                data={getChartData(exchange)}
                                margin={{
                                    right: 15,
                                }}
                            >
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={
                                        exchange.change >= 0
                                            ? '#2ba901'
                                            : '#bd1919'
                                    }
                                    isAnimationActive={false}
                                    fill={
                                        exchange.change >= 0
                                            ? 'transparent'
                                            : 'transparent'
                                    }
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    domain={[
                                        Math.min(exchange.values),
                                        Math.max(exchange.values),
                                    ]}
                                    tick={{ fontSize: 11 }}
                                    tickFormatter={(value) =>
                                        value > 100
                                            ? Number(value.toFixed(0))
                                            : value
                                    }
                                    tickLine={false}
                                    axisLine={false}
                                />
                            </AreaChart>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );

    function getChartData(exchange) {
        return [
            {
                name: '5D',
                value: exchange.values[0],
            },
            {
                name: '4D',
                value: exchange.values[1],
            },
            {
                name: '3D',
                value: exchange.values[2],
            },
            {
                name: '2D',
                value: exchange.values[3],
            },
            {
                name: 'CD',
                value: exchange.values[4],
            },
        ];
    }
}

export default IndexCarousel;

IndexCarousel.propTypes = {
    className: PropTypes.string,
};
