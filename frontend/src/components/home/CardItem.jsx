import { PropTypes } from 'prop-types';
import { BirthdayImage, BirthdayItem } from './Elements';

export const CardItem = ({data}) => {
	const transformDate = (dateString) => {
		const date = new Date(dateString);
		const timezoneOffset = date.getTimezoneOffset() * 60000;
		const adjustedDate = new Date(date.getTime() + timezoneOffset);
		const options = { day: 'numeric', month: 'long' };
		const formattedDate = adjustedDate.toLocaleDateString('es-ES', options);
		const currentYear = new Date().getFullYear();
		return `${formattedDate}, ${currentYear}`;
	};


	return (
		<>
			{data.map((item, index) => (
				<div key={index} className="bg-cv-primary overflow-hidden w-full max-w-md text-white rounded-xl shadow-lg shadow-cv-cyan/40">
					<div className="p-4 space-y-4">
						<BirthdayImage item={item} />
						<div className="space-y-2">
							<BirthdayItem name={'Cumpleaños'} item={transformDate(item.birthday)} />
							<BirthdayItem name={'Departamento'} item={item.position[0].core.department.name}/>
							<BirthdayItem name={'Núcleo'} item={item.position[0].core.name}/>
							<BirthdayItem name={'Turno'} item={item.shift} />
						</div>
					</div>
				</div>
			))}
		</>
	)
}

CardItem.propTypes = {
	data: PropTypes.array.isRequired,
}