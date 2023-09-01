
import { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import { AES, enc } from "crypto-js";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { FiltersGrid, ModalAgregar, ModalEditar, Tabla } from '../../components/colaboradores';

export const Colaboradores = () => {
	const [users, setUsers] = useState([]);
	const [shift, setShift] = useState("");
	const [department, setDepartment] = useState("");
	const [name, setName] = useState("");
	const [core, setCore] = useState("");
	const [position, setPosition] = useState('')
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

	useEffect(() => {
		obtenerUsuarios();
	}, []);

	const obtenerUsuarios = async () => {
		try {
			const url = new URL(import.meta.env.VITE_API_URL + "/users");
			const params = { shift, department, name, core, position };
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (response.ok) {
				setUsers(data.data);
			} else {
				console.error('Error al obtener los usuarios:', data.error);
			}
		} catch (error) {
			console.error('Error al obtener los usuarios:', error);
		}
	};

	//* Agregar Colaborador

	const agregarUsuario = async (nuevoUsuario) => {

		const formData = new FormData();
		formData.append('name', nuevoUsuario.name);
		formData.append('surname', nuevoUsuario.surname);
		formData.append('email', nuevoUsuario.email);
		formData.append('dni', nuevoUsuario.dni);
		formData.append('position_id', nuevoUsuario.selectedProfile);
		formData.append('cellphone', nuevoUsuario.cellphone);
		formData.append('shift', nuevoUsuario.shift);
		formData.append('birthday', nuevoUsuario.birthday);
		formData.append('image', nuevoUsuario.avatar);
		formData.append('date_start', nuevoUsuario.dateStart);
		formData.append('date_end', nuevoUsuario.dateEnd);

		fetch(import.meta.env.VITE_API_URL + '/register', {
			method: 'POST',
			body: formData,
		})
			.then(response => {
				if (response.ok) {
					setShowAgregarModal(!showAgregarModal);
					toast.success('Usuario agregado exitosamente');
					console.log('agregado exitosamente')
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
		formData.append('status', updateUser.status);
		formData.append('status_description', updateUser.statusDescription);
		formData.append('_method', 'PUT');
		formData.append('role_id', updateUser.role);
		formData.append('image', updateUser.avatar);


		try {
			const response = await fetch(import.meta.env.VITE_API_URL + `/users/${updateUser.id}/update`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			const data = await response.json();
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

	return (
		<>
			<section className="w-full flex flex-col justify-center items-center gap-4">
				<h1 className="w-full inline-flex items-center text-base font-medium uppercase text-white">
					<Diversity3Icon />
					<span className='ml-1 text-base font-medium md:ml-2'>Colaboradores</span>
				</h1>
				<FiltersGrid
					shift={shift}
					setShift={setShift}
					filterDepartment={department}
					filterSetDepartment={setDepartment}
					filterName={name}
					filterSetName={setName}
					filterCore={core}
					filterSetCore={setCore}
					filerPosition={position}
					filterSetPosition={setPosition}
					toggleAgregarModal={toggleAgregarModal} />
				<div className="w-full">
					<Tabla data={users} toggleEditarModal={toggleEditarModal} />
					{/* <Tabla data={users} toggleEditarModal={toggleEditarModal} /> */}
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
