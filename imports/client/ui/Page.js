import React from 'react';

const Page = ({ children, className }) => {
    className = `page d-flex align-items-center justify-content-center ${className}`;

    return <div className={className}>{children}</div>;
};

export default Page;
