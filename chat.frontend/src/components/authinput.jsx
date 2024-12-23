import PropTypes from 'prop-types';

const AuthInput = ({ name, type, placeholder, register, error }) => {
    return (
        <div className="mt-4 content-center  dark:text-dark_text_1 space-y-1">
            <label htmlFor={name} className='hidden'>{placeholder}</label>
            <input type={type} placeholder={placeholder} {...register(name)}
                className='w-full p-3 rounded dark:text-dark_bg_1 border-grey-300 border-2 border-solid'
                autoComplete='on'
            />
            {error && <p className="text-red-500 text-sm">*{error}</p>}
        </div>
    );
};

// Add PropTypes validation for the props
AuthInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default AuthInput;
