import { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

export default function ProgressBar({ img, setImg }) {
	const { url, progress } = useStorage(img);

      useEffect(() => {
				if (url) {
					setImg(null);
				}
			}, [url, setImg]);

	console.log(progress, url);
	return <div className='h-1 bg-green-700 mt-5' style={{ width: progress + '%' }}>progress</div>;
}
