import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { Flex, Heading } from "rebass";
import { SyncLoader } from 'react-spinners';

export interface SignedInUser {
    uid: string;
}

export type Auth = {
    loading: boolean;
    error?: boolean;
    user?: SignedInUser;
} | undefined;

export const AuthContext = React.createContext<Auth>({ loading: true });

export const AuthProvider: React.FC<{}> = (props) => {

    const [user, setUser] = useState<SignedInUser | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const authStateChanged = (fbUser: firebase.User | null) => {
        console.log(fbUser);
        setUser(fbUser as SignedInUser);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        // set a function to run when auth state changes (this includes the initial state change)
        firebase.app().auth().onAuthStateChanged(authStateChanged, () => setError(true));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
            }}
        >
            {loading ? <LoadingPage /> : (
                error ? <ErrorPage /> : props.children
            )}
        </AuthContext.Provider>
    );
}

const ErrorPage: React.FC<{}> = () => (
    <Heading variant='heading1'>Error</Heading>
);

const LoadingPage: React.FC<{}> = () => (
    <Flex style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: -40 / 2,
        marginLeft: -108 / 2,
    }} justifyContent='center' alignItems='center'>
        <SyncLoader size={32} loading />
    </Flex>
);

export const useAuth = () => useContext(AuthContext);
