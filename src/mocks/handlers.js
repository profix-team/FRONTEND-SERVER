import { http, HttpResponse } from 'msw';

const USE_MSW = import.meta.env.VITE_USE_MSW === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const handlers = [
    // 로그인 API 모킹
    http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        const { member_email, member_password } = await request.json();

        if (member_email === 'test@test.com' && member_password === 'test123') {
            return HttpResponse.json(
                {
                    statusCode: '200',
                    accessToken: 'mock_access_token_123',
                    refreshToken: 'mock_refresh_token_123',
                    resultData: {
                        name: '테스트 유저',
                        profileUrl: 'https://example.com/profile.jpg',
                        authority: null,
                        email: null,
                        id: null,
                        password: null,
                    },
                    resultMsg: '성공',
                },
                { status: 200 }
            );
        }

        return HttpResponse.json(
            {
                statusCode: '401',
                resultMsg: '이메일 또는 비밀번호가 올바르지 않습니다.',
                resultData: null,
            },
            { status: 401 }
        );
    }),

    // 회원가입 API 모킹
    http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        const data = await request.json();

        if (data.member_email === 'test@test.com') {
            return HttpResponse.json(
                {
                    statusCode: '400',
                    resultMsg: '이미 존재하는 이메일입니다.',
                    resultData: null,
                },
                { status: 400 }
            );
        }

        return HttpResponse.json(
            {
                statusCode: '200',
                resultMsg: '회원가입이 완료되었습니다.',
                resultData: null,
            },
            { status: 200 }
        );
    }),

    // 토큰 갱신 API 모킹
    http.post(`${API_BASE_URL}/auth/refresh`, async ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        const data = await request.json();
        const { refreshToken } = data;

        if (!refreshToken) {
            return HttpResponse.json(
                {
                    statusCode: '401',
                    resultMsg: '리프레시 토큰이 필요합니다.',
                    resultData: null,
                },
                { status: 401 }
            );
        }

        return HttpResponse.json(
            {
                statusCode: '200',
                accessToken: 'new_mock_access_token',
                refreshToken: 'new_mock_refresh_token',
                resultData: null,
                resultMsg: '성공',
            },
            { status: 200 }
        );
    }),

    // 유저 정보 조회 API 모킹
    http.get(`${API_BASE_URL}/auth/user`, async ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return HttpResponse.json(
                {
                    statusCode: '401',
                    resultMsg: '인증이 필요합니다.',
                    resultData: null,
                },
                { status: 401 }
            );
        }

        return HttpResponse.json(
            {
                statusCode: '200',
                resultMsg: '성공',
                resultData: {
                    name: '테스트 유저',
                    profileUrl: 'https://example.com/profile.jpg',
                    authority: null,
                    email: null,
                    id: null,
                    password: null,
                },
            },
            { status: 200 }
        );
    }),

    // 카카오 로그인 초기 요청 처리
    http.get(`${API_BASE_URL}/oauth2/authorization/kakao`, ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        const redirectUrl = `/oauth?accessToken=mock_kakao_token&refreshToken=mock_kakao_refresh_token`;
        return HttpResponse.redirect(redirectUrl, 302);
    }),

    // OAuth 콜백 처리
    http.get('/oauth', ({ request }) => {
        if (!USE_MSW) {
            return fetch(request);
        }

        return HttpResponse.json({
            statusCode: '200',
            resultMsg: '성공',
            resultData: {
                name: '테스트 유저',
                profileUrl: 'https://example.com/profile.jpg',
                authority: null,
                email: null,
                id: null,
                password: null,
            },
            accessToken: 'mock_kakao_token',
            refreshToken: 'mock_kakao_refresh_token',
        });
    }),
];
