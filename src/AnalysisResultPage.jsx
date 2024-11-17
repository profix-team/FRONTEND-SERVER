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
    const [analysisData, setAnalysisData] = useState(null); // 추가

    const decodeBase64Image = (base64String) => {
        return `data:image/jpeg;base64,${base64String}`;
    };

    // 예시 데이터
    const processAnalysisResult = (data) => {
        return {
            distortionRate: (data.distortion_analysis.distortion_score * 100).toFixed(1),
            isDistorted: data.distortion_analysis.has_distortion,
            severity: data.distortion_analysis.severity,
            recommendation: data.distortion_analysis.recommendation,
            camera_model_used: data.camera_model_used, // 추가
            cameraParams: {
                vFov: (data.camera_parameters.vfov * (180 / Math.PI)).toFixed(1),
                hFov: (data.camera_parameters.hfov * (180 / Math.PI)).toFixed(1),
                // focal_length가 배열로 들어오므로 첫 번째 값 사용
                focal: data.camera_parameters.focal_length[0].toFixed(1),
                // 크기 정보 추가
                size: data.camera_parameters.size,
            },
            images: {
                calibrationPlot: decodeBase64Image(data.calibration_plot),
                latitudeConfidencePlot: decodeBase64Image(data.latitude_confidence_plot),
                upConfidencePlot: decodeBase64Image(data.up_confidence_plot),
                undistortedImage: decodeBase64Image(data.undistorted_image),
            },
            // 추가 세부 정보들
            distortionScores: {
                pinhole: data.distortion_scores.pinhole,
                simpleDivisional: data.distortion_scores.simple_divisional,
                simpleRadial: data.distortion_scores.simple_radial,
            },
        };
    };

    useEffect(() => {
        const savedData = localStorage.getItem('analysisResult');
        if (savedData) {
            const processedData = processAnalysisResult(JSON.parse(savedData));
            setAnalysisData(processedData);
            setIsLoading(false);
        }
    }, []);

    // analysisData가 없으면 로딩 표시 또는 에러 처리
    if (!analysisData) return <div>Loading...</div>;

    // 기존의 analysisResult 대신 analysisData 사용
    const analysisResult = analysisData;

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
                    <h2 className={`text-3xl font-semibold mb-2 ${analysisResult.isDistorted ? 'text-red-600' : 'text-[#75E593]'}`}>
                        {analysisResult.distortionRate}% 왜곡률 감지 (왜곡 단계: {analysisResult.severity})
                    </h2>
                    <p className="text-xl">{analysisResult.recommendation}</p>
                </motion.div>

                {/* 이미지 비교 섹션 */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="relative pb-[66.67%]">
                            {/* 원본 이미지는 로컬 스토리지에서 가져오기 */}
                            <img src={localStorage.getItem('originalImage')} alt="원본 이미지" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">원본 이미지</h3>
                            <p className="text-gray-600">업로드된 원본 사진</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="relative pb-[66.67%]">
                            <img src={analysisData.images.undistortedImage} alt="보정된 이미지" className="absolute inset-0 w-full h-full object-cover" />
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
                    <div className="flex mb-6" style={{ height: '400px' }}>
                        {' '}
                        {/* 고정된 높이 설정 */}
                        <div className="flex-1 h-full">
                            {' '}
                            {/* h-full로 부모 높이를 채움 */}
                            <img src={analysisData.images.calibrationPlot} alt="캘리브레이션 결과" className="w-full h-full object-contain" /* object-cover 대신 object-contain 사용 */ />
                        </div>
                        <div className="flex-1 h-full">
                            <img src={analysisData.images.upConfidencePlot} alt="Up 컨피던스" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 h-full">
                            <img src={analysisData.images.latitudeConfidencePlot} alt="위도 컨피던스" className="w-full h-full object-contain" />
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
                <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">예상 카메라 파라미터 (Pred, Estimated Parameter)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-600">사용한 분석 모델</p>
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                    <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">이미지 왜곡 분석에 사용된 카메라 모델입니다.</div>
                                </div>
                            </div>
                            <p className="text-lg font-medium">{analysisResult.camera_model_used}</p>
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
                            <p className="text-lg font-medium">{analysisResult.cameraParams.vFov}°</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-600">hFov (수평 시야각)</p>
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-[#75E593] cursor-help" />
                                    <div className="invisible leading-relaxed group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">카메라가 수평으로 담아내는 화각의 크기입니다.</div>
                                </div>
                            </div>
                            <p className="text-lg font-medium">{analysisResult.cameraParams.hFov}°</p>
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
                            <p className="text-lg font-medium">{analysisResult.cameraParams.focal}px</p>
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
