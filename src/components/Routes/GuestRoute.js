import React from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const GuestRoute = () => {
    const userState = useAppSelector(state => state.user);

    return !userState.isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default GuestRoute;