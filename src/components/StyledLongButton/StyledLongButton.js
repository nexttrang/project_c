import React, { useEffect, useState } from 'react';
import './StyledLongButton.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import iconEdit from '../../assets/images/ic_edit.webp';
import { Button } from '@material-ui/core';
import StyledDivider from '../StyledDivider';

const StyledLongButton = (props) => {
    const { icon, label, type = 'forward', onClick = () => { }, expandContent = <></> } = props;

    const [toggle, setToggle] = useState(false);
    const [shouldExpand, setShouldExpand] = useState(false);

    const getRightIcon = () => {
        switch (type) {
            case 'forward':
                return <ArrowForwardIosIcon style={{ color: 'white' }} />;
            case 'expand':
                return !toggle ? <ExpandMoreIcon style={{ color: 'white' }} /> : <ExpandLessIcon style={{ color: 'white' }} />;
            case 'edit':
                return <img src={iconEdit} className="icon_right_styled_long_button" />;
            default:
                return <></>;
        }
    };

    useEffect(() => {
        setShouldExpand(toggle && type === 'expand');
    }, [toggle]);

    const showExpandContent = () => {
        return (
            <>
                <StyledDivider />
                {expandContent}
            </>
        );
    };

    return (
        <div
            className={!shouldExpand ? 'background_collapse_styled_long_button' : 'background_expand_styled_long_button'}>

            <Button
                onClick={() => {
                    setToggle(!toggle);
                    onClick();
                }}>
                {icon && <img src={icon} className="icon_left_styled_long_button" />}
                <span className='label_inner_styled_long_button'>
                    {label}
                </span>
                {getRightIcon()}
            </Button>
            {shouldExpand && showExpandContent()}

        </div>
    );
};

export default StyledLongButton;