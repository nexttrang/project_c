import React from 'react';
import './LongLabelChip.css';

const LongLabelChip = (props) => {
    const { label, value = '' } = props;

    return (
        <div className='icon_frame_long_label_chip'>
            <p className='label_inner_long_label_chip'>
                {label}: {value}
            </p>
        </div>
    );
};

export default LongLabelChip;