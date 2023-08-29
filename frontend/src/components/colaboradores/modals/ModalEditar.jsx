import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { AES, enc } from "crypto-js";
import Person2Icon from '@mui/icons-material/Person2';
import CloseIcon from '@mui/icons-material/Close';
import { InputText, ModalButton, Select } from './ModalElements';

export const ModalEditar = ({ close, updateUser, user }) => {
	// UseStates de campos a insertar
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [dni, setDni] = useState('');
	const [departments, setDepartments] = useState([]);
	const [cores, setCores] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [cellphone, setCellphone] = useState('');
	const [shift, setShift] = useState('');
	const [birthday, setBirthday] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [avatarLocal, setAvatarLocal] = useState(null);
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [status, setStatus] = useState('')
	const [statusDescription, setStatusDescription] = useState('')
	// const [role, setRole] = useState('')

	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedCore, setSelectedCore] = useState('');
	const [selectedProfile, setSelectedProfile] = useState('');


	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)

	useEffect(() => {
		setName(user.name);
		setSurname(user.surname);
		setEmail(user.email);
		setDni(user.dni);
		setSelectedDepartment(user.position[0].core.department.id);
		setSelectedCore(user.position[0].core.id);
		setSelectedProfile(user.position[0].id)
		setCellphone(user.cellphone);
		setShift(user.shift);
		setBirthday(user.birthday);
		setAvatar(`${import.meta.env.VITE_BACKEND_SERVER_URL}/photos/${user.id}/${user.image}`);
		setDateStart(user.date_start);
		setDateEnd(user.date_end);
		setStatus(user.status);
		setStatusDescription(user.status_description);
		// setRole(user.role);
	}, [user]);

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

	const shiftOptions = [
		{ value: 'Mañana', label: 'Mañana' },
		{ value: 'Tarde', label: 'Tarde' },
	];

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleSurnameChange = (event) => {
		setSurname(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleDniChange = (event) => {
		setDni(event.target.value);
	};

	const handleProfileChange = (event) => {
		setSelectedProfile(event.target.value);
	};

	const handleCellphoneChange = (event) => {
		setCellphone(event.target.value)
	}

	const handleShiftChange = (event) => {
		setShift(event.target.value);
	};

	const handleBirthdayChange = (event) => {
		setBirthday(event.target.value);
	};

	// const handleImageChange = (file) => {
	// 	setAvatar(file);
	// };

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		setAvatar(file);
		setAvatarLocal(file)
	};

	const handleDateStartChange = (event) => {
		setDateStart(event.target.value);
	};

	const handleDateEndChange = (event) => {
		setDateEnd(event.target.value);
	}

	const handleStatusChange = (event) => {
		//setStatus(event.target.checked ? 1 : 0);
		const newStatus = event.target.checked ? 1 : 0;
		setStatus(newStatus);
		setStatusDescription(newStatus === 1 ? 'NULL' : 'Termino su convenio');
	};

	const handleStatusDescriptionChange = (event) => {
		setStatusDescription(event.target.value);
	}

	// const handleRoleChange = (event) => {
	// 	setRole(event.target.value);
	// };

	const handleSubmit = (event) => {
		event.preventDefault();

		const usuarioEditado = {
			...user,
			name,
			surname,
			email,
			dni,
			selectedProfile,
			cellphone,
			shift,
			birthday,
			avatar,
			dateStart,
			dateEnd,
			// status,
			// statusDescription,
			//Responsible,
			// role,
		};


		updateUser(usuarioEditado);
		console.log(usuarioEditado)
	};

	return (
		<>
			<div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
				<div className="relative w-full max-w-2xl max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 border-b border-cv-primary rounded-t">
							<h3 className="text-xl font-semibold text-cv-primary inline-flex items-center gap-2">
								<Person2Icon />
								Editar Colaborador
							</h3>
							<button type="button" onClick={close} className="text-cv-secondary bg-transparent hover:bg-cv-primary hover:text-cv-cyan rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center active:scale-95 ease-in-out duration-300">
								<CloseIcon sx={{ fontSize: 32 }} />
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="relative p-2 md:p-6 flex-auto space-y-4">
							{/* <Avatar
								onChange={handleImageChange}
								value={avatar}
								remove={() => setAvatar(null)}
							/> */}
							<div className="mx-auto w-full">
								<label
									htmlFor="fileImage"
									className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
								>
									<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">

										<img src={avatarLocal ? URL.createObjectURL(avatarLocal) : avatar} className="rounded-md w-16 h-16" name="avatar" alt="" />
										<div className="text-gray-600 text-center md:text-start">
											<p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
												{avatarLocal ? avatarLocal.name : "Seleccione una nueva imagen"}
											</p>
											<p className="text-xs md:text-sm text-gray-500">
												{avatarLocal ? '' : "Formatos permitidos: JPG, JPEG, PNG"}
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
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
								<div className="w-full flex flex-col space-y-1">
									<InputText
										label="Nombres completos"
										type="text"
										id="names"
										value={name}
										onChange={handleNameChange}
									/>
									<InputText
										label="Apellidos completos"
										type="text"
										id="surnames"
										value={surname}
										onChange={handleSurnameChange}
									/>
									<InputText
										label="DNI"
										type="number"
										id="dni"
										value={dni}
										onChange={handleDniChange}
									/>
									<InputText
										label="Fecha de nacimiento"
										type="date"
										id="birthday"
										value={birthday}
										onChange={handleBirthdayChange}
									/>
									<InputText
										label="Correo electrónico"
										type="email"
										id="email"
										value={email}
										onChange={handleEmailChange}
									/>
									<InputText
										label="Teléfono"
										type="tel"
										id="telephone"
										value={cellphone}
										onChange={handleCellphoneChange}
									/>
									<div className="w-full">
										<span
											className="block mb-1 font-medium text-gray-900"
										>
											Estado
										</span>
										<div className='w-full h-[41px] flex items-center gap-2 justify-between'>
											<label className="relative inline-flex items-center cursor-pointer">
												<input type="checkbox" value={status} checked={status} onChange={handleStatusChange} className="sr-only peer" />
												<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cv-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cv-cyan drop-shadow-md"></div>
												<span className="ml-3 text-sm font-medium text-cv-primary">
													{status === 1 ? 'Activo' : 'Inactivo'}
												</span>
											</label>
											{status === 0 && (
												<select
													value={statusDescription}
													onChange={handleStatusDescriptionChange}
													className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300 bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-500 font-semibold"
												>
													<option value="Termino su convenio">Termino Convenio</option>
													<option value="Retirado">Retirado</option>
												</select>
											)}
										</div>

									</div>
								</div>
								<div className="w-full flex flex-col space-y-1">
									<Select
										label="Departamento"
										id="department"
										value={selectedDepartment}
										options={departmentOptions}
										onChange={(e) => {
											setSelectedDepartment(e.target.value);
											setSelectedCore('');
										}}
									/>
									<Select
										label="Núcleo"
										id="core"
										value={selectedCore}
										options={coreOptions}
										onChange={(e) => setSelectedCore(e.target.value)}
										disabled={!selectedDepartment}
									/>
									<Select
										label="Perfil"
										id="profile"
										value={selectedProfile}
										options={profileOptions}
										onChange={handleProfileChange}
										disabled={!selectedCore}
									/>
									<Select
										label="Turno"
										id="shift"
										value={shift}
										options={shiftOptions}
										onChange={handleShiftChange}
									/>
									<InputText
										label="Fecha de ingreso"
										type="date"
										id="date_entry"
										value={dateStart}
										onChange={handleDateStartChange}
									/>
									<InputText
										label="Fecha de finalización"
										type="date"
										id="date_finalization"
										value={dateEnd}
										onChange={handleDateEndChange}
									/>
								</div>
							</div>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-cv-primary rounded-b gap-2 md:gap-4">
							<ModalButton label="Cancelar" onClick={close} className="text-cv-primary bg-white border-cv-primary hover:text-white hover:bg-cv-primary" />
							<ModalButton label="Guardar" onClick={handleSubmit} className="text-white bg-cv-primary border-cv-primary hover:bg-cv-primary" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
ModalEditar.propTypes = {
	close: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}