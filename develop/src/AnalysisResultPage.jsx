import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Share2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import LoginModal from './components/LoginModal';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';

const AnalysisResultPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    // 예시 데이터
    const analysisResult = {
        distortionRate: 35.7,
        isDistorted: true,
        cameraParams: {
            roll: 1333.0,
            pitch: 812.3,
            vFov: 813.3,
            focal: 2000.0,
            confidence: 0.89,
        },
    };

    useEffect(() => {
        // 페이지 진입 시 로딩 상태를 true로 설정
        setIsLoading(true);

        // 일정 시간 후 로딩 상태를 false로 변경
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // 애니메이션 variants 정의
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <div className="min-h-screen bg-transparent relative" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>
            {/* Static Background with Overlay */}
            <div
                className="fixed top-0 left-0 w-full h-screen -z-10"
                style={{
                    backgroundImage: 'url(/origin_1.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.9) 100%)',
                    }}
                />
            </div>
            <Header setIsLoginModalOpen={setIsLoginModalOpen} />
            <motion.main initial="hidden" animate="visible" variants={containerVariants} className="max-w-7xl mx-auto px-4 py-8">
                {/* 뒤로가기 및 액션 버튼 */}
                <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                    <Button onClick={() => navigate(-1)} className="flex items-center">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        돌아가기
                    </Button>
                    <div className="flex gap-4">
                        <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                            <Download className="w-4 h-4 mr-2" />
                            결과 저장
                        </button>
                        <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                            <Share2 className="w-4 h-4 mr-2" />
                            공유하기
                        </button>
                    </div>
                </motion.div>

                {/* 분석 결과 경고 메시지 */}
                <motion.div variants={itemVariants} className={`mb-8 p-6 rounded-lg ${analysisResult.isDistorted ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-[#75E593]'}`}>
                    <h2 className={`text-3xl font-semibold mb-2 ${analysisResult.isDistorted ? 'text-red-600' : 'text-[#75E593]'}`}>{analysisResult.isDistorted ? '⚠️ 왜곡이 감지되었습니다!' : '✅ 안전한 매물입니다'}</h2>
                    <p className="text-xl">
                        {analysisResult.isDistorted ? (
                            <>
                                이 이미지는 <span className="text-xl font-bold text-red-600">{analysisResult.distortionRate}%</span>의 왜곡률이 감지되었습니다. 매물 확인 시 주의가 필요합니다.
                            </>
                        ) : (
                            '이 매물 이미지는 신뢰할 수 있는 수준의 왜곡률을 보입니다.'
                        )}
                    </p>
                </motion.div>

                {/* 이미지 비교 섹션 */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="relative pb-[66.67%]">
                            <img src="/origin_1.jpg" alt="원본 이미지" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">원본 이미지</h3>
                            <p className="text-gray-600">업로드된 원본 사진</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="relative pb-[66.67%]">
                            <img src="/origin_2.jpg" alt="보정된 이미지" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">보정된 이미지</h3>
                            <p className="text-gray-600">AI가 보정한 실제 모습</p>
                        </div>
                    </div>
                </motion.div>

                {/* 분석 이미지 결과 */}
                <motion.div variants={itemVariants} className="bg-white p-6 shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-6">상세 분석 결과</h3>
                    <div className="flex mb-6">
                        <div className="flex-1">
                            <img src="/result2-1.jpg" alt="캘리브레이션 결과" className="w-full h-100 object-cover" />
                        </div>
                        <div className="flex-1">
                            <img src="/result2-2.jpg" alt="Up 컨피던스" className="w-full h-100 object-cover" />
                        </div>
                        <div className="flex-1">
                            <img src="/result2-3.jpg" alt="위도 컨피던스" className="w-full h-100 object-cover" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-[#75E593]">Calibration Result</h4>
                            <p className="text-base leading-relaxed">
                                부동산 사진에서 발생할 수 있는 카메라 렌즈의 왜곡을 측정하기 위한 분석 결과입니다.
                                <br />
                                격자 무늬로 표시된 각도를 통해 실제 공간이 얼마나 왜곡되어 촬영되었는지 확인할 수 있으며, 사진이 실제 공간을 얼마나 정확하게 반영하고 있는지 판단할 수 있습니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-[#75E593]">Up Confidence</h4>
                            <p className="text-base leading-relaxed">
                                공간의 높이와 천장 방향이 얼마나 정확하게 표현되었는지를 보여주는 분석 결과입니다.
                                <br />
                                밝은 색상으로 표시된 부분일수록 실제 공간의 수직 방향이 정확하게 촬영되었음을 의미하며, 어두운 부분은 왜곡 가능성이 있는 영역을 나타냅니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-[#75E593]">Latitude Confidence</h4>
                            <p className="text-base leading-relaxed">
                                공간의 가로와 세로 비율이 실제와 얼마나 일치하는지 보여주는 분석 결과입니다.
                                <br />
                                색상이 밝을수록 해당 영역의 공간 비율이 실제와 유사하게 촬영되었다는 것을 의미하며, 방의 실제 크기와 형태를 더 정확하게 파악할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 파라미터와 신뢰도를 수평으로 배치 */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8">
                    {/* 카메라 파라미터 */}
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">예상 카메라 파라미터 (Pred, Estimated Parameter)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">Roll (회전 각도)</p>
                                    <div className="group relative">
                                        <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                        <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                                            카메라가 좌우로 기울어진 정도를 나타냅니다.
                                            <br />
                                            0°가 이상적이며, 값이 클수록 사진이 기울어져 있다는 의미입니다.
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-medium">{analysisResult.cameraParams.roll}° (+- 1.8°)</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">Pitch (회전 각도)</p>
                                    <div className="group relative">
                                        <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                        <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                                            카메라가 위아래로 기울어진 정도입니다.
                                            <br />
                                            0°는 정면을 향한 상태이며, 양수는 위쪽, 음수는 아래쪽을 향하고 있음을 의미합니다.
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-medium">{analysisResult.cameraParams.pitch}° (+- 1.9°)</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">vFoV (수직 시야각)</p>
                                    <div className="group relative">
                                        <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                        <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                                            카메라가 수직으로 담아내는 화각의 크기입니다.
                                            <br />
                                            값이 클수록 더 넓은 범위를 촬영했으며, 일반적으로 광각렌즈일수록 이 값이 커지고 공간이 왜곡될 가능성이 높아집니다.
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-medium">{analysisResult.cameraParams.vFov}° (+- 2.7°)</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">Focal (초점 거리)</p>
                                    <div className="group relative">
                                        <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                        <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                                            카메라 렌즈의 초점 거리를 픽셀 단위로 나타냅니다.
                                            <br />
                                            값이 작을수록 광각렌즈를 의미하며, 부동산 사진에서는 일반적으로 광각렌즈를 사용하여 공간을 더 넓어 보이게 촬영하는 경향이 있습니다.
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-medium">{analysisResult.cameraParams.focal}px (+- 18.5px)</p>
                            </div>
                        </div>
                    </div>

                    {/* 신뢰도 점수 */}
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">분석 신뢰도</h3>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#75E593] bg-[#75E593] bg-opacity-10">신뢰도</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-[#75E593]">{(analysisResult.cameraParams.confidence * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                            <motion.div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#75E593] bg-opacity-10" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.5 }}>
                                <motion.div
                                    style={{ width: `${analysisResult.cameraParams.confidence * 100}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#75E593]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${analysisResult.cameraParams.confidence * 100}%` }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                ></motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.main>
            <Footer />
            {/* Login Modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />{' '}
        </div>
    );
};

export default AnalysisResultPage;
