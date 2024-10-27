// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Study from './Study';
import MainPage from './MainPage';
import AnalysisResultPage from './AnalysisResultPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/study" element={<Study />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/analysis" element={<AnalysisResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
