import React from 'react';
import Container from '@mui/material/Container';
import { connect, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { loadingToggleAction, loginAction } from '../../lib/redux/actions/AuthActions';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const SignIn = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onStart = () => {
        dispatch(loadingToggleAction(true));
        dispatch(loginAction());
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <Button onClick={onStart}>Start</Button>
            {props.showLoading && <Loader />}
        </Container>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        marginTop: '5vh',
    },
});

const mapStateToProps = (state) => {
    return {
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(SignIn);
