import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropType from "prop-types";
import CircleLoader from 'react-spinners/CircleLoader';

const AuthGuard = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
        }
    }, [user.token, navigate]); 

    if (user.token) {
        return children;
    }
    return <div className="flex justify-center items-center h-screen">
        <CircleLoader  color="#bf1d2c" size={200} />
    </div>;
};

const GuardAuthEndpoint = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.token) {
            navigate('/');
        }
    }, [user.token, navigate]); 

    if (!user.token) {
        return children;
    }
    return <div className="flex justify-center items-center h-screen">
        <CircleLoader  color="#bf1d2c" size={200}/>
    </div>;
}

AuthGuard.propTypes = {
    children: PropType.node.isRequired
}
GuardAuthEndpoint.propTypes = {
    children: PropType.node.isRequired
}

export {
    AuthGuard,
    GuardAuthEndpoint
};
