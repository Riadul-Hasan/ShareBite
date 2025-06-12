import React, { use } from 'react';

import { Navigate } from 'react-router';

import Loading from '../components/Loading';
import { AuthContext } from './AuthProvider';







const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/login"></Navigate>

};

export default PrivateRoute;