import { Dashboard } from "../Components/Pages/Dashboard";


export const ROUTE_LIST = () => [
    {
        name: 'Dashboard 3',
        path: '/dashboard3',
        element: Dashboard,
        userAccess: ["admin","employee"],
        authRequired: true
    },
    {
        name: 'Dashboard',
        path: '/',
        element: Dashboard,
        userAccess: ["admin","employee"],
        authRequired: false
    },
    {
        name: 'Dashboard',
        path: '/dashboard2',
        element: Dashboard,
        userAccess: ["admin","employee"],
        authRequired: false
    },

].filter(({ authRequired }) => localStorage.getItem('token') ? authRequired : !authRequired);