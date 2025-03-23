import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { Navigation } from './pages/Navigation/Navigation';
import { ObjaveContextProvider } from './contexts/ObjaveContextProvider';

import { Container } from '@mui/material';

function App() {
    return (
        <StrictMode>
            <ObjaveContextProvider>
                <BrowserRouter>
                    <Container maxWidth="md">
                        <Navigation />
                    </Container>
                </BrowserRouter>
            </ObjaveContextProvider>
        </StrictMode>
    );
}

export default App;
