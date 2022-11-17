import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function UploadFile() {
	const [img, setImg] = useState(null);
	const [error, setError] = useState(null);

	const types = ['image/png', 'image/jpeg', 'image/jpg'];
	const handleChange = (e) => {
		let selectedImg = e.target.files[0];
		if (selectedImg && types.includes(selectedImg.type)) {
			setImg(selectedImg);
			setError('');
		} else {
			setImg(null);
			setError('Please select an image file (png, jpg or jpeg)');
		}
	};
	return (
		<form>
			<input type="file" onChange={handleChange} />
			<div className="output">
				{error && <div className="error">{error}</div>}
				{img && <div>{img.name}</div>}
				{img && <ProgressBar img={img} setImg={setImg} />}
			</div>
		</form>
	);
}
