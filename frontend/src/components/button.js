import React from 'react';

const Button = ({ onClick, children }) => {
    return (
        <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
