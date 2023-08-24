import { useState } from "react";
import PropTypes from 'prop-types';
import { ButtonAdd, ButtonClean, SearchBar, SelectOption } from "./Elements"


export const FiltersGrid = ({ onSearch, toggleAgregarModal }) => {

	const data = [
		{
			label: "Administrativo",
			value: 1,
			núcleo: [
				{
					label: "Administración",
					value: 1,
					perfil: [
						{ label: "Líder de Perfil Administrativo", value: 1 },
						{ label: "Asistente Administrativo", value: 2 },
					],
				},
				{
					label: "Talento Humano",
					value: 2,
					perfil: [
						{ label: "Líder de Perfil de Talento Humano", value: 3 },
						{ label: "Asistente de Talento Humano", value: 4 },
					],
				},
			],
		},
		{
			label: "Comercial",
			value: 2,
			núcleo: [
				{
					label: "Comercial",
					value: 3,
					perfil: [
						{ label: "Asistente Comercial", value: 5 },
						{ label: "Asistente de Logística", value: 6 },
					],
				},
				{
					label: "Publicidad Digital",
					value: 4,
					perfil: [
						{ label: "Asistente de Publicidad Digital", value: 7 },
						{ label: "Líder de Perfil de Publicidad Digital", value: 8 },
					],
				},
			],
		},
		{
			label: "Operativo",
			value: 3,
			núcleo: [
				{
					label: "Creativo",
					value: 5,
					perfil: [
						{ label: "Líder de Núcleo Creativo", value: 9 },
						{ label: "Diseñador Gráfico", value: 10 },
					],
				},
				{
					label: "Sistemas",
					value: 6,
					perfil: [
						{ label: "Líder de Perfil de Sistemas", value: 11 },
						{ label: "Analista de Documentación", value: 12 },
					],
				},
			],
		},
	];

	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedNucleo, setSelectedNucleo] = useState('');
	const [selectedPerfil, setSelectedPerfil] = useState('');

	const handleDepartmentSelect = (value) => {
		setSelectedDepartment(value);
		setSelectedNucleo('');
		setSelectedPerfil('');
	};

	const handleNucleoSelect = (value) => {
		setSelectedNucleo(value);
		setSelectedPerfil('');
	};

	const handlePerfilSelect = (value) => {
		setSelectedPerfil(value);
	};

	const clearFilter = () => {
		setSelectedDepartment('');
		setSelectedNucleo('');
		setSelectedPerfil('');
		onSearch('');
	};


	return (
		<>
			<div className="w-full grid grid-cols-1 md:grid-cols-9 gap-2 gap-x-0 md:gap-4">
				<div className="col-span-1 md:col-span-8 row-start-2 md:row-start-1">
					<SearchBar onSearch={onSearch} />
				</div>
				<div className="col-span-2 md:col-start-1 md:row-start-2">
					<SelectOption
						options={data}
						title={"Departamento"}
						onSelect={handleDepartmentSelect}
					/>
				</div>
				<div className="col-span-2 md:col-start-3 md:row-start-2">
					<SelectOption
						options={
							data.find((dept) => dept.value === selectedDepartment)?.núcleo ||
							[]
						}
						title={"Núcleo"}
						onSelect={handleNucleoSelect}
					/>
				</div>
				<div className="col-span-2 md:col-start-5 md:row-start-2">
					<SelectOption
						options={
							data
								.find((dept) => dept.value === selectedDepartment)
								?.núcleo.find((nucleo) => nucleo.value === selectedNucleo)
								?.perfil || []
						}
						title={"Perfil"}
						onSelect={handlePerfilSelect}
					/>

				</div>
				<div className="col-span-2 md:col-start-7 md:row-start-2">
					<select
						className="w-full box-border w-50 h-50 border border-cv-primary bg-cv-secondary rounded-md p-2 outline-none"
					>
						<option>Turno</option>
						<option value="1">Mañana</option>
						<option value="2">Tarde</option>
					</select>
				</div>
				<div className="col-span-1 md:col-start-9 row-start-1 md:row-start-1">
					<ButtonAdd onClick={toggleAgregarModal}/>
				</div>
				<div className="col-span-1 md:col-start-9 row-start-7 md:row-start-2">
					<ButtonClean onClick={clearFilter}/>
				</div>
			</div>
		</>
	)
}

FiltersGrid.propTypes = {
	onSearch: PropTypes.func.isRequired,
	handleButtonClick: PropTypes.func.isRequired,
}