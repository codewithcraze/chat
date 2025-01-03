import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const [toggle, setToggle] = useState(savedTheme);
    useEffect(() => {
        if (toggle === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('theme', toggle);
    }, [toggle]); 

    const handleThemeChange = (event) => {
        setToggle(event.target.checked ? 'dark' : 'light');
    };
    return (
        <div>
            <div className="switch">
                <input
                    id="switch"
                    className="switch__input"
                    name="switch"
                    type="checkbox"
                    checked={toggle === 'dark'} 
                    style={{cursor: 'pointer'}}
                    onChange={handleThemeChange} 
                />
                <label className="switch__label" htmlFor="switch"></label>
            </div>
            {children} 
        </div>
    );
};



ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default ThemeProvider;
