import React, { useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import { Box, Divider, Typography } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { loadLocalNativeBalance, loadLocalSignature } from '../../lib/services/moralisService';
import { makeStyles } from '@material-ui/styles';

import MetaMaskButton from '../../components/MeataMaskButton/MetaMaskButton';

const UserProfileContainer = (props) => {
    const { auth, balance, address, signature } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        loadLocalSignature(dispatch);
        loadLocalNativeBalance(dispatch);
    }, [balance, address, signature]);

    return (
        <Container>
            <Box className={classes.infoContainer}>
                <Typography className={classes.title}>Email:</Typography>
                <Typography className={classes.content}>{auth.email}</Typography>
            </Box>

            <Divider variant="middle" />

            <Box className={classes.walletContainer}>
                <Typography className={classes.title}>Wallet:</Typography>

                <Box className={classes.content}>

                    <Stack direction="row" spacing={2}>
                        <MetaMaskButton />
                    </Stack>

                    <Box style={{ marginTop: 15 }} >
                        <Typography >{`address: ${address}`}</Typography>
                        <Typography >{`balance: ${balance}`}</Typography>
                        <Typography >{`signature: ${signature}`}</Typography>
                    </Box>

                </Box>

            </Box>
        </Container>
    );
};

const useStyles = makeStyles({
    infoContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    walletContainer: {
        width: 500,
        maxWidth: '100%',
        marginTop: 15
    },
    content: {
        marginTop: 10,
        marginLeft: 15,
    },
    title: {
        textDecorationLine: 'underline',
    }
});

const mapStateToProps = (state) => {
    return {
        balance: state.moralis.native_balance.balance,
        address: state.moralis.native_balance.address,
        signature: state.moralis.signature
    };
};

export default connect(mapStateToProps)(UserProfileContainer);