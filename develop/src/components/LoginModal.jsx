import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose, activeTab, setActiveTab }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                        }}
                        className="bg-white rounded-lg p-8 max-w-md w-full m-4 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between mb-6">
                            <div className="flex space-x-4">
                                <button className={`font-semibold ${activeTab === 'login' ? 'text-[#75E593]' : 'text-gray-400'}`} onClick={() => setActiveTab('login')}>
                                    로그인
                                </button>
                                <button className={`font-semibold ${activeTab === 'register' ? 'text-[#75E593]' : 'text-gray-400'}`} onClick={() => setActiveTab('register')}>
                                    회원가입
                                </button>
                            </div>
                            <button onClick={onClose}>
                                <span className="text-gray-400 text-xl">&times;</span>
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                {activeTab === 'login' ? (
                                    // 로그인 폼 내용
                                    <div className="space-y-4">
                                        {/* 소셜 로그인 버튼 */}
                                        <div className="space-y-3">
                                            <button className="w-full py-3 px-4 bg-[#FEE500] text-[#000000] rounded-lg hover:bg-[#FDD835] transition-colors flex items-center justify-center space-x-2">
                                                <img src="/kakao_logo.svg" alt="Kakao" className="w-5 h-5" />
                                                <span>카카오로 시작하기</span>
                                            </button>
                                            <button className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                                                <img src="/google_logo.svg" alt="Google" className="w-5 h-5" />
                                                <span>Google로 시작하기</span>
                                            </button>
                                        </div>

                                        {/* 구분선 */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">또는</span>
                                            </div>
                                        </div>

                                        {/* 기존 로그인 폼 */}
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                                                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="이메일을 입력하세요." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="비밀번호를 입력하세요." />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="remember-me" className="h-4 w-4 text-[#75E593] focus:ring-[#75E593] border-gray-300 rounded" />
                                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                                        로그인 상태 유지
                                                    </label>
                                                </div>
                                                <button type="button" className="text-sm text-[#75E593] hover:text-[#68cc84]">
                                                    비밀번호 찾기
                                                </button>
                                            </div>
                                            <button type="submit" className="w-full py-2 bg-[#75E593] text-white rounded-lg hover:bg-[#68cc84] transition-colors">
                                                로그인
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    // 회원가입 폼 내용
                                    <div className="space-y-4">
                                        {/* 소셜 회원가입 버튼 */}
                                        <div className="space-y-3">
                                            <button className="w-full py-3 px-4 bg-[#FEE500] text-[#000000] rounded-lg hover:bg-[#FDD835] transition-colors flex items-center justify-center space-x-2">
                                                <img src="/kakao_logo.svg" alt="Kakao" className="w-5 h-5" />
                                                <span>카카오로 회원가입</span>
                                            </button>
                                            <button className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                                                <img src="/google_logo.svg" alt="Google" className="w-5 h-5" />
                                                <span>Google로 회원가입</span>
                                            </button>
                                        </div>

                                        {/* 구분선 */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">또는</span>
                                            </div>
                                        </div>

                                        {/* 기존 회원가입 폼 */}
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                                                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="이메일을 입력하세요." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="비밀번호를 입력하세요." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="비밀번호를 다시 입력하세요." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75E593]" placeholder="이름을 입력하세요." />
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="agree-terms" className="h-4 w-4 text-[#75E593] focus:ring-[#75E593] border-gray-300 rounded" />
                                                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                                                    이용약관 및 개인정보처리방침에 동의합니다.
                                                </label>
                                            </div>
                                            <button type="submit" className="w-full py-2 bg-[#75E593] text-white rounded-lg hover:bg-[#68cc84] transition-colors">
                                                회원가입
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
