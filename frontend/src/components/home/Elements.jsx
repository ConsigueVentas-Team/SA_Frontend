import { PropTypes } from 'prop-types';

export const Saludo = () => {
	const nombre = localStorage.getItem('name');
	const apellido = localStorage.getItem('surname');
	const firstName = nombre.split(" ")[0];
	const firstSurname = apellido.split(" ")[0];
	return (
		<h2 className="text-xl md:text-3xl text-white font-bold uppercase">
			Mucho Gusto {firstName} {firstSurname}
		</h2>
	)
}

export const BirthdayImage = ({ item }) => {
	const name = `${item.name.split(" ")[0]} ${item.surname.split(" ")[0]}`
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<img src={item.image_url} alt={name} className="w-40 h-40 rounded-full shadow-lg ring-2 ring-cv-cyan" />
			<p className="text-xl font-medium text-white md:text-2xl ">{name}</p>
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
		<div className="flex items-center justify-between gap-5">
			<p className="w-full text-lg font-semibold">{name}:</p>
			<p className="w-full text-base font-light">{item}</p>
		</div>
	)
}
BirthdayItem.propTypes = {
	name: PropTypes.string.isRequired,
	item: PropTypes.string.isRequired,
}
