import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCookieManager } from '../hooks/useCookieManager';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const { setUserInfo, showToast } = useAuth();
    const { setCookies } = useCookieManager();

    useEffect(() => {
        let isSubscribed = true;

        const handleCallback = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const accessToken = urlParams.get('accessToken');
                const refreshToken = urlParams.get('refreshToken');
                const error = urlParams.get('error');

                if (error) {
                    throw new Error(error);
                }

                if (!accessToken || !refreshToken) {
                    throw new Error('로그인 정보를 받아오지 못했습니다.');
                }

                console.log('Received tokens:', { accessToken, refreshToken }); // 토큰 확인용 로그

                setCookies(accessToken, refreshToken);
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

                console.log('Sending request to:', `${API_BASE_URL}/auth/user`);
                console.log('With headers:', {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                });

                const response = await fetch(`${API_BASE_URL}/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log('Response status:', response.status);
                console.log('Response headers:', [...response.headers.entries()]);

                if (!response.ok) {
                    console.error('User info fetch failed:', response.status);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('User data response:', data);

                if (!isSubscribed) return;

                if (data.statusCode === '200') {
                    setUserInfo(data.resultData);
                    showToast('카카오 로그인이 완료되었습니다.');
                    navigate('/');
                }
            } catch (error) {
                console.error('OAuth 콜백 처리 실패:', error);
                showToast(error.message, 'error');
                setTimeout(() => {
                    if (isSubscribed) {
                        navigate('/login');
                    }
                }, 3000);
            }
        };

        handleCallback();

        return () => {
            isSubscribed = false;
        };
    }, [setCookies, setUserInfo, showToast, navigate]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="mb-4">
                    <div className="w-12 h-12 border-4 border-[#75E593] border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
                <p className="text-gray-600">로그인 처리중...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;
