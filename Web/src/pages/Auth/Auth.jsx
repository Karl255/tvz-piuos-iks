import React, { useState, createContext } from 'react';
import { Navigation } from '../../components/Navigation/Navigation';
import { Login } from './Login';
import { Register } from './Register';

import './auth.css';
import { HorizontalDivider } from '../../components/HorizonalDivider';

export const AuthContext = createContext();

export function Auth() {
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            {loggedIn ? (
                <AuthContext.Provider value={user}>
                    <Navigation setLoggedIn={setLoggedIn} />
                </AuthContext.Provider>
            ) : (
                <div className="section auth">
                    <Login setLoggedIn={setLoggedIn} setUser={setUser} />
                    <HorizontalDivider margin={'1em'} color={'var(--text-darker)'} />
                    <Register />
                </div>
            )}
        </>
    );
}
