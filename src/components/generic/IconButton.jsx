import PropTypes from 'prop-types';
import styles from './IconButton.module.scss';
import classNames from 'classnames';

const IconButton = ({ icon: Icon, onClick, label, className, ...props }) => {
    return (
        <button
            className={classNames(styles.iconButton, className)}
            onClick={onClick}
            aria-label={label}
            {...props}
        >
            <Icon />
        </button>
    );
};

IconButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
};

export default IconButton;
