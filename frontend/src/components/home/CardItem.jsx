import { PropTypes } from 'prop-types';
import { BirthdayImage, BirthdayItem, Cake, Gift } from './Elements';

export const CardItem = ({ data }) => {
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
				<div key={index} className="w-full overflow-hidden text-white shadow-lg bg-cv-primary rounded-xl shadow-cv-cyan/40">
					<div className="relative flex items-center">

						<div className='z-10 flex items-center justify-between gap-5 p-4'>
							<div className='w-28 md:w-40 '>
								<BirthdayImage item={item} />
							</div>
							<div className="w-full">
								<h2 className="text-white text-lgfont-semibold md:text-2xl ">{`${item.name.split(" ")[0]} ${item.surname.split(" ")[0]}`}</h2>
								<BirthdayItem name={'Cumpleaños'} item={transformDate(item.birthday)} />
								<BirthdayItem name={'Departamento'} item={item.position[0].core.department.name} />
								<BirthdayItem name={'Núcleo'} item={item.position[0].core.name} />
								<BirthdayItem name={'Perfil'} item={item.position[0].name} />
							</div>
						</div>
						<div className='absolute w-full h-full -z-0'>
							<div className='absolute w-20 rotate-45 md:w-24 -right-2 -top-2 -z-0'><Gift /></div>
							<div className='absolute bottom-0 w-16 md:w-20 right-4 -z-0'><Cake /></div>
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