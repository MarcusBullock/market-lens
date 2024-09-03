import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { AreaChart, XAxis, YAxis, Area } from 'recharts';
import { getIndexCarouselData } from '../../services/api';
import classNames from 'classnames';
import styles from './IndexCarousel.module.scss';

function IndexCarousel({ className }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getIndexCarouselData'],
        queryFn: getIndexCarouselData,
    });

    const [isPaused, setIsPaused] = useState(false);

    const handleMouseOver = () => {
        setIsPaused(true);
    };

    const handleMouseOut = () => {
        setIsPaused(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

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
                name: '',
                value: exchange.values[4],
            },
        ];
    }

    return (
        <div className={classNames(styles.conveyerContainer, className)}>
            <ul
                className={classNames(
                    styles.conveyorList,
                    isPaused ? styles.paused : styles.running
                )}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {data.map((exchange) => (
                    <li key={exchange.index}>
                        {exchange.index}
                        <AreaChart
                            width={200}
                            height={100}
                            data={getChartData(exchange)}
                        >
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={
                                    exchange.change >= 0 ? '#02cf10' : '#db0808'
                                }
                                fill={
                                    exchange.change >= 0 ? '#02cf10' : '#db0808'
                                }
                            />
                            <XAxis dataKey="name" />
                            <YAxis
                                domain={[
                                    Math.min(exchange.values),
                                    Math.max(exchange.values),
                                ]}
                            />
                        </AreaChart>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IndexCarousel;

IndexCarousel.propTypes = {
    className: PropTypes.string,
};
