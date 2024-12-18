import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Toast from './components/Toast.jsx';
import Study from './Study';
import MainPage from './MainPage';
import AnalysisResultPage from './AnalysisResultPage';
import OAuthCallback from './components/OAuthCallback';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/study" element={<Study />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/analysis" element={<AnalysisResultPage />} />
                    <Route path="/oauth" element={<OAuthCallback />} />
                </Routes>
                <Toast />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
