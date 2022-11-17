import { collection, getDocs} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useFireStore = (snap) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const querySnapshot = await getDocs(collection(db, collection));
			let documents = [];
			querySnapshot.forEach((doc) => {
				documents.push({ ...doc.data(), id: doc.id });
			});
            console.log("documents",documents);
			setDocs(documents);
			// const resp = await getDocs(collection(db, snap));
			// setDocs(resp.docChanges.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		return () => getData();
        // getData();
	}, [collection]);

	return { docs };
};
export default useFireStore;
