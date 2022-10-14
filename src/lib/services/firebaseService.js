import { initializeApp } from 'firebase/app';
import { getAuth, getRedirectResult, GoogleAuthProvider, signInAnonymously, signInWithRedirect } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore/lite';
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

const limitPerPage = 20;
export const fetchTopNfts = (cursor) => baseXRest.request(`nfts/fetch_top_nfts?limit=${limitPerPage}&cursor=${cursor}`, 'GET');

export const userLikeCard = (assetAddress) => baseXRest.request('user/like_card', 'POST', { asset_address: assetAddress });

export const userFetch = () => baseXRest.request('user/fetch', 'POST');

export default firebaseApp;