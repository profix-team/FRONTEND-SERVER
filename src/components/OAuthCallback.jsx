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

                setCookies(accessToken, refreshToken);
                const response = await fetch('http://localhost:8080/auth/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                if (!isSubscribed) return;

                if (data.statusCode === '200') {
                    setUserInfo(data.resultData);
                    showToast('카카오 로그인이 완료되었습니다.');
                    navigate('/');
                } else {
                    throw new Error('로그인에 실패했습니다.');
                }
            } catch (error) {
                console.error('OAuth 콜백 처리 실패:', error);
                showToast(error.message, 'error');
                // 에러 발생시 로그인 페이지로 리다이렉트
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
