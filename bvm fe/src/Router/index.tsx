import {useEffect, useMemo, useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";

import {ROUTE_LIST} from "./index.utiles";
import {RouteObject, State} from "./index.types";
import {useSelector} from "react-redux";
// @ts-ignore
import Tools from "../Components/Pages/Tools/Tools";

const INITIAL_STATE = () => ({
    routeList: ROUTE_LIST(),
});

const Router = () => {

    const location = useLocation();
    const [state, setState] = useState<any>(INITIAL_STATE());
    const isLogged = useSelector((state: any) => state.auth.isLogged);
    const userRole = useSelector((state: any) => state?.auth?.userDetails?.userType);

    const getRoutes = (route: RouteObject[]) => route.filter((component) => userRole ? component.userAccess.includes(userRole) : true).map(({
                                                               path,
                                                               element: Element,
                                                               children = []
                                                           }: RouteObject, i: number) => <Route path={path}
                                                                                                element={<Element/>}
                                                                                                key={i}>
        {getRoutes(children)}
    </Route>);

    const routes = useMemo(() => getRoutes(state.routeList), [state.routeList,userRole]);

    const validateCurrentRoute = () => {
        setState(() => ({...state, routeList: ROUTE_LIST()}));
    };

    useEffect(()=>{
        // localStorage.getItem("token") && dispatch(RefreshApi());
    },[])

    useEffect(() => {
        validateCurrentRoute();
    }, [isLogged,location.pathname]);

    return (<>
        <Tools />
        <Routes>
            {routes}
            <Route
                path="*"
                element={<Navigate to={localStorage.getItem('token') ?  '/'  : '/dashboard3'} replace/>} // when we have authentication feature just replace dashboard3 routes to that login page
            />
        </Routes>
    </>)
};

export default Router;