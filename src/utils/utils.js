import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const handleAdd = async () => {
	const name = prompt('Enter color name:');
	const value = prompt('Enter color value:');

	// create or overwrite a single document in a collection
	// const colorRef = doc(db, 'colors', 'color001');
	// const payload = { name: 'retro', value: '#B8E8FC' };
	// await setDoc(colorRef, payload);

	// Add
	const colorRef = collection(db, 'colors');
	const payload = { name, value, timestamp: serverTimestamp() };
	const docRef = await addDoc(colorRef, payload);
	console.log('the new ID is:', docRef.id);
};

export const handleEdit = async (id) => {
	const name = prompt('Enter color name:');
	const value = prompt('Enter color value:');
	const colorRef = doc(db, 'colors', id);
	const payload = { name, value };
	updateDoc(colorRef, payload);
};

export const handleDelete = async (id) => {
	const colorRef = doc(db, 'colors', id);
	await deleteDoc(colorRef);
};

export const handleQueryDelete = async (id) => {
	const userInputName = prompt('Enter color name:');
	const colorRef = collection(db, 'colors');

	const q = query(colorRef, where('name', '==', userInputName));
	const snapshot = await getDocs(q);
	const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	result.forEach(async (result) => {
		const docRef = doc(db, 'colors', result.id);
		await deleteDoc(docRef);
	});
};
