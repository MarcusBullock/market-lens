import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import styles from './News.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../services/api';

function News({ className }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getNews'],
        queryFn: getNews,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>ERROR</div>;
    }

    return (
        <div className={classNames(styles.news, className)}>
            <h3>Market News</h3>
            <ul>
                {data?.slice(0, 6).map((row) => (
                    <li key={row.headline}>
                        <img
                            src={row.image}
                            alt="headline pic"
                            width={200}
                            height={110}
                        />
                        <span className={styles.text}>
                            <h4>{row.headline}</h4>
                            <p>{row.summary}</p>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default News;

News.propTypes = {
    className: PropTypes.string,
};
