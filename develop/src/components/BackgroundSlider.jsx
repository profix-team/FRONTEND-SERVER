import React, { useEffect, useState } from 'react';

const BackgroundSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = ['/api/placeholder/1920/1080', '/api/placeholder/1920/1080', '/api/placeholder/1920/1080', '/api/placeholder/1920/1080'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: currentImageIndex === index ? 0.15 : 0,
                        transform: `translateX(${(index - currentImageIndex) * 100}%)`,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
        </div>
    );
};

export default BackgroundSlider;
