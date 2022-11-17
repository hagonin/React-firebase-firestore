// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDqWlZXNXqB7nri8EoGvA-jXmSazzWqKg8',
	authDomain: 'photo-gallery-ea366.firebaseapp.com',
	projectId: 'photo-gallery-ea366',
	storageBucket: 'photo-gallery-ea366.appspot.com',
	messagingSenderId: '643842711457',
	appId: '1:643842711457:web:040f793f4a5e523a90b5e0',
	measurementId: 'G-EY46885PLY',
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const timestamp = serverTimestamp()