import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation/Navigation';

export function Login() {
    const [loggedIn, setLoggedIn] = useState(false);
    function login() {
        return setLoggedIn(true);
    }
    return (
        <>
            {loggedIn ? (
                <Navigation />
            ) : (
                <Container maxWidth="sm" className="section">
                    <h2>Login</h2>
                    <Button onClick={() => login()}>Login</Button>
                </Container>
            )}
        </>
    );
}
