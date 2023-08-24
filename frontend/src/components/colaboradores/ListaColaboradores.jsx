import { PropTypes } from 'prop-types';

import { useEffect, useState } from "react"
import { AES, enc } from "crypto-js";
import { FiltersGrid } from "./FiltersGrid"
import Tabla from "./Tabla"


export const ListaColaboradores = ({ toggleAgregarModal }) => {
	const [users, setUsers] = useState([]);

	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)

	//Listar Usuarios
	useEffect(() => {
		const obtenerUsuarios = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_URL + "/users", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				if (response.ok) {
					setUsers(data.profile);
				} else {
					console.error('Error al obtener los usuarios:', data.error);
				}
			} catch (error) {
				console.error('Error al obtener los usuarios:', error);
			}
		};
		obtenerUsuarios();
	}, [token]);



	//SearchBar
	const [filteredUsers, setFilteredUsers] = useState(users);

	//quita acentos en los filtros
	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	const handleSearch = (searchValue) => {
		const filtered = users.filter((users) => {
			const normalizedFilter = removeAccents(searchValue.toLowerCase());
			const normalizedName = users.user && users.user[0] ? removeAccents(users.user[0].name.toLowerCase()) : '';
			const normalizedSurname = users.user && users.user[0] ? removeAccents(users.user[0].surname.toLowerCase()) : '';

			if (searchValue.includes(' ')) {
				const [firstName, lastName] = searchValue.split(' ');
				const normalizedFirstName = removeAccents(firstName.toLowerCase());
				const normalizedLastName = removeAccents(lastName.toLowerCase());

				return (
					(normalizedName.includes(normalizedFirstName) && normalizedSurname.includes(normalizedLastName)) ||
					(normalizedName.includes(normalizedLastName) && normalizedSurname.includes(normalizedFirstName))
				);
			} else {
				return (
					normalizedName.includes(normalizedFilter) ||
					normalizedSurname.includes(normalizedFilter)
				);
			}
		});
		setFilteredUsers(filtered);
	}

	useEffect(() => {
		setFilteredUsers(users);
		
	}, [users]);

	return (
		<>
			{/* <FiltersGrid /> */}
			<FiltersGrid onSearch={handleSearch} toggleAgregarModal={toggleAgregarModal} />
			<div className="w-full">
				<Tabla data={filteredUsers} />
			</div>
		</>
	)
}

ListaColaboradores.propTypes = {
	toggleAgregarModal: PropTypes.func.isRequired,
}