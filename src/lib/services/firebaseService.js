import { initializeApp } from 'firebase/app';
import { getAuth, getRedirectResult, GoogleAuthProvider, signInAnonymously, signInWithRedirect } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore/lite';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';

import logger from '../helper/logger';
import baseXRest from './baseXRest';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);

export const getMyCollection = (_col) => {
    return collection(db, _col);
};

export const getMyDocs = (_col) => {
    const col = getMyCollection(_col);
    return getDocs(col);
};

export const getMyDoc = (_col, _doc) => {
    const ref = doc(db, _col, _doc);
    return getDoc(ref);
};

export const setUserDoc = (uid, jsData) => {

    const ref = doc(db, 'users', uid);
    return setDoc(ref, {
        ...jsData,
        timestamp: serverTimestamp()
    }, { merge: true });
};

export const baseStorageUrl =
    'https://storage.googleapis.com/tinderclone-ece49.appspot.com';

export const loginGuestUser = () => {
    return signInAnonymously(auth);
};

export const signInWithGoogle = () => {
    return signInWithRedirect(auth, provider);
};

export const getMappingAccountResult = () => {
    return getRedirectResult(auth);
};

export const setSpecificDoc = (_col, _doc, jsData) => {
    const ref = doc(db, _col, _doc);
    return setDoc(ref, {
        ...jsData,
        timestamp: serverTimestamp()
    }, { merge: true });
};

export const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            logger.log('Notification permission granted.');
        }
    });
};

getToken(messaging, { vapidKey: 'BHLgBpUtDGiHgnIajIMidCnRX3Sf2WnG0AzelDx6tLwGWJM4vGDJGUfWmXdToSGIU0MM5FK-916YV_cLUo19Y64' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        logger.log(`fcm token: ${currentToken}`);
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});

const limitPerPage = 20;
export const fetchTopNfts = (cursor) => baseXRest.request(`nfts/fetch_top_nfts?limit=${limitPerPage}&cursor=${cursor}`, 'GET');

export const userLikeCard = (assetAddress) => baseXRest.request('user/like_card', 'POST', { asset_address: assetAddress });

export const userFetch = () => baseXRest.request('user/fetch', 'POST');

export default firebaseApp;