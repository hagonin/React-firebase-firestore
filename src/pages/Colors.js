import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
	handleAdd,
	handleDelete,
	handleEdit,
	handleQueryDelete,
} from '../utils/utils';

const Dot = ({ color }) => {
	const style = {
		height: 25,
		width: 25,
		margin: '0px 10px',
		backgroundColor: color,
		borderRadius: '50%',
		display: 'inline-block',
	};
	return <span style={style}></span>;
};
export default function Colors() {
	const colorRef = collection(db, 'colors');
	const q = query(colorRef, orderBy('timestamp', 'desc'));
	const [color, setColor] = useState([{ name: 'Loading...', id: 'initial' }]);
	useEffect(() => {
		const unsub = onSnapshot(q, (snap) => {
			setColor(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});

		return unsub;
	}, []);

	return (
		<div>
			<button
				className="bg-orange-600 outline m-6 px-5 py-1 rounded-sm text-white"
				onClick={handleAdd}
			>
				Add
			</button>
			<button
				className="bg-orange-600 outline m-6 px-5 py-1 rounded-sm text-white"
				onClick={handleQueryDelete}
			>
				Query delete
			</button>

			<ul>
				{color.map((el) => (
					<li key={el.id}>
						<button
							className="bg-blue-600 outline m-1 px-5 py-1 rounded-sm text-white"
							onClick={() => handleEdit(el.id)}
						>
							Edit
						</button>

						<button
							className="bg-red-500 outline m-1 px-5 py-1 rounded-sm text-white"
							onClick={() => handleDelete(el.id)}
						>
							Delete
						</button>
						<Dot color={el.value} />
						{el.name}
					</li>
				))}
			</ul>
		</div>
	);
}
