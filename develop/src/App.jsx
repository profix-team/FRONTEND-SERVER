// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Study from './Study';
import MainPage from './MainPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/study" element={<Study />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
