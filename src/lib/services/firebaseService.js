import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore/lite';

// const firebaseConfig = {
//   apiKey: "AIzaSyDU92RhM4bsl2Su0pKrl8g20fMWISS9wl4",
//   authDomain: "project-r-c259b.firebaseapp.com",
//   projectId: "project-r-c259b",
//   storageBucket: "project-r-c259b.appspot.com",
//   messagingSenderId: "289991020581",
//   appId: "1:289991020581:web:314fd6086fbee56c226fcc",
//   measurementId: "G-1YF25EZQ9C"
// };

const firebaseConfig = {
    apiKey: 'AIzaSyCyi1_MgvySAQojT8k70p5O8F6jSpWtpqc',
    authDomain: 'tinderclone-ece49.firebaseapp.com',
    projectId: 'tinderclone-ece49',
    storageBucket: 'tinderclone-ece49.appspot.com',
    messagingSenderId: '276511548935',
    appId: '1:276511548935:web:5e69a7954accb274c5aca2',
    measurementId: 'G-CK0QL4YLSK'
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

export const setUserDoc = (uid, jsData) => {

    const ref = doc(db, 'users', uid);
    return setDoc(ref, {
        ...jsData,
        timestamp: serverTimestamp()
    }, { merge: true });
};

export const baseStorageUrl =
  'https://storage.googleapis.com/tinderclone-ece49.appspot.com';

export default firebaseApp;