import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { AES, enc } from "crypto-js";
import Person2Icon from '@mui/icons-material/Person2';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, InputText, ModalButton, Select, SelectRole, Switch } from './ModalElements';

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
	const [avatarUrl, setAvatarUrl] = useState('');
	const [imageUrl, setImageUrl] = useState(null);
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [status, setStatus] = useState('')
	const [statusDescription, setStatusDescription] = useState('')
	const [role, setRole] = useState('')

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
		setAvatar(user.image);
		setAvatarUrl(user.image_url);
		setDateStart(user.date_start);
		setDateEnd(user.date_end);
		setStatus(user.status);
		setStatusDescription(user.status_description);
		setRole(user.roles[0].id);
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

	const roleOptions = [
		{ value: 1, label: 'Gerencia' },
		{ value: 2, label: 'Lider Nucleo' },
		{ value: 3, label: 'Colaborador' },
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

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setAvatar(file);
		setImageUrl(URL.createObjectURL(file));
	};

	const handleDateStartChange = (event) => {
		setDateStart(event.target.value);
	};

	const handleDateEndChange = (event) => {
		setDateEnd(event.target.value);
	}

	const handleStatusChange = (event) => {
		const newStatus = event.target.checked ? 1 : 0;
		setStatus(newStatus);
		setStatusDescription(newStatus === 1 ? ' ' : 'Termino su convenio');
	};

	const handleStatusDescriptionChange = (event) => {
		setStatusDescription(event.target.value);
	}

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

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
			status,
			statusDescription,
			role,
		};


		updateUser(usuarioEditado);
	};

	return (
		<>
			<div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
				<div className="relative w-full max-w-2xl max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 border-b rounded-t border-cv-primary">
							<h3 className="inline-flex items-center gap-2 text-xl font-semibold text-cv-primary">
								<Person2Icon />
								Editar Colaborador
							</h3>
							<button type="button" onClick={close} className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm duration-300 ease-in-out bg-transparent rounded-lg text-cv-secondary hover:bg-cv-primary hover:text-cv-cyan active:scale-95">
								<CloseIcon sx={{ fontSize: 32 }} />
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="relative flex-auto p-2 space-y-4 md:p-6">
							{/* <Avatar
								onChange={handleImageChange}
								value={avatar}
								remove={() => setAvatar(null)}
							/> */}

							<div className="flex flex-col items-center justify-between w-full gap-5 sm:flex-row">
								<div>
									{imageUrl ? (
										<div className='relative w-40 h-40'>
											<img
												src={imageUrl}
												className="object-cover object-center w-40 h-40 mx-auto border rounded-full" name="avatar" alt="" />
										</div>
									) : (
										<div className='relative w-40 h-40'>
											<img src={avatarUrl} className="object-cover object-center w-40 h-40 mx-auto border rounded-full" name="avatar" alt="" />
										</div>
									)}
								</div>
								<label
									htmlFor="fileImage"
									className="flex items-center justify-center w-full p-2 py-8 transition-all border-2 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-300"
								>
									<div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
										<div className="w-64 text-center text-gray-600 md:text-start">
											<p className="text-xs font-medium md:text-base text-cv-secondary hover:text-cv-primary">
												{avatar ? `Seleccionaste: ${avatar}` : "Seleccione un archivo de imagen"}
											</p>
											<p className="text-xs text-gray-500 md:text-sm">
												{avatar ? '' : "Formatos permitidos: JPG, JPEG, PNG"}
											</p>
										</div>
										<button className='duration-300 ease-in-out active:scale-95'>
											<label
												htmlFor="fileImage"
												className="flex items-center justify-center px-4 py-2 text-sm font-semibold uppercase transition-all duration-150 ease-linear bg-white border-2 rounded-md text-cv-primary border-cv-primary hover:text-white hover:bg-cv-primary"
											>
												Seleccionar
											</label>
										</button>
									</div>
									<input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={handleImageChange} />
								</label>
							</div>


							< div className="grid grid-cols-1 gap-8 sm:grid-cols-2" >
								<div className="flex flex-col w-full space-y-1">
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
									<Switch
										label="Estado"
										id="status"
										value={status}
										onChange={handleStatusChange}
										statusValue={statusDescription}
										status_onChange={handleStatusDescriptionChange}
									/>
								</div>
								<div className="flex flex-col w-full space-y-1">
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
									<SelectRole
										label="Rol"
										id="role"
										value={role}
										options={roleOptions}
										onChange={handleRoleChange}
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
							</div >
						</div >
						{/* <!-- Modal footer --> */}
						< div className="flex flex-col-reverse items-center justify-between gap-2 p-2 border-t border-solid rounded-b md:flex-row md:p-6 border-cv-primary md:gap-4" >
							<ModalButton label="Cancelar" onClick={close} className="bg-white text-cv-primary border-cv-primary hover:text-white hover:bg-cv-primary" />
							<ModalButton label="Guardar" onClick={handleSubmit} className="text-white bg-cv-primary border-cv-primary hover:bg-cv-primary" />
						</div >
					</div >
				</div >
			</div >
		</>
	)
}
ModalEditar.propTypes = {
	close: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}