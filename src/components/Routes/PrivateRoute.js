import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const PrivateRoute = () => {
    const userState = useAppSelector(state => state.user);

    return userState.isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;