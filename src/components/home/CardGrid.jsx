import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
import { CardItem } from "./CardItem"
import CakeIcon from "@mui/icons-material/Cake";
import Loading from "../essentials/Loading";


export const CardGrid = () => {

	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)
	const [birthday, setBirthday] = useState([])
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchBirthday = async () => {
			try {
				setLoading(true);
				const currentMonth = new Date().getMonth() + 1; // Obtiene el mes actual
				const currentDay = new Date().getDate(); // Obtiene el día actual
				const response = await fetch(`${import.meta.env.VITE_API_URL}/birthday/nextBirthday?m=${currentMonth}&d=${currentDay}`, {
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
			} finally {
				setLoading(false)
			}
		};
		fetchBirthday();
	}, [token]);



	return (
		<>
			<div className="w-full space-y-4">

				<div className="flex items-center text-white">
					<CakeIcon />
					<h3 className="ml-2 text-xl">Próximos Cumpleaños</h3>
				</div>

				{loading ? (
					<Loading />
				) : (
					<CardItem data={birthday} />					
				)}

			</div>
		</>
	)
}

