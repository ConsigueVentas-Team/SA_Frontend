
import PropTypes from 'prop-types';
import Tooltip from "@mui/material/Tooltip";

export const SearchBar = ({ value, onChange }) => {

	return (
		<>
			<div className="relative flex w-full flex-wrap items-stretch">
				<input
					type="text"
					value={value}
					onChange={onChange}
					className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-md border border-solid border-cv-primary bg-transparent bg-clip-padding p-2 text-base font-normal leading-relaxed text-cv-cyan outline-none transition duration-200 ease-in-out"
					placeholder="Buscar por nombre o apellido" />
			</div>
		</>
	)
}

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export const SelectOption = ({ label, value, options, onChange, disabled = false }) => {
	return (
		<div className="w-full">
			<select
				value={value}
				onChange={onChange}
				disabled={disabled}
				className="w-full box-border w-50 h-50 border border-cv-primary bg-cv-secondary rounded-md p-2 outline-none"
			>
				<option value={''}>{label}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

SelectOption.propTypes = {
	label: PropTypes.string.isRequired,
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


export const Button = ({ onClick, icon, label, title }) => {
	return (
		<>
			<Tooltip title={title}>
				<button
					onClick={onClick}
					className="w-full p-2 rounded-md text-cv-primary bg-cv-cyan hover:bg-cv-cyan/90 active:bg-cv-cyan/75 font-semibold flex items-center justify-center text-lg capitalize active:scale-95 ease-in-out duration-300"
				>

					{icon}
					<p className="ml-2 whitespace-nowrap md:hidden">{label}</p>
				</button>
			</Tooltip>
		</>
	)
}
Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}