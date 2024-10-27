import React from 'react';

const LoginModal = ({ isOpen, onClose, activeTab, setActiveTab }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
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

                {activeTab === 'login' ? (
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
                        <button className="w-full py-2 bg-[#75E593] text-white rounded-lg hover:bg-[#68cc84] transition-colors">로그인</button>
                    </form>
                ) : (
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
                        <button className="w-full py-2 bg-[#75E593] text-white rounded-lg hover:bg-[#68cc84] transition-colors">회원가입</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
