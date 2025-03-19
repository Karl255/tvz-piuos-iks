import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { Navigation } from './pages/Navigation/Navigation';
import { ObjaveContextProvider } from './contexts/ObjaveContextProvider';

function App() {
    return (
        <StrictMode>
            <ObjaveContextProvider>
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            </ObjaveContextProvider>
        </StrictMode>
    );
}

export default App;
