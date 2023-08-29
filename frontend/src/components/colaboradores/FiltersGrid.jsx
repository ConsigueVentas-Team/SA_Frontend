import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import { ButtonAdd, ButtonClean, SearchBar, SelectOption } from "./Elements"


export const FiltersGrid = ({toggleAgregarModal}) => {

	const [departments, setDepartments] = useState([]);
	const [cores, setCores] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedCore, setSelectedCore] = useState('');
	const [selectedProfile, setSelectedProfile] = useState('');

	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)

	//** Rellenar Select Options */
	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + "/departments/list", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setDepartments(data));

		fetch(import.meta.env.VITE_API_URL + "/cores/list", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setCores(data));

		fetch(import.meta.env.VITE_API_URL + "/position/list", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setProfiles(data));
	}, [token]);

	const departmentOptions = departments.map((department) => ({
		value: department.id,
		label: department.name
	}));

	const coreOptions = cores
		.filter((core) => core.department_id === parseInt(selectedDepartment))
		.map((core) => ({
			value: core.id,
			label: core.name
		}));

	const profileOptions = profiles
		.filter((profile) => profile.core_id === parseInt(selectedCore))
		.map((profile) => ({
			value: profile.id,
			label: profile.name
		}));
	const handleProfileChange = (event) => {
		setSelectedProfile(event.target.value);
		console.log(event.target.value);
	};

	return (
		<>
			<div className="w-full grid grid-cols-1 md:grid-cols-9 gap-2 gap-x-0 md:gap-4">
				<div className="col-span-1 md:col-span-8 row-start-2 md:row-start-1">
					<SearchBar />
				</div>
				<div className="col-span-2 md:col-start-1 md:row-start-2">
					<SelectOption
						label="Departamento"
						value={selectedDepartment}
						options={departmentOptions}
						onChange={(e) => {
							setSelectedDepartment(e.target.value);
							setSelectedCore('');
						}}
					/>
				</div>
				<div className="col-span-2 md:col-start-3 md:row-start-2">
					<SelectOption
						label="Núcleo"
						value={selectedCore}
						options={coreOptions}
						onChange={(e) => setSelectedCore(e.target.value)}
						disabled={!selectedDepartment}
					/>
				</div>
				<div className="col-span-2 md:col-start-5 md:row-start-2">
					<SelectOption
						label="Perfil"
						value={selectedProfile}
						options={profileOptions}
						onChange={handleProfileChange}
						disabled={!selectedCore}
					/>

				</div>
				<div className="col-span-2 md:col-start-7 md:row-start-2">
					<select
						// value={shift} onChange={(e) => setShift(e.target.value)}
						className="w-full box-border w-50 h-50 border border-cv-primary bg-cv-secondary rounded-md p-2 outline-none"
					>
						<option>Turno</option>
						<option value="Mañana">Mañana</option>
						<option value="Tarde">Tarde</option>
					</select>
				</div>
				<div className="col-span-1 md:col-start-9 row-start-1 md:row-start-1">
					<ButtonAdd onClick={toggleAgregarModal} />
				</div>
				<div className="col-span-1 md:col-start-9 row-start-7 md:row-start-2">
					<ButtonClean onClick="" />
				</div>
			</div>
		</>
	)
}

FiltersGrid.propTypes = {
	onSearch: PropTypes.func.isRequired,
	toggleAgregarModal: PropTypes.func.isRequired,
}