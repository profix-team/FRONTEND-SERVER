import React, { useState, useEffect } from 'react';

const BackgroundSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = ['/slider_1.jpg', '/slider_2.jpg', '/slider_3.jpg', '/slider_4.jpg'];

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
                        opacity: currentImageIndex === index ? 1 : 0,
                        transform: `translateX(${(index - currentImageIndex) * 100}%)`,
                    }}
                />
            ))}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.9) 100%)',
                }}
            />
        </div>
    );
};

export default BackgroundSlider;
