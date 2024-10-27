import React, { useState, useEffect } from 'react';
import { Upload, Camera, ChevronDown, User } from 'lucide-react';

import HeroSection from './components/mainpage/HeroSection';
import BackgroundSlider from './components/mainpage/BackgroundSlider';
import ImageUpload from './components/ImageUpload';

import Footer from './components/Footer';
import Header from './components/Header';
import LoginModal from './components/LoginModal';

const MainPage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const tutorialSteps = [
        {
            number: 1,
            title: '이미지 업로드',
            description: '분석하고 싶은 매물 사진을 업로드하세요.',
            emoji: '📸',
        },
        {
            number: 2,
            title: 'AI 분석',
            description: 'AI가 이미지 왜곡 여부를 분석합니다.',
            emoji: '🤖',
        },
        {
            number: 3,
            title: '결과 확인',
            description: '분석 결과와 상세 정보를 확인하세요.',
            emoji: '✨',
        },
        {
            number: 4,
            title: '보고서 저장',
            description: '분석 결과를 저장하고 공유할 수 있습니다.',
            emoji: '💾',
        },
    ];

    const faqItems = [
        {
            question: '이미지 분석은 얼마나 걸리나요?',
            answer: '일반적으로 분석에는 5-10초 정도 소요됩니다. 이미지 크기와 서버 상태에 따라 달라질 수 있습니다.',
        },
        {
            question: '어떤 형식의 이미지를 업로드할 수 있나요?',
            answer: 'JPG, PNG, HEIC 형식의 이미지를 지원합니다. 최대 파일 크기는 20MB입니다.',
        },
        {
            question: '분석 결과는 얼마나 정확한가요?',
            answer: 'AI 모델은 95% 이상의 정확도를 보입니다. 지속적인 학습을 통해 정확도를 높여가고 있습니다.',
        },
        {
            question: '분석 결과를 저장할 수 있나요?',
            answer: '회원가입 후 로그인하시면 분석 결과를 저장하고 나중에 다시 확인하실 수 있습니다.',
        },
    ];

    return (
        <div className="min-h-screen bg-transparent" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>
            <BackgroundSlider />

            {/* Navigation Bar */}
            <Header setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <HeroSection />

                {/* Upload Section */}
                <ImageUpload />

                {/* Tutorial Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">이용 방법</h2>
                    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {tutorialSteps.map((step) => (
                            <div key={step.number} className="text-center p-6 bg-white bg-opacity-90 rounded-lg shadow-sm">
                                <div className="rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(117, 229, 147, 0.1)' }}>
                                    <span className="text-4xl">{step.emoji}</span>
                                </div>
                                <div className="mt-2" style={{ color: '#75E593' }}>
                                    Step {step.number}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Analysis Example Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">분석 예시</h2>
                    <div className="flex flex-row gap-8 justify-center">
                        <div className="flex-1 max-w-xl">
                            <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-lg">
                                <div className="relative pb-[66.67%]">
                                    <img src="/origin_1.jpg" alt="왜곡된 이미지" className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">왜곡된 원본 이미지</h3>
                                    <p className="text-gray-600">광각 렌즈로 인한 공간 왜곡 발생</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 max-w-xl">
                            <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-lg">
                                <div className="relative pb-[66.67%]">
                                    <img src="/origin_2.jpg" alt="보정된 이미지" className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">AI 보정 이미지</h3>
                                    <p className="text-gray-600">실제 공간 비율에 맞게 보정됨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white bg-opacity-90 rounded-lg shadow-sm overflow-hidden">
                                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50" style={{ color: '#75E593' }}>
                                    <span className="font-semibold">{item.question}</span>
                                    <ChevronDown className="h-5 w-5" />
                                </button>
                                <div className="px-6 py-4 text-gray-600 border-t border-gray-100">{item.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Login Modal */}
            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />}
        </div>
    );
};

export default MainPage;
