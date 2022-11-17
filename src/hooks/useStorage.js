import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage, db, timestamp } from '../firebase/firebase';

export default function useStorage(img) {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const storageRef = ref(storage, img.name);
		const collectionRef = collection(db,'images')

		const uploadImg = uploadBytesResumable(storageRef, img);
		uploadImg.on(
			'state_changed',
			(snap) => {
				const progress = Math.floor(
					(snap.bytesTransferred / snap.totalBytes) * 100
				);
				console.log('Upload is ' + progress + '% done', img.name);
				setProgress(progress);
			},
			(err) => {
				setError(err);
			},
			() => {
				getDownloadURL(storageRef).then(async (url) => {
					console.log('File availale at', url);
                   
					setUrl(url);
				});
			}
		);
	}, [img]);
	return { progress, url, error };
}
