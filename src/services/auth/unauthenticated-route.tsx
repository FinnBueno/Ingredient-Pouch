import React from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { useAuth } from './context';

/**
 * This route only works if the user is not authenticated
 */
export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = (props) => {
    const auth = useAuth();

    return !auth?.user ? (
        <Route
            path={props.path}
            component={props.component}
        />
    ) : (
        <Redirect to='/home' />
    );
};

interface UnauthenticatedRouteProps {
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
