import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="p-4 bg-white shadow rounded">
            {children}
        </div>
    );
};

export default Card;
