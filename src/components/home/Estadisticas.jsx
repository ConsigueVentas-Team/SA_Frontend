import PropTypes from 'prop-types';

export const Estadisticas = ({ data }) => {
	return (
		<div
			className="w-full flex items-center justify-between gap-4 bg-cv-primary text-white rounded-md p-5"
		>
			<div className="w-full flex items-center justify-center">
				{data.icon} 
			</div>
			<div className="w-full flex flex-col items-center justify-center gap-4">
				<h3 className="text-lg">{data.title}</h3>
				<h2 className="text-4xl font-bold">{data.item}</h2>
			</div>
		</div>
	)
}
Estadisticas.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		item: PropTypes.number.isRequired,
	}).isRequired,
};