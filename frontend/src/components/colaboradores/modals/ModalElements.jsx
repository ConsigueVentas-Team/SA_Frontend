import PropTypes from 'prop-types';

export const InputText = ({ label, type, id, value, onChange }) => {
	const placeholderText = 'Ingrese '+label.toLowerCase();
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



export const Select = ({ label, id, value, options, onChange }) => {
	return (
		<div className="w-full">
			<label htmlFor={id} className="block mb-1 font-medium text-gray-900 lowercase first-letter:uppercase">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
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
}