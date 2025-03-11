import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Foo } from "./pages/Foo";
import { Bar } from "./pages/Bar";

function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Foo />} />
                    <Route path="/bar" element={<Bar />} />
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;
