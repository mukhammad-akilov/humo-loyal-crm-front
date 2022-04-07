import React from 'react';
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../customHooks/redux";
import CanAccess from "../CanAccess/CanAccess";

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps): JSX.Element => {
    const location = useLocation();
    const userState = useAppSelector(state => state.user);

    return (
        <>
            {userState.isAuth ?
                <CanAccess
                    accessType="page"
                    route={location.pathname}
                    component={children}
                    redirectIfNoAccessRoute="/"
                />
                :
                <Navigate to="/login" />
            }
        </>
    )
}

export default PrivateRoute;