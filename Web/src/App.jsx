import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/material';
import { Auth } from './pages/Auth/Auth';

const queryClient = new QueryClient();

function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Container maxWidth="md">
                        <Auth />
                    </Container>
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
