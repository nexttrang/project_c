import React from 'react';

const StyledDiv = (props) => {
    const { matchParent = true, style = {} } = props;

    return (
        <div style={
            matchParent
                ? { ...style, height: '90vh' }
                : { ...style, objectFit: 'contain' }}>
            {props.children}
        </div>
    );
};

export default StyledDiv;