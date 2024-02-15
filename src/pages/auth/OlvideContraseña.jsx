import { useState, useEffect } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


export const OlvideContraseña = () => {
	const [email, setEmail] = useState('');
	const [correoEnviado, setCorreoEnviado] = useState(false);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [showMessageWait, setShowMessageWait] = useState(false);
	const [showEmptyDataMessage, setShowEmptyDataMessage] = useState(false);
	const [secondsRemaining, setSecondsRemaining] = useState(0);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		document.title = 'Olvide mi contraseña | Consigue Ventas';
	}, []);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email.trim()) {
			setShowEmptyDataMessage(true);
			return;
		}
		setIsLoading(true);

		try {
			const response = await fetch(import.meta.env.VITE_API_URL + '/password/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				// eslint-disable-next-line no-unused-vars
				const data = await response.json();
				setCorreoEnviado(true);
				setError(null);
				setIsButtonDisabled(true);

				setSecondsRemaining(30);
				setHasError(false);

			} else {
				const errorData = await response.json();
				setError(new Error(errorData.message));
				setCorreoEnviado(false);
			}
		} catch (error) {
			setError(error);
			setCorreoEnviado(false);
			setHasError(true);
		}

		setIsLoading(false);
	};
	useEffect(() => {
		if (email.trim()) {
			setShowEmptyDataMessage(false);
		}
	}, [email]);

	useEffect(() => {
		if (correoEnviado) {
			setIsButtonDisabled(true);
			setShowMessage(false);
			setShowMessageWait(true);
			setSecondsRemaining(30); // Reiniciar el contador a 30 segundos
			const interval = setInterval(() => {
				setSecondsRemaining((prevSeconds) => prevSeconds - 1);
			}, 1000);
			
			setTimeout(() => {
				setCorreoEnviado(false);
				setIsButtonDisabled(false);
				setShowMessage(true);
				setShowMessageWait(false);
				clearInterval(interval);
			}, 30000);
		}
	}, [correoEnviado]);
	useEffect(() => {
		if (hasError) {
			setTimeout(() => {
				setError(null);
			}, 500);
		}
	}, [hasError]);
	return (
		<>
			<div className="fixed top-0 left-0 z-50 w-screen h-screen p-2.5 flex flex-col items-center justify-center bg-cv-secondary">
				<div className="w-full max-w-lg px-4 py-8 sm:p-5 rounded-3xl shadow-2xl bg-white space-y-5">
					<div className='flex flex-col items-center gap-5'>
						<div className='w-full text-center text-cv-primary'>
							<ForwardToInboxIcon sx={{ fontSize: 60 }} />
							<h1 className="text-2xl font-semibold">Olvide mi contraseña</h1>
						</div>
						<div className='w-full text-gray-950 flex flex-col gap-1'>
							<div>
								<label htmlFor="email" className="block mb-1 font-medium text-gray-900 ">Correo electrónico</label>
								<input
									name="email"
									type="text"
									id='email'
									className="bg-white border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5"
									placeholder="Dirección de correo electrónico"
									value={email}
									onChange={handleEmailChange}
								/>
							</div>
							{showEmptyDataMessage && <p className="text-red-500">Debe llenar datos</p>}
							{isLoading && <p className="text-black">Cargando...</p>}
							{error && <p className="text-red-500">Error: {error.message}</p>}
							{correoEnviado && !error && <p className="text-green-500">Correo enviado correctamente.</p>}
							{showMessage && <p className="text-blue-500">Puede volver a utilizar el botón de enviar.</p>}
							{showMessageWait && <p>
								<span className='text-sm'> Recomendaciones: </span>
								<ul className='list-disc list-inside'>
									<li>Revisa en tu carpeta Spam</li>
									<li>Si deseas volver a mandar el correo debes esperar {secondsRemaining} segundos</li>
								</ul>
							</p>}
							{hasError && <p className="text-red-500">Error: {error.message}</p>}
						</div>
					</div>
					<div className="flex items-center justify-evenly gap-5">
						<button
							className="w-1/2 text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary rounded-lg py-3 px-8 font-bold whitespace-nowrap active:scale-95 ease-in-out duration-300"
							onClick={() => (window.location.href = '/login')}
						>
							Cancelar
						</button>
						<button
							className="w-1/2 bg-cv-primary hover:bg-cv-secondary border-2 border-cv-primary rounded-lg py-3 px-8 text-white font-bold whitespace-nowrap active:scale-95 ease-in-out duration-300"
							onClick={handleSubmit}
							disabled={isButtonDisabled}
						>
							Enviar
						</button>
					</div>
				</div >
			</div >
		</>
	)
}
