import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { BirthdayImage, BirthdayItem } from './Elements';

export const CardItem = ({data}) => {
	const [filteredBirthdays, setFilteredBirthdays] = useState([]);

	const transformDate = (dateString) => {
		const date = new Date(dateString);
		const timezoneOffset = date.getTimezoneOffset() * 60000;
		const adjustedDate = new Date(date.getTime() + timezoneOffset);
		const options = { day: 'numeric', month: 'long' };
		const formattedDate = adjustedDate.toLocaleDateString('es-ES', options);
		const currentYear = new Date().getFullYear();
		return `${formattedDate}, ${currentYear}`;
	};

	useEffect(() => {
		const currentMonth = new Date().getMonth();
		const filteredData = data.filter(user => {
			const userBirthdayMonth = new Date(user.profile.birthday).getMonth();
			return userBirthdayMonth === currentMonth;
		});
		setFilteredBirthdays(filteredData);
	}, [data]);

	return (
		<>
			{filteredBirthdays.map((item, index) => (
				<div key={index} className="bg-cv-primary overflow-hidden w-full max-w-md text-white rounded-xl shadow-lg shadow-cv-cyan/40">
					<div className="p-4 space-y-4">
						<BirthdayImage item={item} />
						<div className="space-y-2">
							<BirthdayItem name={'Cumpleaños'} item={transformDate(item.profile.birthday)} />
							<BirthdayItem name={'Departamento'} item={item.profile.department}/>
							<BirthdayItem name={'Núcleo'} item={item.profile.area}/>
							<BirthdayItem name={'Turno'} item={item.profile.shift} />
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