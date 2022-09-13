import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog = (props) => {
    const dialog = props.dialog;

    const handleClose = () => {
        props.setDialog({
            ...dialog,
            open: false,
        });
    };

    const onPositive = () => {
        dialog.onPositive();
        handleClose();
    };

    const onNegative = () => {
        dialog.onNegative();
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={dialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{dialog.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialog.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {dialog.negativeButton && (
                        <Button onClick={onNegative}>{dialog.negativeButton}</Button>
                    )}
                    {dialog.positiveButton && (
                        <Button onClick={onPositive}>{dialog.positiveButton}</Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyDialog;
