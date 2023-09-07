
import { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import { AES, enc } from "crypto-js";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Button, ModalAgregar, ModalEditar, SearchBar, SelectOption, Tabla } from '../../components/colaboradores';

export const Colaboradores = () => {
	const [users, setUsers] = useState([]);
	const [pagination, setPagination] = useState({
		current_page: 1,
		last_page: 1,
		per_page: 10,
		total: 0,
	});

	const [departments, setDepartments] = useState([]);
	const [cores, setCores] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedCore, setSelectedCore] = useState('');
	const [selectedProfile, setSelectedProfile] = useState('');

	const [name, setName] = useState('');
	const [shift, setShift] = useState('');
	const [department, setDepartment] = useState('');
	const [core, setCore] = useState('');
	const [position, setPosition] = useState('');


	const [showAgregarModal, setShowAgregarModal] = useState(false);
	const [showEditarModal, setShowEditarModal] = useState(false)
	const [selectUser, setSelectUser] = useState(null)



	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)

	const toggleAgregarModal = () => {
		setShowAgregarModal(!showAgregarModal);
	};

	const toggleEditarModal = (usuario) => {
		setShowEditarModal(!showEditarModal);
		setSelectUser(usuario);
	}

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
		setPosition(event.target.value)
	};

	const handleShiftChange = (event) => {
		setShift(event.target.value);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};


	// useEffect(() => {
	// 	obtenerUsuarios();
	// }, []);

	useEffect(() => {
		obtenerUsuarios(shift, position, department, core, name);
	}, [shift, position, department, core, name]);

	//* Listar Colaboradores
	const obtenerUsuarios = async (page) => {
		try {
			const url = new URL(import.meta.env.VITE_API_URL + '/users');

			url.searchParams.append('page', page);

			if (shift) url.searchParams.append('shift', shift);
			if (position) url.searchParams.append('position', position);
			if (department) url.searchParams.append('department', department);
			if (core) url.searchParams.append('core', core);
			if (name) url.searchParams.append('name', name);

			console.log(url)

			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			if (response.ok) {
				setUsers(data.data);
				setPagination(data);
			} else {
				console.error('Error al obtener los usuarios:', data.error);
			}
		} catch (error) {
			console.error('Error al obtener los usuarios:', error);
		}
	};

	//* Agregar Colaborador
	const agregarUsuario = async (newUser) => {

		const formData = new FormData();
		formData.append('name', newUser.name);
		formData.append('surname', newUser.surname);
		formData.append('email', newUser.email);
		formData.append('dni', newUser.dni);
		formData.append('position_id', newUser.selectedProfile);
		formData.append('cellphone', newUser.cellphone);
		formData.append('shift', newUser.shift);
		formData.append('birthday', newUser.birthday);
		formData.append('image', newUser.avatar);
		formData.append('date_start', newUser.dateStart);
		formData.append('date_end', newUser.dateEnd);

		fetch(import.meta.env.VITE_API_URL + '/register', {
			method: 'POST',
			body: formData,
		})
			.then(response => {
				if (response.ok) {
					setShowAgregarModal(!showAgregarModal);
					toast.success('Usuario agregado exitosamente');
					obtenerUsuarios();
				} else {
					throw new Error('Error al guardar los datos');
				}
			})
			.catch(error => {
				toast.error(`Error al agregar usuario: ${error}`)
			});
	};

	//* Editar Colaborador
	const editarUsuario = async (updateUser) => {

		const formData = new FormData();
		formData.append('name', updateUser.name);
		formData.append('surname', updateUser.surname);
		formData.append('email', updateUser.email);
		formData.append('dni', updateUser.dni);
		formData.append('position_id', updateUser.selectedProfile);
		formData.append('cellphone', updateUser.cellphone);
		formData.append('shift', updateUser.shift);
		formData.append('birthday', updateUser.birthday);
		formData.append('date_start', updateUser.dateStart);
		formData.append('date_end', updateUser.dateEnd);
		// formData.append('image', updateUser.avatar);
		formData.append('role_id', updateUser.role);
		formData.append('status', updateUser.status);
		formData.append('status_description', updateUser.statusDescription);
		formData.append('_method', 'PUT');

		try {
			const response = await fetch(import.meta.env.VITE_API_URL + `/users/${updateUser.id}/update`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				const usuariosActualizados = users.map((usuario) => {
					if (usuario.id === updateUser.id) {
						return {
							...usuario,
							...updateUser,
						};
					}
					return usuario;
				});
				setUsers(usuariosActualizados);
				toast.success('Datos de usuario modificado exitosamente');
				setShowEditarModal(!showEditarModal);
				obtenerUsuarios();
			} else {
				toast.error(`Error al modificar usuario: ${data.error}`);
				setShowEditarModal(!showEditarModal);
			}
		} catch (error) {
			toast.error(`Error al modificar: ${error}`);
			setShowEditarModal(!showEditarModal);
		}
	};

	//* Paginación
	const handlePageChange = (newPage) => {
		obtenerUsuarios(newPage);
	};

	//* Filtrado
	const handleClearFilter = () => {
		setShift('');
		setPosition('');
		setDepartment('');
		setCore('');
		setName('');
		setSelectedDepartment('');
		setSelectedCore('');
		setSelectedProfile('');
	}

	return (
		<>
			<section className="w-full flex flex-col justify-center items-center gap-4">
				<h1 className="w-full inline-flex items-center text-base font-medium uppercase text-white">
					<Diversity3Icon />
					<span className='ml-1 text-base font-medium md:ml-2'>Colaboradores</span>
				</h1>

				<div className="w-full grid grid-cols-1 md:grid-cols-9 gap-2 gap-x-0 md:gap-4">
					<div className="col-span-1 md:col-span-8 row-start-2 md:row-start-1">
						<SearchBar
							value={name}
							onChange={handleNameChange}
						/>
					</div>
					<div className="col-span-2 md:col-start-1 md:row-start-2">
						<SelectOption
							label="Departamento"
							value={selectedDepartment}
							options={departmentOptions}
							onChange={(e) => {
								setSelectedDepartment(e.target.value);
								setSelectedCore('');
								setDepartment(e.target.value);
							}}
						/>
					</div>
					<div className="col-span-2 md:col-start-3 md:row-start-2">
						<SelectOption
							label="Núcleo"
							value={selectedCore}
							options={coreOptions}
							onChange={(e) => {
								setSelectedCore(e.target.value);
								setCore(e.target.value);
							}
							}
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
							value={shift} onChange={handleShiftChange}
							className="w-full box-border w-50 h-50 border border-cv-primary bg-cv-secondary rounded-md p-2 outline-none"
						>
							<option value="">Turno</option>
							<option value="Mañana">Mañana</option>
							<option value="Tarde">Tarde</option>
						</select>
					</div>
					<div className="col-span-1 md:col-start-9 row-start-1 md:row-start-1">
						<Button title="Agregar colaborador" onClick={toggleAgregarModal} label='Agregar' icon={<PersonAddIcon />} />
					</div>
					<div className="col-span-1 md:col-start-9 row-start-7 md:row-start-2">
						{/* <div className='w-full flex flex-col items-center justify-between gap-2 sm:flex-row '>
							<Button title="Aplicar filtros" onClick={handleSearchClick} label='Buscar' icon={<SearchIcon />} />
						</div> */}
						<Button title="Limpiar filtros" onClick={() => { handleClearFilter(); handleClearFilter(); }} label='Limpiar' icon={<CleaningServicesIcon />} />
					</div>
				</div>

				<div className="w-full">
					<Tabla data={users} pagination={pagination} handlePageChange={handlePageChange} toggleEditarModal={toggleEditarModal} />
				</div>
				<Toaster />
			</section >
			{showAgregarModal &&
				<ModalAgregar close={toggleAgregarModal} addUser={agregarUsuario} />
			}
			{showEditarModal &&
				<ModalEditar close={toggleEditarModal} updateUser={editarUsuario} user={selectUser} />
			}
		</>
	)
}
