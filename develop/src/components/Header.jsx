import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Header = ({ setIsLoginModalOpen }) => {
    return (
        <nav className="bg-white bg-opacity-90 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <img src="/propix_logo.svg" alt="ProFix Logo" className="h-8 w-8" />
                    <span className="text-xl font-bold text-gray-800">Propix</span>
                </Link>
                <div className="flex space-x-4 items-center">
                    <Link to="/analysis" className="px-4 py-2 text-gray-600 hover:text-gray-800">
                        서비스 소개
                    </Link>
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-800">이용방법</button>
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-800" onClick={() => setIsLoginModalOpen(true)}>
                        <User className="h-5 w-5" />
                    </button>
                    <Button>시작하기</Button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
