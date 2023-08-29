import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { AES, enc } from "crypto-js";
import { Estadisticas } from "./Estadisticas";

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

export const EstadisticasGrid = () => {
	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)
	const userId = localStorage.getItem("iduser");
	const [userData, setUserData] = useState([]);

	//Obtener datos de Usuario
	useEffect(() => {
		const obtenerDataUser = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				if (response.ok) {
					setUserData(data);
				} else {
					console.error('Error al obtener los usuarios:', data.error);
				}
			} catch (error) {
				console.error('Error al obtener los usuarios:', error);
			}
		};
		obtenerDataUser();
	}, [userId, token]);

	const cardAsistencia = [
		{ title: "Asistencia", icon: <InsertEmoticonIcon sx={{ fontSize: 80, color: '#4caf50' }}/>, item: userData.Asistencia },
		{
			title: "Tardanzas", icon: <SentimentNeutralIcon sx={{ fontSize: 80, color: '#ffeb3b' }}/>, item: userData.Tardanzas },
		{ title: "Faltas", icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, color: '#f44336' }}/>, item: userData.Faltas },
		{ title: "Justificaciones", icon: <SentimentSatisfiedIcon sx={{ fontSize: 80, color: '#00bcd4' }}/>, item: userData.Justificaciones },
	];

	return (
		<div className="w-full flex items-center justify-between gap-4 overflow-x-auto">
			{cardAsistencia.map((card, index) => (
				<Estadisticas key={index} data={card} />
			))}
		</div>
	)
}
EstadisticasGrid.propTypes = {
	userData: PropTypes.object.isRequired,
};