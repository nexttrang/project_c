import React from 'react';
import './CircleButton.css';

const CircleButton = (props) => {
    const { icon, type } = props;

    const getSizeBG = () => type === 'smaller' ? '50px' : '70px';
    const getSizeIcon = () => type === 'smaller' ? '20px' : '30px';

    return (
        <div className='bg_icon' style={{ width: getSizeBG(), height: getSizeBG() }}>
            {icon && <img src={icon} className="icon_inner" style={{ width: getSizeIcon(), height: getSizeIcon() }} />}
        </div >
    );
};

export default CircleButton;