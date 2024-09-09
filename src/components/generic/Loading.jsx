import styles from './Loading.module.scss';
import { PropTypes } from 'prop-types';

function Loading({ text }) {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.ellipsesLoader}>
                <div className={styles.ellipse}></div>
                <div className={styles.ellipse}></div>
                <div className={styles.ellipse}></div>
                <div className={styles.ellipse}></div>
            </div>
            <div className={styles.loadingText}>{text}</div>
        </div>
    );
}

export default Loading;

Loading.propTypes = {
    text: PropTypes.string,
};
