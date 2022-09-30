import React from 'react';


const Spacer = (props) => {
    const { width = '0vw', height = '0vh' } = props;
    return (
        <div style={{ height: height, width: width }} >

        </div>
    );
};

export default Spacer;