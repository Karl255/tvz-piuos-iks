import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { Login } from './pages/Auth/Login';
import { ObjaveContextProvider } from './contexts/ObjaveContextProvider';

import { Container } from '@mui/material';

function App() {
    return (
        <StrictMode>
            <ObjaveContextProvider>
                <BrowserRouter>
                    <Container maxWidth="md">
                        <Login />
                    </Container>
                </BrowserRouter>
            </ObjaveContextProvider>
        </StrictMode>
    );
}

export default App;
