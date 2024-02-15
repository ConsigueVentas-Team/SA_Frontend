import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const CambiarContraseña = () => {
	const [old_password, setOld_password] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirm_password] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [isLoading, setIsLoading] = useState(false);


	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleToggleOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	const handleToggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};


	useEffect(() => {
		if (password === confirm_password) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false);
		}
	}, [password, confirm_password]);

	const navigate = useNavigate();
	const cancelarChange = () => {
		navigate('/')
	}
	const onsubmit = async (e) => {
		e.preventDefault();

		if (password.length < 8 || confirm_password.length < 8) {
			setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
			setSuccessMessage("");
			return;
		}
		const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
		const token = tokenD.toString(enc.Utf8)
		setIsLoading(true);
		try {

			const response = await fetch(import.meta.env.VITE_API_URL + "/changePassword", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					old_password,
					password,
					confirm_password,
				}),
			});

			const responseData = await response.json();

			if (response.ok) {
				setSuccessMessage("Contraseña cambiada correctamente");
				setErrorMessage("");
				logoutSubmit();
			} else {
				setErrorMessage(responseData.message);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	}

	function logoutSubmit() {
		localStorage.setItem('login', 'false');
		localStorage.setItem('loginStatus', 'Cierre de sesión exitoso!');
		navigate("/login")
		window.location.reload();
	}


	return (
		<>
			<div className="flex flex-col items-center justify-center w-full h-full">
				<div className="w-full max-w-lg px-4 py-8 space-y-5 shadow-2xl sm:p-5 rounded-3xl bg-cv-primary">
					<div className='w-full mb-5 text-center text-cv-cyan'>
						<LockResetIcon sx={{ fontSize: 60 }} />
						<h1 className="text-2xl font-semibold">Cambiar contraseña</h1>
					</div>
					<form onSubmit={onsubmit} >
						<div className="flex flex-col items-center w-full gap-4">
							<div className="w-full">
								<label htmlFor="old_password" className="block mb-1 font-medium text-white">
									Contraseña antigua:
								</label>
								<div className="relative">
									<input
										className="bg-cv-primary appearance-none border border-cv-secondary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="old_password"
										type={showOldPassword ? "text" : "password"}
										placeholder="Contraseña antigua"
										required
										value={old_password}
										onChange={(e) => setOld_password(e.target.value)}
									/>
									{old_password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleToggleOldPassword}>
											{showOldPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" />}
										</button>
									)}
								</div>
							</div>
							<div className="w-full">
								<label htmlFor="new_password" className="block mb-1 font-medium text-white">
									Contraseña nueva:
								</label>
								<div className="relative">
									<input
										className="bg-cv-primary appearance-none border border-cv-secondary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="new_password"
										type={showPassword ? "text" : "password"}
										placeholder="Contraseña nueva"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									{password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleTogglePassword}>
											{showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" />}
										</button>
									)}
								</div>
							</div>
							<div className="w-full">
								<label htmlFor="confirm_password" className="block mb-1 font-medium text-white">
									Confirma contraseña:
								</label>
								<div className="relative">
									<input
										className="bg-cv-primary appearance-none border border-cv-secondary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="confirm_password"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirma contraseña"
										value={confirm_password}
										onChange={(e) => setConfirm_password(e.target.value)}
										required
									/>
									{confirm_password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleToggleConfirmPassword}>
											{showConfirmPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-cyan" />}
										</button>
									)}
								</div>
							</div>
						</div>
						{(confirm_password !== "" && !passwordMatch) && (
							<span className="mt-1 text-red-500">Las contraseñas no coinciden.</span>
						)}
						{errorMessage && <span className="mt-1 text-red-500">{errorMessage}</span>}
						{successMessage && <span className="mt-1 text-green-500">{successMessage}</span>}
						<div className="flex items-center gap-5 mt-4 justify-evenly">
							<button className="w-1/2 px-8 py-3 font-bold duration-300 ease-in-out bg-transparent border-2 rounded-lg text-cv-cyan border-cv-cyan hover:text-cv-primary hover:bg-cv-cyan whitespace-nowrap active:scale-95"
								onClick={cancelarChange}
							>
								Cancelar
							</button>
							<button
								className="w-1/2 px-8 py-3 font-bold duration-300 ease-in-out border-2 rounded-lg bg-cv-cyan hover:bg-cv-cyan/70 border-cv-cyan hover:border-cv-cyan/70 text-cv-primary whitespace-nowrap active:scale-95"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? "Cargando..." : "Cambiar contraseña"}
							</button>

						</div>
					</form>
				</div >
			</div >
		</>
	)
}
