import React, { createContext, useState, useContext, useEffect } from 'react';

// Context 생성을 최상단으로 이동
const AuthContext = createContext({
    user: null,
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
    loading: true,
    toast: { show: false, message: '', type: '' },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 토큰 확인
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: 실제 구현시에는 서버에 토큰 유효성 확인 필요
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    };

    const login = async (email, password) => {
        try {
            // TODO: 실제 API 연동
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();

            // 임시 로그인 처리 (실제 구현시 삭제)
            const mockUserData = {
                id: '1',
                name: email.split('@')[0],
                email,
                token: 'mock-jwt-token',
            };

            localStorage.setItem('token', mockUserData.token);
            localStorage.setItem('userData', JSON.stringify(mockUserData));
            setUser(mockUserData);
            showToast(`환영합니다, ${mockUserData.name}님!`);
            return true;
        } catch (error) {
            showToast('로그인에 실패했습니다.', 'error');
            return false;
        }
    };

    const register = async (email, password, name) => {
        try {
            // TODO: 실제 API 연동
            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password, name })
            // });
            // const data = await response.json();

            // 임시 회원가입 처리 (실제 구현시 삭제)
            const mockUserData = {
                id: '1',
                name,
                email,
                token: 'mock-jwt-token',
            };

            localStorage.setItem('token', mockUserData.token);
            localStorage.setItem('userData', JSON.stringify(mockUserData));
            setUser(mockUserData);
            showToast('회원가입이 완료되었습니다!');
            return true;
        } catch (error) {
            showToast('회원가입에 실패했습니다.', 'error');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUser(null);
        showToast('로그아웃되었습니다.');
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading,
        toast,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
