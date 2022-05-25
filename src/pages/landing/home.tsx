import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Flex, Heading, Text } from 'rebass';
import 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { ProgressButton } from 'src/atoms';
import { signInWithGoogle } from 'src/services/firebase';
import { LandingStructure } from './structure';

export const LandingPage: React.FC<{}> = () => {
    const signIn = () => trackPromise(signInWithGoogle(), 'sign-in');

    return (
        <LandingStructure img='https://pbs.twimg.com/media/EelY6rRXkAUtZHM?format=png'>
            <Flex flexDirection='column' justifyContent='center' alignItems='center' flex='1 1 auto'>
                <Heading variant='heading1' textAlign='center'>Ingredient Pouch</Heading>
                <Text variant='body' mt={1} textAlign='center'>Keeping track of all ingredients and recipes</Text>
            </Flex>

            <Flex flex='1 1 1' justifyContent='center' minHeight={0}>
                <img src='https://i.imgur.com/Zf6gvm2.png' width='100%' style={{ objectFit: 'contain' }} />
            </Flex>

            <Flex flexDirection='column' mb={3} justifyContent='center' alignItems='center' flex='1 1 auto'>
                <Text variant='body' mt={2}>Click here to sign in!</Text>
                <ProgressButton variant='primary' mt={2} onClick={signIn} width='100%' maxWidth='200px' scope='sign-in'>
                    <Text verticalAlign='center' variant='body' fontWeight='500'>
                        <FaGoogle /> Sign in with Google
                    </Text>
                </ProgressButton>
            </Flex>
        </LandingStructure>
    );
}
