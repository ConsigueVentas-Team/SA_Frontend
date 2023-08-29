import { useState } from "react";
import PropTypes from 'prop-types';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const ButtonAdd = ({ onClick }) => {
	return (
		<>
			<button
				onClick={onClick}
				className="w-full p-2 rounded-md text-cv-primary bg-cv-cyan hover:bg-cv-cyan/90 active:bg-cv-cyan/75 font-semibold flex items-center justify-center text-lg capitalize active:scale-95 ease-in-out duration-300"
			>
				<PersonAddIcon />
				<p className="ml-2 whitespace-nowrap md:hidden">Agregar</p>
			</button>
		</>
	)
}

ButtonAdd.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export const SearchBar = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchInputChange = (event) => {
		setSearchValue(event.target.value);
	}

	// useEffect(() => {
	// 	if (searchValue.trim() === '') {
	// 		onSearch('');
	// 	}
	// }, [searchValue, onSearch]);

	const handleSearchButtonClick = () => {
		if (searchValue.trim() !== '') {
			onSearch(searchValue);
		}
	}

	return (
		<>
			<div className="relative flex w-full flex-wrap items-stretch">
				<input
					type="search"
					onChange={handleSearchInputChange}
					value={searchValue}
					className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l-md border border-solid border-cv-primary bg-transparent bg-clip-padding p-2 text-base font-normal leading-relaxed text-cv-cyan outline-none transition duration-200 ease-in-out"
					placeholder="Buscar por nombre" />
				<button
					// onClick={handleSearchButtonClick}
					className="relative z-[2] flex items-center rounded-r-md px-6 py-1.5 text-xs font-bold uppercase leading-tight text-cv-primary shadow-md bg-cv-cyan hover:bg-cv-cyan/90 active:bg-cv-cyan/75 active:shadow-lg active:scale-95 ease-in-out duration-300"
					type="button">
					<SearchIcon sx={{ fontSize: 24 }} />
				</button>
			</div>
		</>
	)
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
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
				<option>{label}</option>
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


export const ButtonClean = ({onClick}) => {
	return (
		<>
			<button
				onClick={onClick}
				className="w-full p-2 rounded-md text-cv-primary bg-cv-cyan hover:bg-cv-cyan/90 active:bg-cv-cyan/75 font-semibold flex items-center justify-center text-lg capitalize active:scale-95 ease-in-out duration-300"
			>
				<CleaningServicesIcon />
				<p className="ml-2 whitespace-nowrap md:hidden">Limpiar</p>
			</button>
		</>
	)
}
ButtonClean.propTypes={
	onClick: PropTypes.func.isRequired,
}