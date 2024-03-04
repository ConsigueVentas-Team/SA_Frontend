import { PropTypes } from 'prop-types';

export const Saludo = () => {
	const nombre = localStorage.getItem('name');
	const apellido = localStorage.getItem('surname');
	const firstName = nombre.split(" ")[0];
	const firstSurname = apellido.split(" ")[0];
	return (
		<h2 className="text-xl font-bold text-center text-white uppercase md:text-3xl">
			Mucho Gusto {firstName} {firstSurname}
		</h2>
	)
}

export const BirthdayImage = ({ item }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 w-28 md:w-40">
			{<img src={item.avatar} alt={item.name} className="rounded-full shadow-lg w-28 h-28 md:w-40 md:h-40 ring-2 ring-cv-cyan" />}
		</div>
	)
}

BirthdayImage.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		image_url: PropTypes.string.isRequired,
	}).isRequired,
};

export const BirthdayItem = ({ name, item }) => {
	return (
		<div className="">
			<p className="w-full text-sm leading-tight text-gray-400 md:text-base">{name}:</p>
			<p className="w-full text-xs font-semibold leading-tight md:text-sm">{item}</p>
		</div>
	)
}
BirthdayItem.propTypes = {
	name: PropTypes.string.isRequired,
	item: PropTypes.string.isRequired,
}

export const Gift = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path fill='#233743' d="M512 175.05v49.51c-2.22 14.25-11.47 15.2-24.6 15.2q-99.53-.01-198.64-.01a.76.75 0 01-.76-.75v-62.79q0-.47-.47-.47l-63.03.02a.5.49 0 00-.5.49v62.99a.51.51 0 01-.51.51H22.23c-11.9 0-20.24-2.17-22.23-15.06v-50.01c1.72-16.85 13.79-30.91 31.62-30.92q50.53-.02 100.86-.01a.36.35-28.1 00.2-.65c-9.17-6.02-18.21-13.54-24.37-22.31-20.25-28.76-14.64-69.11 13.01-90.73 25.09-19.63 63.87-17.98 87.02 4.49q5.49 5.34 12.58 15.51c16.01 23 32.81 54.69 34.27 83.23q.32 6.27-.22 8.46-.47 1.93.99 2.16a.96.96 0 001.11-1.01c-2.18-33.32 17.53-70.33 36.61-96.43q7.25-9.9 13.24-14.9c16.06-13.41 37.65-17.97 58.01-13.46 47.91 10.6 66.34 68.13 36.33 105.86-5.7 7.18-13.57 13.42-21.37 18.78q-1.45 1 .31 1 48.62.01 98.08 0c19.19-.01 31.99 12.51 33.72 31.3zM196.56 70.45c-11.47-17.07-27.94-29.39-49.26-19.16-21.07 10.11-25.54 39.34-9.09 55.5 6.93 6.8 15.29 12.05 24.37 17.42q20.61 12.19 43.89 18.36c1.53.41 12.71 1.84 15.18.21 4.46-2.93-.54-20.73-1.99-25.12q-8.34-25.24-23.1-47.21zm127.86-11.28c-16.19 17.85-27.58 42.55-34 65.52-1.07 3.86-3.5 15.1-.36 17.79 3.75 3.22 20.34-1.01 25.23-2.7q29.5-10.18 53.54-28.41 14.94-11.32 15.13-28.85c.33-31.05-38.58-46.46-59.54-23.35zM65.76 495.73c-14.86-.01-27.78-8.39-32.19-22.54q-1.54-4.94-1.55-17.17-.04-91.89-.01-183.77a.5.5 0 01.5-.5H223.5a.5.5 0 01.5.5v222.99a.5.5 0 01-.5.5q-78.77.03-157.74-.01zM479.99 462.75c-.01 14.69-9.3 27.82-23.57 31.73q-4.5 1.23-16.58 1.24-75.66.06-151.09.02a.75.75 0 01-.75-.75V272.25a.5.5 0 01.5-.5h190.99a.5.5 0 01.5.5q.03 95.14 0 190.5z"></path>
		</svg>
	)
}


export const Cake = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path fill='#233743' d="M255.57 0h1.23q9.39 1.05 13.61 8.32 14.54 25.01 28.73 50.22c15.59 27.68 3.33 60.09-25.94 71.58q-.42.16-.42.61l-.09 13.6a.42.41 90 00.41.42h79.11q7.45 0 11.56.64c24.94 3.9 42.51 25.49 42.49 50.87q-.04 57.41 0 114.88 0 .58.58.59c8.5.08 18.16-.57 25.64.98 25.17 5.24 40.56 26.25 40.54 51.54q-.06 56.91 0 113.83 0 .51.52.51c14.61-.23 35.39-4.28 38.46 15.72v1.98q-2.08 13.99-16.06 15.71H15.69Q1.88 509.98 0 496.19v-1.75c2.95-20.24 23.92-16.02 38.56-15.87a.44.44 0 00.44-.44V370q0-13.82 1.45-19.88c4.44-18.54 19.51-33.11 38.15-37.25 7.76-1.73 17.75-1.1 26.55-1.13q.59 0 .59-.59.04-53.98.01-107.9-.01-13.79 1.43-19.87c4.27-18.08 18.76-32.74 36.85-37.14q5.99-1.46 18.69-1.48 38.02-.03 76.02 0a.51.51 0 00.51-.51v-13.5a.72.71 11 00-.45-.66c-24.57-9.58-38.51-35.4-30.76-60.78q1.77-5.81 8.7-17.95 11.27-19.72 22.72-39.34C243.73 4.69 247.33.74 255.57 0zm-15.92 81.11c-2.04 12.56 10.8 22.54 22.53 17.8 10.48-4.24 12.81-15.77 7.5-25.09q-6.62-11.6-13.37-23.12a.42.42 0 00-.72.01q-5.65 9.9-11.36 19.82-3.99 6.91-4.58 10.58zM139.09 240.84a.28.28 0 00.49.19q6.57-7.35 13.84-14.11c21.21-19.74 51.05-18.69 71.56 1.36q7.65 7.48 15.05 15.19c9.52 9.91 20.1 11 30.15.45 14.73-15.46 27.63-30.88 50.98-31.27 22.97-.38 37.14 14.08 51.13 29.71a.39.39 0 00.68-.26q-.36-22.55-.2-45.21c.07-11.26-6.37-18.88-18.27-18.88q-95.95-.02-191.9 0c-10.16 0-18.13.81-22.02 10.42q-1.36 3.34-1.35 9.83.02 19.97-.14 42.58zm206.64 144.92c11.36 6.33 19.55 16.3 28.61 25.41 11.11 11.16 21.57 8.59 31.41-2.42 9.44-10.56 20.06-21 33.38-26.53q.44-.19.46-.67c.53-13.64 2.84-29.87-10.38-35.12q-3.62-1.44-11.62-1.43-161.59.01-323.18-.01-7.97 0-11.62 1.45c-12.81 5.07-10.77 19.63-10.45 32.44a.92.91 14.8 00.45.77c10.85 6.41 18.83 15.25 28.67 25.89 10.19 11.03 21.1 19.33 34.48 5.9 7.81-7.84 15.23-16.75 24.27-22.97 20.68-14.22 46.51-10.85 64.24 6.34q8.37 8.13 16.54 16.44 10.83 11.02 21.9 5.18c7-3.69 16.28-15.07 22.97-21.54 16.38-15.83 39.78-20.32 59.87-9.13z"></path>
		</svg>
	)
}
