import React from 'react';


const Spacer = (props) => {
    const { width = '0vw', height = '0vh' } = props;
    return (
        <div style={{ height: height, width: width, margin: '0.5vh 0.5vw 0.5vh 0.5vw' }} >

        </div>
    );
};

export default Spacer;