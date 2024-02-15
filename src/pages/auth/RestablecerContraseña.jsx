import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RestablecerContraseña = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [passwordResetInfo, setPasswordResetInfo] = useState(null);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	const handleToggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	useEffect(() => {
		document.title = 'Restablecer contraseña | Consigue Ventas';
	}, []);

	const navigate = useNavigate();

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setPasswordMatch(true); // Reset passwordMatch on password change
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
		setPasswordMatch(true); // Reset passwordMatch on confirm password change
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 8 || confirmPassword.length < 8) {
			setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
			setSuccessMessage('');
			return;
		}

		if (password === confirmPassword) {
			setPasswordMatch(true);
			setIsLoading(true);

			try {
				const response = await fetch(import.meta.env.VITE_API_URL + '/password/reset', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: passwordResetInfo.email,
						password,
						password_confirmation: confirmPassword,
						token: passwordResetInfo.token,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					setSuccessMessage('La contraseña fue restablecida.');
					setErrorMessage('');
					setTimeout(() => {
						navigate("/login")
					}, 1000);
				} else {
					setErrorMessage(data.message);
					setSuccessMessage('');
				}
			} catch (error) {
				console.error('Ocurrió un error', error);
				setErrorMessage('Un error ha ocurrido mientras se cambiaba la contraseña');
				setSuccessMessage('');
			}

			setIsLoading(false);
		} else {
			setPasswordMatch(false);
			setErrorMessage('');
			setSuccessMessage('');
		}
	};

	useEffect(() => {
		const obtenerInformacionRestablecimiento = async () => {
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const token = urlParams.get('token');

				if (!token) {
					setErrorMessage('No se pudo obtener la información del restablecimiento de contraseña');
					return;
				}

				const response = await fetch(import.meta.env.VITE_API_URL + `/password/find/${token}`);
				const data = await response.json();

				if (response.ok) {
					setPasswordResetInfo(data);
					setErrorMessage('');
				} else {
					setErrorMessage('No se pudo obtener la información del restablecimiento de contraseña');
				}
			} catch (error) {
				console.error('Ocurrió un error', error);
				setErrorMessage('Un error ha ocurrido mientras se obtenía la información del restablecimiento de contraseña');
			}
		};

		obtenerInformacionRestablecimiento();
	}, []);

	return (
		<>
			<div className="fixed top-0 left-0 z-50 w-screen h-screen p-2.5 flex flex-col items-center justify-center bg-cv-secondary">
				<div className="w-full max-w-lg px-4 py-8 space-y-5 bg-white shadow-2xl sm:p-5 rounded-3xl">
					<div className='flex flex-col items-center gap-5'>
						<div className='w-full text-center text-cv-primary'>
							<LockResetIcon sx={{ fontSize: 60 }} />
							<h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
						</div>
						<form className="w-full" onSubmit={handleFormSubmit}>
							<div className="mb-6">
								<label htmlFor='password' className="block mb-1 font-medium text-gray-900">
									Contraseña nueva:
								</label>
								<div className="relative">
									<input
										className="bg-white border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5 pr-8"
										placeholder="Contraseña nueva"
										id='password'
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={handlePasswordChange}
										required
									/>
									{password && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleTogglePassword}>
											{showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-primary" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-primary" />}
										</button>
									)}
								</div>
							</div>

							<div className="mb-6">
								<label htmlFor='confirm_password' className="block mb-1 font-medium text-gray-900">
									Confirmar contraseña:
								</label>
								<div className="relative">
									<input
										className={`bg-white border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary block w-full p-2.5 pr-8 ${passwordMatch ? 'focus:border-cv-primary ' : 'focus:border-red-500'
											}`}
										id='confirm_password'
										placeholder="Confirmar contraseña"
										type={showConfirmPassword ? 'text' : 'password'}
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
										required
									/>
									{confirmPassword && (
										<button type="button" className='absolute inset-y-0 right-2' onClick={handleToggleConfirmPassword}>
											{showConfirmPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-primary" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="cursor-pointer text-cv-primary" />}
										</button>
									)}
								</div>
								{!passwordMatch && (
									<p className="mt-1 text-xs italic text-red-500">Las contraseñas no coinciden.</p>
								)}
							</div>
							<div className="flex items-center justify-center">
								<button
									className="w-full px-4 py-2 font-bold text-white duration-300 ease-in-out rounded shadow bg-cv-primary hover:bg-cv-secondary focus:shadow-outline focus:outline-none active:scale-95"
									type="submit"
									disabled={isLoading}
								>
									Restablecer contraseña
								</button>
							</div>

							{isLoading && <p className="mt-1 text-sm text-black">Cargando...</p>}
							{successMessage && (
								<p className="mt-1 text-sm text-green-500">{successMessage}</p>

							)}
							{errorMessage && (
								<p className="mt-1 text-sm text-red-500">{errorMessage}</p>
							)}
						</form>
					</div>
				</div >
			</div >
		</>
	)
}
