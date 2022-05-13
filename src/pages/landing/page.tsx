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
        <Flex flexDirection='column' width='100%' alignItems='center' justifyContent='flex-end' bg='blue' height='100%' maxHeight='100vh'>
            <Flex style={{ position: 'absolute', top: 0 }} >
                <img src='https://pbs.twimg.com/media/EelY6rRXkAUtZHM?format=png' width='100%' />
            </Flex>
            <Flex
                style={{
                    zIndex: 1,
                    borderRadius: '50%/30px 30px 0 0',
                    boxShadow: '0px -3px 40px 15px #000000',
                }}
                flexDirection='column'
                width='100%'
                height='60%'
                maxHeight='60%'
                bg='background'
                pt='32px'
                justifyContent='space-between'
                alignItems='center'
                px={2}
            >
                <Flex flexDirection='column' alignItems='center' flex='1 1 auto'>
                    <Heading variant='heading1' textAlign='center'>Ingredient Pouch</Heading>
                    <Text variant='body' mt={1} textAlign='center'>Keeping track of all ingredients and recipes</Text>
                </Flex>

                <Flex flex='1 1 1' justifyContent='center' minHeight={0}>
                    <img src='https://i.imgur.com/Zf6gvm2.png' width='75%' style={{ objectFit: 'contain' }} />
                </Flex>

                <Flex flexDirection='column' mb={3} alignItems='center' flex='1 1 auto'>
                    <Text variant='body' mt={2}>First time? Sign up here!</Text>
                    <MButton variant='primary' mt={2} onClick={goToSignUp} width='100%' maxWidth='200px'>
                        <Text variant='body' fontWeight='500'>
                            Sign up
                        </Text>
                    </MButton>
                    <Flex mt={2} justifyContent='center'>
                        <Text variant='body' mr={1}>Not new?</Text>
                        <MButton variant='link' onClick={goToSignIn}>
                            <Text variant='body'>Click here to sign in.</Text>
                        </MButton>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
