import React from 'react';

const Button = ({ children, className = '', ...props }) => {
    return (
        <button className={`px-4 py-2 text-white rounded-lg bg-[#75E593] hover:bg-[#68cc84] transition-colors duration-200 hover:text-gray-800 ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;