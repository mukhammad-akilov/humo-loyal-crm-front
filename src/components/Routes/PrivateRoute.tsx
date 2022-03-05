import React, {ReactNode} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {useAppSelector} from "../../hooks/redux";

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps): JSX.Element => {
    const userState = useAppSelector(state => state.user);

    return userState.isAuth ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;