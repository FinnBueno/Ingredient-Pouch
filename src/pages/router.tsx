import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Flex } from 'rebass';
import { AuthenticatedRoute, UnauthenticatedRoute } from 'src/services/auth';
import { LandingPage } from 'src/pages/landing';

export const PageManager: React.FC<{}> = () => {
    const location = useLocation();
    return (
        <Flex justifyContent='center' width='100%' height='auto' minHeight='100%'>
            <Flex flexDirection='column' width='100%' height='auto' minHeight='100%'>
                <Switch location={location}>
                    <AuthenticatedRoute path='/home' component={() => <></>} />
                    <UnauthenticatedRoute path='/' component={LandingPage} />
                </Switch>
            </Flex>
        </Flex>
    );
};
