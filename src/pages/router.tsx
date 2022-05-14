import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { Flex } from 'rebass';
import { AuthenticatedRoute, UnauthenticatedRoute } from 'src/services/auth';
import { LandingPage } from 'src/pages/landing';
import { NavigationBar } from './navbar';

export const PageManager: React.FC<{}> = () => {
    const location = useLocation();
    return (
        <Flex justifyContent='center' width='100%' height='auto' minHeight='100%'>
            <Flex flexDirection='column' width='100%' height='auto' minHeight='100%'>
                <Switch location={location}>
                    <AuthenticatedRoute path='/home' component={NavigationBar} />
                    <UnauthenticatedRoute path='/' component={LandingPage} />
                </Switch>
            </Flex>
        </Flex>
    );
};
