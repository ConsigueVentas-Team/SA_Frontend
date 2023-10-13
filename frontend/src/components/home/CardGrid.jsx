import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
import { CardItem } from "./CardItem"
import CakeIcon from "@mui/icons-material/Cake";


export const CardGrid = () => {

	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)
	const [birthday, setBirthday] = useState([])

	useEffect(() => {
		const fetchBirthday = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_URL + '/birthday/nextBirthday', {
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
					console.error('Error al obtener los cumpleaños de los usuarios:', data.error);
				}
			} catch (error) {
				console.error('Error al obtener los cumpleaños de los usuarios:', error);
			}
		};
		fetchBirthday();
	}, [token]);

	return (
		<>
			{birthday.length > 0 && (
				<div className="w-full space-y-4">

					<div className="flex items-center text-white">
						<CakeIcon />
						<h3 className="ml-2 text-xl">Próximos Cumpleaños</h3>
					</div>
					<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 place-items-center">
						<CardItem data={birthday} />
					</div>
				</div>
			)}
		</>
	)
}

