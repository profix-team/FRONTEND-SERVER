import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Toast from './components/Toast.jsx';
import Study from './Study';
import MainPage from './MainPage';
import AnalysisResultPage from './AnalysisResultPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/study" element={<Study />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/analysis" element={<AnalysisResultPage />} />
                </Routes>
                <Toast />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
