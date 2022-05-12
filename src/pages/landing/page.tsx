import React, { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Redirect, useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Flex, Heading, Text } from 'rebass';
import firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';
import { FaBan, FaCheck, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { MButton, ProgressButton } from 'src/atoms';
import { useAuth } from 'src/services/auth';
import { signInWithGoogle } from 'src/services/firebase';
import { theme } from 'src/services/theme/configuration';

export const LandingPage: React.FC<{}> = () => {
    const auth = useAuth();
    const history = useHistory();
    const goToSignIn = () => history.push('/signin');
    const goToSignUp = () => history.push('/signup');

    if (!auth?.loading && !auth?.error && auth?.user) {
        return (
            <Redirect to='home' />
        );
    }

    return (
        <Flex flexDirection='column' width='100%' alignItems='center'>
            <Flex flexDirection='column' width='100%' maxWidth='600px' bg='red'>
                Test
            </Flex>
        </Flex>
    )
}
