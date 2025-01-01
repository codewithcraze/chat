import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropType from "prop-types";
import SyncLoader from 'react-spinners/SyncLoader';

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
        <SyncLoader  color="#bf1d2c"  />
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
        <SyncLoader  color="#bf1d2c" />
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
