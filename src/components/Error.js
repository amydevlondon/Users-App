import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const Error = () => {
    return (
        <div className="error">
            <BiErrorCircle />
            <p>Error</p>
        </div>
    );
};

export default Error;