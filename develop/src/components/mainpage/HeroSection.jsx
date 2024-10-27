import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const [currentHeadline, setCurrentHeadline] = useState(0);

    const headlines = [
        {
            title: '앗, 이 방 찍을 때 뭔가 했더니...',
            description: 'AI가 찾아주는 진짜 우리집 모습, 이제 속지 마세요!',
        },
        {
            title: '이 방, 진짜 이렇게 생겼나요?',
            description: 'AI로 한눈에 보는 실제 모습, 허위매물 이제 안녕!',
        },
        {
            title: '방방곡곡 숨어있는 왜곡사진',
            description: '우리 AI가 다 찾아드립니다! 진짜 우리집 미리보기',
        },
        {
            title: '넓어 보이는건 카메라 빨이었습니다',
            description: 'AI로 보는 진짜 우리집, 이제는 실망하지 마세요',
        },
        {
            title: '입주하고 충격받지 말고, 미리 확인하세요!',
            description: 'AI가 찾아주는 숨겨진 왜곡사진, 이제는 똑똑하게 계약하세요',
        },
    ];

    useEffect(() => {
        // 페이지 로드시 랜덤한 문구 선택
        setCurrentHeadline(Math.floor(Math.random() * headlines.length));
    }, []); // 빈 의존성 배열로 마운트 시에만 실행

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{headlines[currentHeadline].title}</h1>
            <p className="text-xl text-gray-600 mb-8">{headlines[currentHeadline].description}</p>
        </div>
    );
};

export default HeroSection;
