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
		navigate('/home')
	}
	const onsubmit = async (e) => {
		e.preventDefault();

		if (password.length < 8 || confirm_password.length < 8) {
			setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
			setSuccessMessage("");
			return;
		}
		const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
		const token = tokenD.toString(enc.Utf8)
		setIsLoading(true);
		try {

			const response = await fetch(import.meta.env.VITE_API_URL + "/profile/changePassword", {
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
			} else {
				setErrorMessage(responseData.message);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	}


	return (
		<>
			<div className="h-full w-full flex flex-col justify-center items-center">
				<div className="w-full max-w-lg px-4 py-8 sm:p-5 rounded-3xl shadow-2xl space-y-5">
					<div className='w-full mb-5 text-center text-cv-cyan'>
						<LockResetIcon sx={{ fontSize: 60 }} />
						<h1 className="text-2xl font-semibold">Cambiar contraseña</h1>
					</div>
					<form onSubmit={onsubmit} >
						<div className="w-full flex flex-col items-center gap-4">
							<div className="w-full">
								<label htmlFor="old_password" className="block mb-1 font-medium text-white">
									Contraseña antigua:
								</label>
								<div className="relative">
									<input
										className="bg-cv-secondary appearance-none border border-cv-primary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="old_password"
										type={showOldPassword ? "text" : "password"}
										placeholder="Contraseña antigua"
										required
										value={old_password}
										onChange={(e) => setOld_password(e.target.value)}
									/>
									{old_password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleToggleOldPassword}>
											{showOldPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" />}
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
										className="bg-cv-secondary appearance-none border border-cv-primary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="new_password"
										type={showPassword ? "text" : "password"}
										placeholder="Contraseña nueva"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									{password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleTogglePassword}>
											{showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" />}
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
										className="bg-cv-secondary appearance-none border border-cv-primary text-cv-cyan outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-2 focus:border-cv-cyan block w-full p-2.5 pr-8"
										id="confirm_password"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirma contraseña"
										value={confirm_password}
										onChange={(e) => setConfirm_password(e.target.value)}
										required
									/>
									{confirm_password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleToggleConfirmPassword}>
											{showConfirmPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="text-cv-cyan cursor-pointer" />}
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
						<div className="flex items-center justify-evenly gap-5 mt-4">
							<button className="w-1/2 text-cv-cyan bg-transparent border-2 border-cv-cyan hover:text-cv-primary hover:bg-cv-cyan rounded-lg py-3 px-8 font-bold whitespace-nowrap active:scale-95 ease-in-out duration-300"
								onClick={cancelarChange}
							>
								Cancelar
							</button>
							<button
								className="w-1/2 bg-cv-cyan hover:bg-cv-cyan/70 border-2 border-cv-cyan hover:border-cv-cyan/70 rounded-lg py-3 px-8 text-cv-primary font-bold whitespace-nowrap active:scale-95 ease-in-out duration-300"
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
