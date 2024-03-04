import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


export const ProfileItem = ({ label, value }) => {
	return (
		<div className='w-full '>
			<span className="text-sm text-gray-400">{label}:</span>
			<p className='text-base md:text-xl font-semibold leading-tight'>
				{value}
			</p>
		</div>
	)
}

ProfileItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
}

export const ProfileAvatar = ({ image }) => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<img src={image} alt="" className='w-60 h-60 flex items-center justify-center rounded-full ring ring-cv-cyan object-cover bg-cv-primary' />
		</div>
	)
}

ProfileAvatar.propTypes = {
	image: PropTypes.string.isRequired
}

export const ProfileTitle = ({ children }) => {
	return (
		<h2 className='text-xl mb-5 font-semibold text-center uppercase'>{children}</h2>
	)
}

ProfileTitle.propTypes = {
	children: PropTypes.string.isRequired
}

export const ProfileGrafic = ({ asistencia, tardanza, justificacion, falta }) => {
	return (
		<div className='w-full'>
			<ResponsiveContainer width="100%" height={270} className="mx-auto">
				<BarChart
					data={[
						{ name: 'A', Asistencias: asistencia },
						{ name: 'T', Tardanzas: tardanza },
						{ name: 'J', Justificaciones: justificacion },
						{ name: 'F', Faltas: falta },
					]}
					barSize={40}
				>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="0 1" />
					<Tooltip />
					<Legend />
					<Bar dataKey="Asistencias" fill="#4CAF50" />
					<Bar dataKey="Tardanzas" fill="#FFC300" />
					<Bar dataKey="Justificaciones" fill="#36A2EB" />
					<Bar dataKey="Faltas" fill="#FF5733" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

ProfileGrafic.propTypes = {
	asistencia: PropTypes.number.isRequired,
	tardanza: PropTypes.number.isRequired,
	justificacion: PropTypes.number.isRequired,
	falta: PropTypes.number.isRequired
}
