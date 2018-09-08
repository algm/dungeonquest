import React from 'react';

const Background = ({ img, children, className }) => {
    let style = {};
    img = img === undefined ? '/img/defaultbg.jpg' : null;

    if (img) {
        style.backgroundImage = `url(${img})`;
    }

    return (
        <div className={`background-container ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Background;
