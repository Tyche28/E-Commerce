import { initializeApp } from 'firebase/app';
import { 
  getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider 
  } from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZJt6cPpoaDzKEKTtgvVeJemcGZle1qmc",
  authDomain: "crwn-clothing-db-d5d66.firebaseapp.com",
  projectId: "crwn-clothing-db-d5d66",
  storageBucket: "crwn-clothing-db-d5d66.appspot.com",
  messagingSenderId: "394574114409",
  appId: "1:394574114409:web:1dbf07db91a240dbcbbcf8"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.meesage);
    }
  }

  return userDocRef;
};