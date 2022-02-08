import {lazy} from 'react';
// Main pages
export const Home = lazy(() => import('../Home/Home'));
export const NotFound = lazy(() => import('../NotFound/NotFound'));
export const Profile = lazy(() => import('../Profile/Profile'));
export const Login = lazy(() => import('../Login/Login'));
// Payment
export const CreatePayment = lazy(() => import('../CreatePayment/CreatePayment'));
// Customer
export const CreateCustomer = lazy(() => import('../CreateCustomer/CreateCustomer'));