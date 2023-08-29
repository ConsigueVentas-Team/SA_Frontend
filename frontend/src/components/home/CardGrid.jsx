import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
import { CardItem } from "./CardItem"


export const CardGrid = () => {

	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)
	const [birthday, setBirthday] = useState([])

	//* Obtener Cumpleaños
	// useEffect(() => {
	// 	const obtenerCumpleaños = async () => {
	// 		try {
	// 			const response = await fetch(import.meta.env.VITE_API_URL + `/birthday/details`,
	// 				{
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				});
	// 			const data = await response.json();
	// 			if (response.ok) {
	// 				setBirthday(data.users);
	// 			} else {
	// 				console.error('Error al obtener los usuarios:', data.error);
	// 			}
	// 		} catch (error) {
	// 			console.error('Error al obtener los usuarios:', error);
	// 		}
	// 	};
	// 	obtenerCumpleaños();
	// }, [token]);

	useEffect(() => {
		const obtenerCumpleaños = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_URL + '/birthday/nextBirthday/', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				if (response.ok) {
					setBirthday(data);
				} else {
					console.error('Error al obtener los usuarios:', data.error);
				}
			} catch (error) {
				console.error('Error al obtener los usuarios:', error);
			}
		};
		obtenerCumpleaños();
	}, [token]);

	console.log(birthday)

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 place-items-center">
			<CardItem data={birthday} />
		</div>
	)
}

