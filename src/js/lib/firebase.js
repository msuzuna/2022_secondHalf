// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTNM15BIlefBuUkTJl1p8nbKY82HEfnp4',
  authDomain: 'dicetalk-71a97.firebaseapp.com',
  databaseURL:
    'https://dicetalk-71a97-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'dicetalk-71a97',
  storageBucket: 'dicetalk-71a97.appspot.com',
  messagingSenderId: '364730031576',
  appId: '1:364730031576:web:0b861d85709011c309e6ad',
  measurementId: 'G-13VJJLFW79',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
