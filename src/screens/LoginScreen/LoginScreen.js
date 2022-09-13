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
import { connect, useDispatch } from 'react-redux';
import { loadingToggleAction, loginAction } from '../../lib/redux/actions/AuthActions';
import Loader from '../../components/Loader/Loader';
import { CustomDialog, DialogErrorCommon, DialogSiginSuccess } from '../../lib/models';
import MyDialog from '../../components/Dialog/MyDialog';

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

const SignIn = (props) => {
    const dispatch = useDispatch();

    const [dialog, setDialog] = useState(CustomDialog);
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
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

            if (error) return;
            dispatch(loadingToggleAction(true));

            dispatch(loginAction(email, password));

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
                ...DialogSiginSuccess,
                open: true
            });
        }
    }, [props.errorMessage, props.successMessage]);

    return (
        <ThemeProvider theme={theme}>
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
            Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onLogin}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => { setEmail(event.target.value); }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => { setPassword(event.target.value); }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
              Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                  Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#/register" variant="body2">
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    {<MyDialog dialog={dialog} setDialog={setDialog} />}
                    {props.showLoading && <Loader />}

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(SignIn);
