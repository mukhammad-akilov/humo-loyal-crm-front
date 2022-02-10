import  {ReactNode} from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import {useAppSelector} from "../../hooks/redux";

interface GuestRouteProps {
    children: ReactNode
}

const GuestRoute = ({children}: GuestRouteProps): JSX.Element => {
    const userState = useAppSelector(state => state.user);

    return !userState.isAuth ? <>{children}</> : <Navigate to="/" />;
}

export default GuestRoute;