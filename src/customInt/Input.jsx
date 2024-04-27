import PropTypes from 'prop-types';
function Input({ inputType, placeholder, onChange }){
    return (
        <input
            type={inputType}
            placeholder={placeholder}
            onChange={onChange}
            className="p-2 border border-primary rounded-pill form-control mb-3 focus-ring"
            style={{ width: '400px' }}
        />
    );

}
Input.propTypes= {
    inputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
export default Input