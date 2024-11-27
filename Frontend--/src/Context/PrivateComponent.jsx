import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function PrivateComponent({ element: Component }) {
    const { user, accessToken, refreshToken } = useContext(AuthContext);

    if ( !user || !accessToken || !refreshToken) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Component />
        </div>
    );
};

export default PrivateComponent;
