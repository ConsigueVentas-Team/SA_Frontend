import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';


export const Avatar = ({ onChange, value, remove }) => {
	const [avatarLocal, setAvatarLocal] = useState(null);
	const [draggedImage, setDraggedImage] = useState(null);

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarLocal(file);
			setDraggedImage(null);
			if (onChange) {
				onChange(file);
			}
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			if (file.type.includes('image')) {
				setDraggedImage(URL.createObjectURL(file));
				if (onChange) {
					onChange(file);
				}
			}
		}
	};

	const deleteImage = () => {
		setAvatarLocal(null);
		setDraggedImage(null);
		if (remove) {
			remove();
		}
	}

	return (
		<div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5">
			<div>
				{draggedImage || avatarLocal ? (
					<div className='w-40 h-40 relative'>
						<img src={draggedImage || URL.createObjectURL(avatarLocal)} className="w-40 h-40 mx-auto border rounded-full object-cover object-center" name="avatar" alt="" />
						<button onClick={deleteImage} type='button' className="absolute inline-flex items-center justify-center p-0.5 w-8 h-8 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full bottom-2 right-3 ">
							<DeleteIcon />
						</button>
					</div>
				) : (
					<AvatarDefault />
				)}
			</div>
			<label
				htmlFor="fileImage"
				className="w-full flex cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-2 py-8 transition-all hover:border-primary-300"
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
			>
				<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">
					<div className="text-gray-600 text-center md:text-start w-64">
						<p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
							{value ? `Seleccionaste: ${value.name}` : "Seleccione un archivo de imagen"}
						</p>
						<p className="text-xs md:text-sm text-gray-500">
							{value ? '' : "Formatos permitidos: JPG, JPEG, PNG"}
						</p>
					</div>
					<button className='active:scale-95 ease-in-out duration-300'>
						<label
							htmlFor="fileImage"
							className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150"
						>
							Seleccionar
						</label>
					</button>
				</div>
				<input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={handleAvatarChange} />
			</label>
		</div>
	)
}

Avatar.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	remove: PropTypes.func.isRequired,
}


export const AvatarDefault = () => {
	return (
		<div className="w-40 h-40 flex justify-center rounded-full overflow-hidden border">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="140"
				height="180"
				viewBox="0 0 140 160"
				className='fill-gray-400'
			>
				<path d="M70 80c22.09 0 40-17.91 40-40S92.09 0 70 0 30 17.91 30 40s17.91 40 40 40zM55.719 95C24.937 95 0 119.938 0 150.719A9.282 9.282 0 009.281 160H130.72a9.282 9.282 0 009.281-9.281C140 119.938 115.062 95 84.281 95zm0 0"></path>
			</svg>
		</div>
	)
}

export const InputText = ({ label, type, id, value, onChange }) => {
	const placeholderText = 'Ingrese ' + label.toLowerCase();
	return (
		<div className="w-full">
			<label htmlFor={id} className="block mb-1 font-medium text-gray-900 lowercase first-letter:uppercase">
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-500 font-semibold"
				placeholder={placeholderText}
			/>
		</div>
	);
}

InputText.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export const Select = ({ label, id, value, options, onChange, disabled = false }) => {
	return (
		<div className="w-full">
			<label htmlFor={id} className="block mb-1 font-medium text-gray-900 lowercase first-letter:uppercase">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300 bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-500 font-semibold"
			>
				<option>Selecciona</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

Select.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
}


export const SelectRole = ({ label, id, value, options, onChange }) => {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="block mb-1 font-medium text-gray-900"
			>
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				disabled={localStorage.getItem('rol') === 'Gerencia' ? false : (value === 1 ? true : false)}
				className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-500 font-semibold"

			>
				<option value="">Selecciona</option>
				{options.map((option) => (
					<option key={option.value} value={option.value} disabled={localStorage.getItem('rol') !== 'Gerencia' && option.value === 1}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

SelectRole.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
}

export const Switch = ({ label, id, value, onChange, statusValue, status_onChange }) => {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="block mb-1 font-medium text-gray-900"
			>
				{label}
			</label>
			<div className='w-full h-[41px] flex items-center gap-2 justify-between'>
				<label className="relative inline-flex items-center cursor-pointer">
					<input type="checkbox"
						id={id}
						value={value}
						checked={value}
						onChange={onChange}
						className="sr-only peer" />
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cv-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cv-cyan drop-shadow-md"></div>
					<span className="ml-3 text-sm font-medium text-cv-primary">
						{value === 1 ? 'Activo' : 'Inactivo'}
					</span>
				</label>
				{value === 0 && (
					<select
						value={statusValue}
						onChange={status_onChange}
						className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300 bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-500 font-semibold"
					>
						<option value="Termino su convenio">Termino Convenio</option>
						<option value="Retirado">Retirado</option>
					</select>
				)}
			</div>

		</div>
	)
}

Switch.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	statusValue: PropTypes.string.isRequired,
	status_onChange: PropTypes.func.isRequired,
}


export const ModalButton = ({ label, onClick, className }) => {
	return (
		<button
			className={`w-full py-2 px-8 rounded-md border-2 flex items-center justify-center text-xl font-semibold uppercase active:scale-95 ease-in-out duration-300 ${className}`}
			type="button"
			onClick={onClick}
		>
			{label}
		</button>
	)
}

ModalButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
}
