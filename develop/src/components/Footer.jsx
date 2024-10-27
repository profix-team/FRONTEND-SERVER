import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-24 bg-[#75E593] text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <span className="border-b-2 border-white pb-2">Team Propix</span>
                        </h3>
                        <div className="space-y-3">
                            <p className="flex items-center space-x-2">
                                <span className="font-medium">PM/Backend:</span>
                                <span>홍윤기</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <span className="font-medium">AI Development:</span>
                                <span>윤성건</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <span className="font-medium">AI Development:</span>
                                <span>권혁찬</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <span className="font-medium">Frontend:</span>
                                <span>김선혁</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <span className="border-b-2 border-white pb-2">Contact</span>
                        </h3>
                        <div className="space-y-3">
                            <p>Email: support1@propix.com</p>
                            <p>Tel: 054-820-5911</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <span className="border-b-2 border-white pb-2">Development</span>
                        </h3>
                        <div className="space-y-3">
                            <p>React</p>
                            <p>Spring Boot</p>
                            <p>Python</p>
                            <p>TensorFlow</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <span className="border-b-2 border-white pb-2">Location</span>
                        </h3>
                        <p className="leading-relaxed">
                            경상북도 안동시 경동로 1375
                            <br />
                            안동대학교 공학2호관 3층
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
