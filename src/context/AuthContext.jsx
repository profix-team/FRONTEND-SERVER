import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookieManager } from '../hooks/useCookieManager';

const AuthContext = createContext({
    user: null,
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
    loading: true,
    toast: { show: false, message: '', type: '' },
    showToast: () => {},
    setUserInfo: () => {},
    refreshAccessToken: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const { setCookies, removeCookies, getCookies } = useCookieManager();
    const [isRefreshing, setIsRefreshing] = useState(false); // 추가: 토큰 갱신 중복 방지

    // 토큰 만료 시간 확인 함수
    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return true; // JWT 형식 검증

            const payload = JSON.parse(atob(parts[1]));
            if (!payload || !payload.exp) return true;

            // 만료 5분 전부터는 만료된 것으로 간주
            return payload.exp * 1000 - Date.now() <= 5 * 60 * 1000;
        } catch (error) {
            console.error('Token parsing error:', error);
            return true;
        }
    };

    // Access Token 갱신 함수
    const refreshAccessToken = async () => {
        if (isRefreshing) {
            return null; // 이미 갱신 중이면 중복 요청 방지
        }

        try {
            setIsRefreshing(true);
            const { refreshToken } = getCookies();

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch('http://localhost:8080/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await response.json();

            if (data.statusCode === '200') {
                setCookies(data.accessToken, data.refreshToken);
                return data.accessToken;
            }
            throw new Error('Failed to refresh token');
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            throw error;
        } finally {
            setIsRefreshing(false);
        }
    };

    // API 요청 래퍼 함수
    const authenticatedFetch = async (url, options = {}, retryCount = 0) => {
        const MAX_RETRIES = 1; // 최대 재시도 횟수를 1회로 제한
        let { accessToken } = getCookies();

        if (!accessToken) {
            throw new Error('No access token available');
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // 401 에러 시 토큰 갱신 시도는 1회만
        if ((response.status === 401 || response.status === 403) && retryCount < MAX_RETRIES) {
            try {
                accessToken = await refreshAccessToken();
                return authenticatedFetch(url, options, retryCount + 1);
            } catch (error) {
                logout(); // 토큰 갱신 실패 시 로그아웃
                throw new Error('Authentication failed');
            }
        }

        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const { accessToken } = getCookies();

            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                await fetchUserInfo(accessToken);
            } catch (error) {
                console.error('Initial auth check failed:', error);
                // 에러 발생시 쿠키만 삭제하고 추가 요청하지 않음
                removeCookies();
            }
            setLoading(false);
        };

        initializeAuth();
    }, []); // 의존성 배열 비움

    const showToast = (message, type = 'success') => {
        setToast({ show: false, message: '', type: '' });
        setTimeout(() => {
            setToast({ show: true, message, type });
        }, 100);
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    };

    // fetchUserInfo 수정
    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/user', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.statusCode === '200') {
                // name과 profileUrl만 사용하도록 수정
                const { name, profileUrl } = data.resultData;
                setUser({ name, profileUrl });
                return data;
            }
            throw new Error('Failed to fetch user info');
        } catch (error) {
            console.error('User info fetch failed:', error);
            logout();
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ member_email: email, member_password: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '서버 오류가 발생했습니다.');
            }

            const data = await response.json();

            if (data.statusCode === '200') {
                if (!data.accessToken || !data.refreshToken) {
                    throw new Error('토큰 정보가 올바르지 않습니다.');
                }
                setCookies(data.accessToken, data.refreshToken);
                setUser(data.resultData);
                showToast(`환영합니다, ${data.resultData.name}님!`);
                return true;
            } else {
                throw new Error(data.resultMsg || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            showToast(error.message || '로그인에 실패했습니다.', 'error');
            return false;
        }
    };

    const register = async (registerData) => {
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (data.statusCode === '200') {
                showToast('회원가입이 완료되었습니다!');
                return true;
            } else {
                showToast(data.resultMsg || '회원가입에 실패했습니다.', 'error');
                return false;
            }
        } catch (error) {
            console.error('Registration failed:', error);
            showToast('회원가입에 실패했습니다.', 'error');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        removeCookies();
        setIsRefreshing(false); // 리셋
    };

    const setUserInfo = (userInfo) => {
        setUser(userInfo);
        // member_name이 아닌 name으로 변경해야 함
        showToast(`환영합니다, ${userInfo.name}님!`);
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading,
        toast,
        showToast,
        setUserInfo,
        refreshAccessToken,
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

export default AuthContext;
