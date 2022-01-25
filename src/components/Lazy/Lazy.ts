import {lazy} from 'react';

export const Home = lazy(() => import('../Home/Home'));
export const NotFound = lazy(() => import('../NotFound/NotFound'));

export const Profile = lazy(() => import('../Profile/Profile'));
export const Login = lazy(() => import('../Login/Login'));

// payments
export const CreatePayment = lazy(() => import('../CreatePayment/CreatePayment')); 
// customers
export const CreateCutomer = lazy(() => import('../CreateCustomer/CreateCustomer'));