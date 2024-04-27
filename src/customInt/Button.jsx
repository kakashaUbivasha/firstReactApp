import PropTypes from 'prop-types';
function Button({children, onClick, additionalClasses}){
    const classNames = `btn btn-primary form-control mx-auto ${additionalClasses}`;
    return(
        <button
            className={classNames}
            style={{ width: '200px' }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    additionalClasses: PropTypes.string
};
export default Button