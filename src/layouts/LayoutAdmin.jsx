import { Outlet, useNavigate } from "react-router-dom";
import { Header, Sidebar } from "../components"
import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";

export const LayoutAdmin = () => {
	const [currentPage, setCurrentPage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const storedPage = localStorage.getItem("currentPage");
		if (storedPage) {
			setCurrentPage(storedPage);
		}
	}, []);

	const handlePageClick = (pageName) => {
		setCurrentPage(pageName);
		localStorage.setItem("currentPage", pageName);
	};

	useEffect(() => {				
		const tokenD = AES.decrypt(
			localStorage.getItem('token'),
			import.meta.env.VITE_TOKEN_KEY
		)
		const token = tokenD.toString(enc.Utf8);
		
		if (token) {
			try {			
			  	const decodedToken = jwtDecode(token);
				const currentTime = Date.now() / 1000; // En segundos			
							
				if (decodedToken.exp < currentTime) {					
					localStorage.clear();
					navigate("/login");
				}						
			} catch (error) {
				// Si hay un error al descifrar o parsear el token, limpiar el storage y redirigir al login
				console.log('error al descifrar o parsear el token')
				console.log(error)
				localStorage.clear();
				navigate("/login");
			}
		} else {			
		  navigate("/login"); // Si no hay token, redirigir al login
		}
	  }, [navigate]);

	return (
		<div className="grid min-h-screen grid-cols-1 xl:grid-cols-6">
			<Sidebar onPageClick={handlePageClick} />
			<div className="xl:col-span-5">
				<Header currentPage={currentPage} onPageClick={handlePageClick} />
				<div className="h-[90vh] overflow-y-auto p-2.5 sm:p-5 bg-cv-secondary text-white scrollbar">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
