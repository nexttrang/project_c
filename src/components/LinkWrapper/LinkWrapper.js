import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { closeWebPopupAction } from '../../lib/redux/actions/AppStateAction';
import './LinkWrapper.css';

const LinkWrapper = (props) => {
    const dispatch = useDispatch();

    const { link } = props;

    const handleClose = () => {
        dispatch(closeWebPopupAction());
    };

    return (
        <Modal show={link} onHide={handleClose} className='container_linkwrapper'>
            <Modal.Header>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Title>Link Popup</Modal.Title>
            <Modal.Body><iframe src={link} style={{ width: '100%', height: '100vh' }} allowfullscreen /></Modal.Body>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        link: state.app.web_popup,
    };
};

export default connect(mapStateToProps)(LinkWrapper);