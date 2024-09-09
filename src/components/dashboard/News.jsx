import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import styles from './News.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../services/dashboardApi';

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

    function stripHtml(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    }

    return (
        <div className={classNames(styles.news, className)}>
            <h3>Market News</h3>
            <ul>
                {data.content.map((row) => (
                    <li key={row.title}>
                        <img
                            src={row.image}
                            alt="headline pic"
                            width={200}
                            height={110}
                        />
                        <a href={row.link} target="_blank" rel="noreferrer">
                            <span className={styles.text}>
                                <h4 className={styles.title}>{row.title}</h4>
                                <p>{stripHtml(row.content)}</p>
                            </span>
                        </a>
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
