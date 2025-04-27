import React, { useState, createContext, useReducer } from 'react';
import { Navigation } from '../../components/Navigation/Navigation';
import { Login } from './Login';
import { Register } from './Register';

import './auth.css';
import { HorizontalDivider } from '../../components/HorizonalDivider';

export const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_USERNAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    Username: action.payload,
                },
            };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
}

export function Auth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [state, dispatch] = useReducer(authReducer, { user: null });

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {loggedIn ? (
                <Navigation setLoggedIn={setLoggedIn} />
            ) : (
                <div className="section auth">
                    <Login setLoggedIn={setLoggedIn} />
                    <HorizontalDivider margin={'1em'} color={'var(--text-darker)'} />
                    <Register />
                </div>
            )}
        </AuthContext.Provider>
    );
}
