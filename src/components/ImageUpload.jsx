import React, { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // useAuth import 추가
import Button from './Button';
import axios from 'axios'; // 이 줄 추가

const ImageUpload = ({ setIsLoginModalOpen }) => {
    // props 추가
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { user, showToast } = useAuth(); // useAuth hook 사용

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!user) {
                event.target.value = null;
                showToast('로그인 후 이용해주세요.', 'error');
                setIsLoginModalOpen(true);
                return;
            }

            // 파일 크기 제한 추가 (20MB)
            if (file.size > 20 * 1024 * 1024) {
                event.target.value = null;
                showToast('파일 크기는 20MB를 초과할 수 없습니다.', 'error');
                return;
            }

            // 파일 형식 체크
            const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];
            if (!allowedTypes.includes(file.type)) {
                event.target.value = null;
                showToast('지원하지 않는 파일 형식입니다. (JPG, PNG, HEIC만 가능)', 'error');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                // 원본 이미지 URL을 로컬 스토리지에 저장
                localStorage.setItem('originalImage', reader.result);
                // 파일 선택 후 바로 업로드 시작
                handleUpload(file);
            };
            reader.onerror = () => {
                showToast('파일을 읽는 중 오류가 발생했습니다.', 'error');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (!user) {
            // 로그인하지 않은 경우
            showToast('로그인 후 이용해주세요.', 'error');
            setIsLoginModalOpen(true);
            return;
        }

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            handleUpload(file);
        } else {
            alert('이미지 파일만 업로드 가능합니다.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async (file) => {
        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // 업로드 진행률 표시를 위한 설정
            const config = {
                params: {
                    normalize: true,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setUploadProgress(progress);
                },
            };

            const response = await axios.post('http://211.185.105.167:8082/calibrate', formData, config);
            console.log('Response:', response.data);

            // 분석 결과를 로컬 스토리지에 저장
            localStorage.setItem('analysisResult', JSON.stringify(response.data));

            setIsUploading(false);
            navigate('/analysis'); // 분석 결과 페이지로 이동
        } catch (error) {
            console.error('Error:', error);
            showToast('이미지 업로드에 실패했습니다.', 'error');
            setIsUploading(false);
            handleReset();
        }
    };

    const startAnalysis = async () => {
        setIsAnalyzing(true);
        setAnalysisProgress(0);

        // TODO: 실제 분석 API 구현
        // 2. 이미지 분석 API
        // const analysisResponse = await fetch('/api/analyze', {
        //     method: 'POST',
        //     body: JSON.stringify({ imageId }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const analysisResult = await analysisResponse.json();

        // 3. 분석 결과 저장 API
        // await fetch('/api/save-analysis', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         imageId,
        //         analysisResult
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // 분석 프로세스 시뮬레이션
        for (let i = 0; i <= 100; i += 2) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setAnalysisProgress(i);
        }

        setIsAnalyzing(false);
        // TODO: 분석 완료 후 결과 페이지로 이동
        navigate('/analysis');
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreview(null);
        setUploadProgress(0);
        setAnalysisProgress(0);
        setIsUploading(false);
        setIsAnalyzing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="mt-12 max-w-4xl mx-auto">
            <div className="border-2 border-dashed rounded-lg p-20 text-center bg-white bg-opacity-90" style={{ borderColor: '#75E593' }} onDrop={handleDrop} onDragOver={handleDragOver}>
                {!selectedFile ? (
                    <>
                        <Upload className="mx-auto h-12 w-12" style={{ color: '#75E593' }} />
                        <p className="mt-4 text-lg text-gray-600">분석을 원하는 매물 이미지를 드래그하여 업로드하거나 클릭하여 선택하세요</p>
                        <Button onClick={() => fileInputRef.current?.click()} className="mt-6 px-6 py-3 text-white rounded-lg" style={{ backgroundColor: '#75E593' }}>
                            이미지 선택하기
                        </Button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                                <div className="text-left">
                                    <p className="font-semibold">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {selectedFile.type} • {formatFileSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleReset} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* 업로드 진행률 */}
                        {isUploading && (
                            <div className="w-full">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#75E593] bg-[#75E593] bg-opacity-10">이미지 업로드 중</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-[#75E593]">{uploadProgress}%</span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#75E593] bg-opacity-10">
                                        <div style={{ width: `${uploadProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#75E593] transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 분석 진행률 */}
                        {isAnalyzing && (
                            <div className="w-full">
                                <div className="flex flex-col items-center mb-4">
                                    <Loader className="w-8 h-8 text-[#75E593] animate-spin" />
                                    <p className="text-sm text-gray-500 mt-2">약 5-10초 정도의 시간이 소요됩니다. 잠시만 기다려주세요.</p>
                                </div>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#75E593] bg-[#75E593] bg-opacity-10">AI 분석 진행중</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-[#75E593]">{analysisProgress}%</span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#75E593] bg-opacity-10">
                                        <div style={{ width: `${analysisProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#75E593] transition-all duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
