import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyDialog from '../../components/Dialog/MyDialog';
import {
    CustomDialog,
    DialogErrorCommon,
    DialogRegisterSuccess,
} from '../../lib/models';
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, signUpAction } from '../../lib/redux/actions/AuthActions';
import Loader from '../../components/Loader/Loader';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
        Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function SignUp(props) {
    const [dialog, setDialog] = useState(CustomDialog);
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const onSignUp = (e) => {
        e.preventDefault();
        try {
            let error = false;
            const errorObj = { ...errorsObj };
            if (email === '') {
                errorObj.email = 'Email is required';
                error = true;
            }

            if (password === '') {
                errorObj.password = 'Password is required';
                error = true;
            }

            if (confirmPassword === '') {
                errorObj.confirmPassword = 'Confirm password is required';
                error = true;
            } else if (confirmPassword !== password) {
                errorObj.confirmPassword = 'Confirm password does not match Password';
                error = true;
            }

            if (error) return;
            dispatch(loadingToggleAction(true));

            dispatch(signUpAction(email, password));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(props.errorMessage);
        console.log(props.successMessage);
        if (props.errorMessage) {
            setDialog({
                ...DialogErrorCommon,
                content: props.errorMessage,
                open: true
            });
        } else if (props.successMessage) {
            setDialog({
                ...DialogRegisterSuccess,
                open: true
            });
        }
    }, [props.errorMessage, props.successMessage]);

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
            Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                        onSubmit={onSignUp}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={event => { setEmail(event.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={event => { setPassword(event.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="confirm-password"
                                    onChange={event => { setConfirmPassword(event.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
              Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                  Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    {<MyDialog dialog={dialog} setDialog={setDialog} />}
                    {props.showLoading && <Loader />}
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(SignUp);
