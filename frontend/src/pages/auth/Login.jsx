import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { AES } from 'crypto-js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('');
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [msg, setMsg] = useState('');

  //Errors
  const [error, setError] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    document.title = 'Iniciar sesión | Consigue Ventas';
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
      }, 3000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "username":
        setUsername(e.target.value);
        if (e.target.value === "") {
          setUsernameError("Llenar campo de usuario");
        } else {
          setUsernameError("");
        }
        break;
      case "password":
        handlePasswordChange(e);
        break;
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Llenar campo de contraseña");
    } else {
      setPasswordError("");
    }
  };


  const loginSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "" ) {
      if (captchaCompleted) {
        var url = import.meta.env.VITE_API_URL + '/login';
        var headers = {
          "Accept": "application/json",
          "Content-type": "application/json"
        };
        var Data = {
          username: username,
          password: password,
          "captchaResponse": captchaValue

        };

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          });
          const responseData = await response.json();

          if (response.ok) {
            if (responseData.message === 'No autorizado' || responseData.message === 'Tu cuenta ha sido bloqueado, contacte a un administrador') {
              setError(responseData.message);
            } else {
              setMsg(responseData.message);
              const tokenD = responseData.accessToken
              const token = AES.encrypt(tokenD, import.meta.env.VITE_KEY).toString()
              localStorage.setItem('token', token);
              localStorage.setItem('iduser', responseData.user.id);
              localStorage.setItem('rol', responseData.rol);
              localStorage.setItem('area', responseData.profile.area);
              localStorage.setItem('name', responseData.user.name);
              localStorage.setItem('avatar', responseData.avatar)
              localStorage.setItem('surname', responseData.user.surname)
              localStorage.setItem('shift', responseData.profile.shift)
              localStorage.setItem('login', true);
              navigate("/")
              window.location.reload();
            }
          } else {
            setError(responseData.message);
          }
        } catch (err) {
          setError(err.toString());
          console.log(err);
        }
      } else {
        setError('No has marcado el captcha.');
      }
    } else {
      setError('Todos los campos son requeridos');
    }
  }


  const onRecaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaCompleted(true);
    setCaptchaError('');
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen p-2.5 flex flex-col items-center justify-center bg-cv-secondary">
        <div className="w-full max-w-4xl px-4 py-8 sm:p-5 rounded-3xl shadow-2xl bg-white">
          <div className="w-full h-auto flex flex-col md:flex-row bg-white rounded-2xl gap-4">
            <div className="w-1/2 hidden md:block h-full">
              <div className="w-full min-h-full h-full grid gap-4 content-between bg-slate-800 rounded-2xl p-10 space-y-4">
                <div className="flex justify-center">
                  <LoginImage />
                </div>
                <div className="rounded-lg p-2 bg-auto text-white bg-cv-secondary text-center">
                  <FrasesLogin />
                </div>
              </div>
            </div>

            <div className='w-full md:w-1/2'>
              <div className="w-full bg-white rounded-lg space-y-2">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-72">
                    <Logo />
                  </div>
                </div>
                <form onSubmit={loginSubmit}>
                  {error !== "" ? (
                    <span className="text-sm text-red-500">{error.toString()}</span>
                  ) : (
                    <span className="text-sm text-green-400">{msg.toString()}</span>
                  )}
                  {error["g-recaptcha-response"] && (
                    <span className="text-sm text-violet-900">
                      {error["g-recaptcha-response"].toString()}
                    </span>
                  )}
                  <div className='space-y-4'>
                    <div className='space-y-4'>
                      <div className="w-full">
                        <div>
                          <label htmlFor="username" className="block mb-1 font-medium text-gray-900 ">Usuario</label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5"
                            required=""
                            placeholder="Es tu DNI"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => handleInputChange(e, "username")}
                          />
                        </div>
                        <span className='mt-1 text-sm text-red-500'>{usernameError}</span>
                      </div>

                      <div className="w-full">
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-900 w-full">Contraseña</label>
                        <div className="relative">
                          <input
                            placeholder="********"
                            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5 pr-8"
                            required=""
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => handleInputChange(e, "password")}
                          />
                          {password && (
                            <button type="button" className='absolute inset-y-0 right-2' onClick={handleTogglePassword}>
                              {showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} className="text-cv-primary cursor-pointer" /> : <VisibilityOffIcon sx={{ fontSize: 20 }} className="text-cv-primary cursor-pointer" />}
                            </button>
                          )}
                        </div>
                        <span className='mt-1 text-sm text-red-500'>{passwordError}</span>
                      </div>

                      <div className="w-full flex flex-col items-center justify-center">
                        <ReCAPTCHA
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={onRecaptchaChange}
                          onExpired={() => setCaptchaCompleted(false)}
                          onErrored={() => setCaptchaError('Hubo un error en el captcha.')}
                        />
                        {captchaError && (
                          <span className="text-red-500 text-xs">{captchaError}</span>
                        )}
                      </div>

                    </div>
                    <div className='flex items-center justify-center'>
                      <input type="submit" className='w-full rounded-lg bg-cv-primary text-white px-10 py-2.5 cursor-pointer uppercase text-base font-bold tracking-wide shadow-3xl active:scale-95 ease-in-out duration-300' value="Iniciar Sesión" />
                    </div>
                  </div>
                </form>
                <div className="flex items-center justify-center relative">
                  <Link to='/olvide-contraseña' className='text-sm font-medium text-cv-primary  hover:underline focus:outline-none text-center'>¿Olvidaste tu contraseña?</Link>
                  <div className="absolute right-4 flex justify-end">
                    <button className="text-cv-primary">
                      {/* <HelpIcon /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}




export const FrasesLogin = () => {

  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Frases.length);
    setRandomQuote(Frases[randomIndex]);
  }, []);

  return (
    <p className="w-full h-full font-light text-lg leading-tight">
      {randomQuote}
    </p>
  )
}

const Frases = [
  "Céntrate hacia dónde quieres ir, no en lo que temes.",
  "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
  "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.",
  "El éxito no es el final, el fracaso no es fatal: lo que cuenta es el coraje para seguir adelante.– Winston Churchill",
  "Trabaja duro en silencio, deja que tu éxito haga ruido.",
  "La única manera de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "No importa lo lento que vayas, siempre y cuando no te detengas.",
  "Cada día es una nueva oportunidad para cambiar tu vida.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
  "No busques oportunidades. Crea.",
  "El único límite para nuestros logros de mañana está en nuestras dudas de hoy.",
  "Si no construyes tu propio sueño, alguien más te contratará para construir el suyo. – Farrah Gray",
  "El trabajo en equipo divide la tarea y multiplica el éxito.",
  "La persistencia es el camino del éxito.",
  "No cuentes los días, haz que los días cuenten.",
  "La excelencia no es un acto, es un hábito. – Aristóteles",
  "El futuro pertenece a aquellos que creen en la belleza de sus sueños. – Eleanor Roosevelt",
  "La motivación nos impulsa a comenzar y el hábito nos permite continuar.",
  "La clave para el éxito es enfocarse en los objetivos, no en los obstáculos.",
  "La suerte favorece a los valientes.",
  "Nada es imposible, la palabra misma dice 'soy posible'. – Audrey Hepburn",
  "Los grandes logros son el resultado de pequeños esfuerzos que se realizan día tras día.",
  "No te detengas cuando estés cansado, detente cuando hayas terminado.",
  "Cada día es una oportunidad para ser una versión mejor de ti mismo.",
  "La recompensa de algo bien hecho es haberlo hecho. – Ralph Waldo Emerson",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "La única manera de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "No busques oportunidades. Crea.",
  "El único límite para nuestros logros de mañana está en nuestras dudas de hoy.",
  "Si no construyes tu propio sueño, alguien más te contratará para construir el suyo. – Farrah Gray",
  "El trabajo en equipo divide la tarea y multiplica el éxito.",
  "La persistencia es el camino del éxito.",
  "No cuentes los días, haz que los días cuenten.",
  "La excelencia no es un acto, es un hábito. – Aristóteles",
  "El futuro pertenece a aquellos que creen en la belleza de sus sueños. – Eleanor Roosevelt",
  "La motivación nos impulsa a comenzar y el hábito nos permite continuar.",
  "La clave para el éxito es enfocarse en los objetivos, no en los obstáculos.",
  "La suerte favorece a los valientes.",
  "Nada es imposible, la palabra misma dice 'soy posible'. – Audrey Hepburn",
  "Los grandes logros son el resultado de pequeños esfuerzos que se realizan día tras día.",
  "No te detengas cuando estés cansado, detente cuando hayas terminado.",
  "La única forma de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "Cada día es una oportunidad para ser una versión mejor de ti mismo.",
  "La recompensa de algo bien hecho es haberlo hecho. – Ralph Waldo Emerson",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "La única manera de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "No busques oportunidades. Crea.",
  "El único límite para nuestros logros de mañana está en nuestras dudas de hoy.",
  "Si no construyes tu propio sueño, alguien más te contratará para construir el suyo. – Farrah Gray",
  "El trabajo en equipo divide la tarea y multiplica el éxito.",
  "La persistencia es el camino del éxito.",
  "No cuentes los días, haz que los días cuenten.",
  "La excelencia no es un acto, es un hábito. – Aristóteles",
  "El futuro pertenece a aquellos que creen en la belleza de sus sueños. – Eleanor Roosevelt",
  "La motivación nos impulsa a comenzar y el hábito nos permite continuar.",
  "La clave para el éxito es enfocarse en los objetivos, no en los obstáculos.",
  "La suerte favorece a los valientes.",
  "Nada es imposible, la palabra misma dice 'soy posible'. – Audrey Hepburn",
  "Los grandes logros son el resultado de pequeños esfuerzos que se realizan día tras día.",
  "No te detengas cuando estés cansado, detente cuando hayas terminado.",
  "La única forma de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "Cada día es una oportunidad para ser una versión mejor de ti mismo.",
  "La recompensa de algo bien hecho es haberlo hecho. – Ralph Waldo Emerson"
];

export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Capa 1"
      viewBox="0 0 1080 421.07"
    >
      <path
        d="M553.06 128.48c-5.6-5.4-8.51-12.21-8.51-20.51s2.9-15.11 8.61-20.61c5.7-5.5 12.91-8.21 21.61-8.21s17.11 2.5 26.02 7.6V75.04c-9.71-4.2-18.61-6.2-26.52-6.2-11.51 0-21.31 3.8-29.12 11.31-7.9 7.5-11.81 16.81-11.81 27.92 0 6.9 1.7 13.41 5.2 19.41 3.4 6 8.11 10.71 14.01 14.11 5.9 3.4 13.11 5.1 21.61 5.1 10.41 0 19.61-2.2 27.62-6.5v-11.91c-8.81 5.6-17.71 8.51-26.92 8.51-8.91-.3-16.21-3-21.81-8.3ZM681.54 79.75c-7.8-7.4-17.61-11.11-29.32-11.11s-21.41 3.7-29.12 11.11-11.51 16.81-11.51 28.12 3.8 20.21 11.41 27.62c7.6 7.3 17.11 11.01 28.62 11.01s21.91-3.7 29.82-11.01c7.9-7.3 11.81-16.61 11.81-27.82s-3.9-20.51-11.71-27.92Zm-7.9 48.43c-5.7 5.5-12.71 8.31-21.21 8.31s-15.41-2.7-21.01-8.11c-5.6-5.4-8.41-12.21-8.41-20.41s2.8-15.41 8.41-20.81c5.6-5.4 12.71-8.11 21.41-8.11 8.21 0 15.21 2.7 20.91 8.21 5.7 5.5 8.51 12.21 8.51 20.31-.2 8.2-3 15.01-8.61 20.61ZM767 128.68l-51.23-58.94h-8.81v75.85h10.21V87.16l50.73 58.43h9.41V69.74H767v58.94zM818.63 104.87l-8.31-4.9c-3.7-2.2-6.4-4.3-8.11-6.2-1.7-2-2.5-4.1-2.5-6.4 0-2.6 1.1-4.7 3.4-6.3 2.3-1.6 5.2-2.5 8.71-2.5 6.3 0 12.21 2.6 17.61 7.9V74.16c-5.3-3.6-11.11-5.3-17.41-5.3s-12.01 1.9-16.21 5.6c-4.1 3.7-6.2 8.61-6.2 14.61 0 4 1.1 7.5 3.3 10.61 2.2 3.1 5.9 6.2 11.01 9.31l8.31 5c6.7 4.1 10.01 8.51 10.01 13.11 0 2.8-1.1 5.2-3.4 7.1-2.3 1.9-5.1 2.8-8.51 2.8-7.71 0-14.51-3.7-20.41-11.11v13.81c6.2 4.6 13.01 6.9 20.51 6.9 6.5 0 11.81-1.9 15.91-5.7 4.1-3.8 6.1-8.71 6.1-14.81.1-8.71-4.5-15.71-13.81-21.21ZM844.55 69.74h10.91v75.85h-10.91zM913.19 117.87H927.9v15.81l-1 .3c-6 2-11.21 3-15.61 3-8.91 0-16.31-2.7-21.91-8.21-5.6-5.5-8.51-12.51-8.51-21.11s2.8-15.11 8.51-20.81c5.7-5.7 12.71-8.51 21.01-8.51 8.91 0 17.91 2.6 26.92 7.9V75.13c-5.9-2.5-10.71-4.2-14.61-5.1-3.8-.9-7.91-1.4-12.21-1.4-11.71 0-21.51 3.8-29.32 11.31s-11.71 17.01-11.71 28.32 3.8 19.81 11.31 27.12c7.5 7.3 17.51 11.01 30.12 11.01 9.21 0 18.51-2 27.82-6.1v-32.12h-25.52v9.71ZM1007.65 112.77h-.2c0 6-.5 10.21-1.4 12.71-.9 2.5-2.5 4.6-4.6 6.4-4.1 3.4-9.31 5-15.71 5-4.5 0-8.51-.8-11.81-2.5-3.3-1.7-5.8-3.9-7.4-6.7-1.6-2.8-2.4-7.71-2.4-14.91V69.64h-10.91v42.93c0 6.1.4 10.61 1.2 13.51.8 2.9 1.8 5.3 3.1 7.2 1.2 2 2.8 3.8 4.6 5.3 6 5.1 13.91 7.71 23.82 7.71s17.61-2.6 23.62-7.8c1.8-1.6 3.3-3.3 4.6-5.3 1.2-2 2.3-4.4 3.1-7.4.8-3 1.3-7.4 1.3-13.21V69.45h-10.91v43.33ZM1044.28 135.79v-23.52h31.12v-9.7h-31.12V79.35h32.22v-9.61h-43.03v75.75h44.03v-9.7h-33.22zM561.67 212.04l-22.82-53.34h-10.9l32.62 76.25h2.5l32.12-76.25h-10.81l-22.71 53.34zM614.3 201.23h31.12v-9.71H614.3v-23.11h32.22v-9.71h-43.03v75.85h44.03v-9.71H614.3v-23.61zM719.37 217.64l-51.13-58.94h-8.81v75.95h10.21v-58.44l50.73 58.44h9.41V158.7h-10.41v58.94zM802.92 158.6h-63.34v9.71h26.02v66.34h10.91v-66.34h26.41v-9.71zM826.24 158.3l-32.62 76.35h11.21l9.51-22.51h32.42l10.11 22.51h11.11l-34.02-76.35h-7.71Zm-7.6 44.13 11.31-27.52 12.21 27.52h-23.52ZM901.39 193.82l-8.31-4.9c-3.7-2.2-6.4-4.3-8.11-6.2-1.7-2-2.5-4.1-2.5-6.4 0-2.6 1.1-4.7 3.4-6.3 2.3-1.6 5.2-2.5 8.71-2.5 6.3 0 12.21 2.6 17.61 7.9v-12.31c-5.3-3.6-11.11-5.3-17.41-5.3s-12.01 1.9-16.21 5.6c-4.1 3.7-6.2 8.61-6.2 14.61 0 4 1.1 7.5 3.3 10.61 2.2 3.1 5.9 6.2 11.01 9.31l8.31 5c6.7 4.1 10.01 8.51 10.01 13.11 0 2.8-1.1 5.2-3.4 7.1s-5.1 2.8-8.51 2.8c-7.71 0-14.51-3.7-20.41-11.11v13.71c6.2 4.6 13.01 6.9 20.51 6.9 6.5 0 11.81-1.9 15.91-5.7 4.1-3.8 6.1-8.71 6.1-14.81.1-8.51-4.6-15.61-13.81-21.11ZM538.65 274.78h10.51v-2.21h-10.51v-5.9h11.21v-2.2h-13.71v19.01h14.21v-2.2h-11.71v-6.5zM564.87 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM583.98 265.57c-.6-.4-1.4-.7-2.3-.9-.7-.1-1.6-.2-2.9-.2h-7.2v19.01h2.5v-7.71h4.9c2.7 0 4.6-.6 5.6-1.7s1.5-2.5 1.5-4.1c0-.9-.2-1.8-.6-2.6-.3-.8-.9-1.4-1.5-1.8Zm-1.5 7c-.7.6-1.8.9-3.5.9h-4.9v-6.8h4.9c1.1 0 1.9.1 2.3.2.7.2 1.2.6 1.6 1.1.4.5.6 1.2.6 2 0 1.2-.3 2-1 2.6ZM591.89 274.78h10.5v-2.21h-10.5v-5.9h11.2v-2.2h-13.7v19.01h14.2v-2.2h-11.7v-6.5zM618.6 280.48c-1 .8-2.2 1.2-3.6 1.2-1.2 0-2.2-.3-3.2-.9-1-.6-1.7-1.5-2.2-2.7-.5-1.2-.7-2.6-.7-4.2 0-1.3.2-2.5.6-3.7.4-1.2 1.1-2.1 2.1-2.8 1-.7 2.2-1.1 3.7-1.1 1.3 0 2.3.3 3.2.9.8.6 1.5 1.6 1.9 3l2.5-.6c-.5-1.8-1.4-3.1-2.7-4.1-1.3-1-2.9-1.5-4.8-1.5-1.7 0-3.2.4-4.6 1.1-1.4.7-2.5 1.9-3.2 3.4-.8 1.5-1.1 3.2-1.1 5.2 0 1.8.3 3.5 1 5.1.7 1.6 1.6 2.8 2.9 3.6 1.3.8 3 1.3 5 1.3s3.7-.5 5-1.6c1.4-1.1 2.3-2.7 2.8-4.7l-2.5-.6c-.4 1.6-1.1 2.9-2.1 3.7ZM626.71 264.47h2.5v19.01h-2.5zM638.92 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.9 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM653.83 264.47h-2.51v19.01h11.91v-2.2h-9.4v-16.81zM666.63 264.47h2.5v19.01h-2.5zM684.65 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5-.4-.6-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM704.96 264.47h-15.11v2.2h6.3v16.81h2.51v-16.81h6.3v-2.2zM710.76 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.8 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM734.38 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM750.99 274.78h10.61v-2.21h-10.61v-5.9h11.31v-2.2h-13.81v19.01h14.21v-2.2h-11.71v-6.5zM778.81 279.38l-10.01-14.91h-2.6v19.01h2.4v-14.91l10.01 14.91h2.6v-19.01h-2.4v14.91zM795.42 274.78h10.5v-2.21h-10.5v-5.9h11.2v-2.2h-13.8v19.01h14.2v-2.2h-11.6v-6.5zM820.63 277.68c-.5 1.3-.8 2.4-1 3.1-.2-.6-.5-1.6-.9-2.8l-4.5-13.51h-3.8v19.01h2.4v-16.21l5.5 16.21h2.3l5.6-15.91v15.91h2.4v-19.01h-3.4l-4.6 13.21ZM843.35 273.38c.9-.4 1.6-1 2-1.7s.7-1.5.7-2.3c0-.9-.2-1.7-.7-2.5-.5-.8-1.2-1.4-2.1-1.8-.9-.4-2-.6-3.5-.6h-7.1v19.01h7.3c1.2 0 2.2-.1 3.1-.3.8-.2 1.5-.5 2.1-.9.6-.4 1-1 1.4-1.8.4-.8.6-1.6.6-2.5 0-1.1-.3-2.1-.9-2.9-.8-.8-1.7-1.4-2.9-1.7Zm-4.4-6.7c1.4 0 2.3.1 2.9.3s1 .5 1.3 1 .5 1 .5 1.7-.2 1.2-.5 1.7c-.3.4-.8.8-1.4.9-.5.1-1.3.2-2.4.2h-4.1l-.1-5.8h3.8Zm5 12.91c-.3.5-.6.8-1 1.1-.4.2-.9.4-1.5.5-.3.1-.9.1-1.7.1h-4.7v-6.5h4.4c1.2 0 2.1.1 2.8.3.7.2 1.1.6 1.5 1.1.4.5.5 1.1.5 1.8.1.6 0 1.1-.3 1.6ZM862.76 275.48h.2c0 2.4-.4 4-1.2 4.8-.8.8-2.1 1.3-4 1.3-1.1 0-2-.2-2.7-.6s-1.3-1-1.6-1.8c-.3-.8-.5-2-.5-3.7v-11.01h-2.5v11.01c0 2 .2 3.6.7 4.8.5 1.2 1.3 2.1 2.4 2.7 1.1.6 2.6.9 4.4.9s3.3-.4 4.4-1.1c1.1-.7 1.9-1.6 2.3-2.7.4-1.1.6-2.6.6-4.6v-11.01h-2.5v11.01ZM882.37 266.07c-.8-.7-1.7-1.1-2.8-1.4-.8-.2-1.9-.3-3.4-.3h-6.6v19.01h6.9c1.2 0 2.2-.1 3.1-.3.9-.2 1.6-.5 2.3-1 .6-.4 1.2-1 1.7-1.7s1-1.7 1.3-2.8c.3-1.1.5-2.4.5-3.8 0-1.7-.2-3.2-.7-4.5-.5-1.2-1.3-2.3-2.3-3.2Zm-.1 11.41c-.3 1-.8 1.8-1.4 2.4-.4.4-1 .8-1.7 1-.7.2-1.7.4-3 .4h-4.1v-14.51h4c1.5 0 2.6.1 3.3.4.9.4 1.7 1.1 2.4 2.1s1 2.6 1 4.6c0 1.4-.2 2.6-.5 3.6ZM901.99 265.37c-1.4-.8-3-1.3-4.8-1.3-2.7 0-4.9.9-6.6 2.7-1.7 1.8-2.5 4.3-2.5 7.4 0 1.7.4 3.3 1.1 4.8.7 1.5 1.8 2.7 3.2 3.5 1.4.8 3 1.3 4.8 1.3 1.7 0 3.2-.4 4.6-1.2 1.4-.8 2.5-1.9 3.3-3.5.8-1.5 1.2-3.2 1.2-5.2s-.4-3.6-1.1-5.1c-.7-1.4-1.8-2.6-3.2-3.4Zm-.1 14.31c-1.2 1.3-2.8 2-4.7 2s-3.4-.7-4.6-2-1.8-3.1-1.8-5.4c0-2.9.6-4.9 1.9-6.1 1.3-1.2 2.8-1.8 4.6-1.8 1.3 0 2.4.3 3.4 1s1.8 1.5 2.3 2.7c.5 1.2.8 2.5.8 4.1-.1 2.3-.7 4.2-1.9 5.5ZM920.6 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM947.42 266.07c-.8-.7-1.7-1.1-2.8-1.4-.8-.2-1.9-.3-3.4-.3h-6.6v19.01h6.9c1.2 0 2.2-.1 3.1-.3.9-.2 1.6-.5 2.3-1 .6-.4 1.2-1 1.7-1.7s1-1.7 1.3-2.8c.3-1.1.5-2.4.5-3.8 0-1.7-.2-3.2-.7-4.5-.6-1.2-1.3-2.3-2.3-3.2Zm-.1 11.41c-.3 1-.8 1.8-1.4 2.4-.4.4-1 .8-1.7 1-.7.2-1.7.4-3 .4h-4.1v-14.51h4c1.5 0 2.6.1 3.3.4.9.4 1.7 1.1 2.4 2.1s1 2.6 1 4.6c0 1.4-.2 2.6-.5 3.6ZM956.42 274.78h10.61v-2.21h-10.61v-5.9h11.31v-2.2h-13.81v19.01h14.21v-2.2h-11.71v-6.5zM986.74 278.28c-.4 1-.7 2.1-1 3.1-.3-1-.6-2-1-3.1l-4.9-13.81h-2.7l7.4 19.01h2.6l7.5-19.01h-2.6l-5.3 13.81ZM999.35 274.78h10.5v-2.21h-10.5v-5.9h11.21v-2.2h-13.71v19.01h14.21v-2.2h-11.71v-6.5zM1027.07 279.38l-10.01-14.91h-2.6v19.01h2.4v-14.91l10.01 14.91h2.6v-19.01h-2.4v14.91zM1047.38 264.47h-15.11v2.2h6.3v16.81h2.5v-16.81h6.31v-2.2zM1053.18 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.8 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM1079.2 275.38c-.5-.8-1.3-1.4-2.5-1.9-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7s1.9-1.2 2.5-2.1c.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7Z"
        style={{
          fill: "#16232b",
          fillOpacity: 1,
        }}
      />
      <path
        d="M487.92 350.32V0l-71.85 71.95v214.73l-214.43-.4-64.04 64.04z"
        style={{
          display: "inline",
          fill: "#16232b",
          fillOpacity: 1,
        }}
      />
      <path
        d="m291.5 308.5-90.86-21.82-64.04 64.14 350.32-.1L291.5 308.5z"
        style={{
          fill: "#283c4c",
          fillOpacity: 1,
        }}
      />
      <path
        d="M225.35 33.02C101.87 34.12 1.11 134.99 0 258.37c-.5 63.54 25.02 121.08 66.54 162.7l55.54-55.54c-27.62-28.02-44.13-66.94-42.63-109.77 2.8-77.45 65.84-140.49 143.29-143.29 42.83-1.5 81.65 15.01 109.77 42.63l55.54-55.54c-41.53-41.53-99.16-67.14-162.7-66.54Z"
        style={{
          display: "inline",
          fill: "#16232b",
          fillOpacity: 1,
        }}
      />
      <path
        d="M227.25 33.02c-76.95 0-144.89 38.22-186.02 96.66 36.92-25.92 81.95-41.23 130.48-41.23 62.74 0 119.58 25.42 160.7 66.54l55.54-55.44c-41.13-41.13-97.96-66.54-160.7-66.54ZM79.46 255.46c.9-26.42 8.91-51.23 22.11-72.55-27.12 37.12-43.23 82.65-43.63 131.68-.3 34.02 6.9 66.24 19.91 95.26l44.33-44.33c-27.62-28.12-44.23-67.14-42.73-110.07Z"
        style={{
          fill: "#283c4c",
          fillOpacity: 1,
        }}
      />
    </svg>
  )
}


export const LoginImage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={300}
      height={300}
    >
      <defs>
        <linearGradient
          id="j"
          x1={2743.5}
          x2={-643}
          y1={5996.9}
          y2={1791.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="m"
          x1={1058.9}
          x2={1269.4}
          y1={1815.2}
          y2={1815.2}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="n"
          x1={824.8}
          x2={1034.9}
          y1={1815.2}
          y2={1815.2}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="o"
          x1={591}
          x2={800.6}
          y1={1815.2}
          y2={1815.2}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="p"
          x1={1056.3}
          x2={1266.4}
          y1={1968.7}
          y2={1968.7}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="q"
          x1={822.6}
          x2={1032.3}
          y1={1968.6}
          y2={1968.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="r"
          x1={589.2}
          x2={798.4}
          y1={1968.5}
          y2={1968.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="s"
          x1={1053.7}
          x2={1263.4}
          y1={2120.6}
          y2={2120.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="t"
          x1={820.4}
          x2={1029.7}
          y1={2120.5}
          y2={2120.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="u"
          x1={587.4}
          x2={796.3}
          y1={2120.3}
          y2={2120.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="v"
          x1={1051.1}
          x2={1260.5}
          y1={2272}
          y2={2272}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="w"
          x1={818.2}
          x2={1027.2}
          y1={2271.8}
          y2={2271.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="x"
          x1={585.6}
          x2={794.1}
          y1={2271.5}
          y2={2271.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="y"
          x1={1048.5}
          x2={1257.5}
          y1={2422.9}
          y2={2422.9}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="z"
          x1={816.1}
          x2={1024.6}
          y1={2422.6}
          y2={2422.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="A"
          x1={583.9}
          x2={792}
          y1={2422.3}
          y2={2422.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="B"
          x1={1045.9}
          x2={1254.6}
          y1={2573.2}
          y2={2573.2}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="C"
          x1={813.9}
          x2={1022.1}
          y1={2572.8}
          y2={2572.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="D"
          x1={582.1}
          x2={789.9}
          y1={2572.5}
          y2={2572.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="E"
          x1={1043.4}
          x2={1251.6}
          y1={2723}
          y2={2723}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="F"
          x1={811.7}
          x2={1019.6}
          y1={2722.6}
          y2={2722.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="G"
          x1={580.3}
          x2={787.7}
          y1={2722.1}
          y2={2722.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="H"
          x1={1040.8}
          x2={1248.7}
          y1={2872.3}
          y2={2872.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="I"
          x1={809.6}
          x2={1017.1}
          y1={2871.8}
          y2={2871.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="J"
          x1={578.6}
          x2={785.6}
          y1={2871.3}
          y2={2871.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="K"
          x1={1038.3}
          x2={1245.8}
          y1={3021.1}
          y2={3021.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="L"
          x1={807.4}
          x2={1014.6}
          y1={3020.6}
          y2={3020.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="M"
          x1={576.8}
          x2={783.5}
          y1={3020}
          y2={3020}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#dae3fe",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9effd",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="T"
          x1={4393.1}
          x2={3787.2}
          y1={-515.5}
          y2={3018.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="U"
          x1={1712}
          x2={2780.2}
          y1={1438.1}
          y2={1438.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="V"
          x1={2295.6}
          x2={2722.9}
          y1={856.3}
          y2={-129.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#09005d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#1a0f91",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="W"
          x1={2607.7}
          x2={1852.3}
          y1={1439.1}
          y2={6674.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="X"
          x1={2450}
          x2={1655.4}
          y1={1404}
          y2={6911.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="Y"
          x1={2121.3}
          x2={3378.5}
          y1={1821.8}
          y2={-677.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fe7062",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="Z"
          x1={937.6}
          x2={1056.2}
          y1={3129}
          y2={3129}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#09005d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#1a0f91",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="aa"
          x1={1016.3}
          x2={992.4}
          y1={3041.9}
          y2={3250.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ab"
          x1={1118.2}
          x2={1288.9}
          y1={3137.1}
          y2={3137.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#09005d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#1a0f91",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ac"
          x1={1213.9}
          x2={1203.5}
          y1={3064}
          y2={3268.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ad"
          x1={2197.4}
          x2={1959.3}
          y1={3012.3}
          y2={1876.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#09005d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#1a0f91",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ae"
          x1={1641.5}
          x2={832.3}
          y1={1678.6}
          y2={2571.3}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="af"
          x1={1893.8}
          x2={1036.6}
          y1={1984.3}
          y2={3557.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ag"
          x1={934.9}
          x2={1003.9}
          y1={1887.7}
          y2={1699.1}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ah"
          x1={1197.1}
          x2={1166.9}
          y1={1296.7}
          y2={1527.7}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ai"
          x1={1232.2}
          x2={1200.7}
          y1={1306.6}
          y2={1547.4}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#4042e2",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f52ff",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="aj"
          x1={1270.9}
          x2={803.5}
          y1={1745.5}
          y2={2117.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ak"
          x1={1117.1}
          x2={1419.4}
          y1={1448.4}
          y2={1837.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#09005d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#1a0f91",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="al"
          x1={1258.5}
          x2={941.9}
          y1={1630.7}
          y2={1872.9}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="am"
          x1={1526.8}
          x2={944.4}
          y1={1622.6}
          y2={2125.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="an"
          x1={1448}
          x2={1108.6}
          y1={1630.2}
          y2={1923.4}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ao"
          x1={1458.8}
          x2={983.2}
          y1={1629.7}
          y2={2040.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ap"
          x1={1975.6}
          x2={2965.2}
          y1={315.5}
          y2={1621.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#e1473d",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#e9605a",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="aq"
          x1={2493.1}
          x2={2140.7}
          y1={699.3}
          y2={2427.6}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fe7062",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="ar"
          x1={1148.1}
          x2={2847.3}
          y1={1392}
          y2={1519}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#ff9085",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#fb6fbb",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="as"
          x1={1538.5}
          x2={2127.4}
          y1={1389.7}
          y2={-107.8}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fe7062",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="at"
          x1={2378.4}
          x2={2306.5}
          y1={630.2}
          y2={769.4}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fe7062",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="au"
          x1={1412.8}
          x2={1066}
          y1={1944.9}
          y2={3674.5}
          gradientTransform="matrix(.10241 0 0 .10241 -39.977 -38.873)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#febbba",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ff928e",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <clipPath id="b">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="c">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="d">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="e">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="f">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="g">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="h">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="i">
          <path d="M0 0h300v300H0z" />
        </clipPath>
        <mask id="l">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.501961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="O">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.501961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="Q">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.6,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="S">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.6,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="aw">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.301961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="ay">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.301961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="aA">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.301961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <mask id="aC">
          <g filter="url(#a)">
            <path
              d="M0 0h300v300H0z"
              style={{
                fill: "#000",
                fillOpacity: 0.301961,
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <g id="k" clipPath="url(#b)">
          <path
            d="m111.043 99.734 27.887-.093-.012-3.391-27.856.082ZM110.969 112.219l27.992-.133-.012-3.41-27.957.11ZM110.887 124.793l28.113-.152-.008-3.442-28.082.145ZM110.816 137.484l28.227-.187-.012-3.469-28.195.172ZM110.734 150.273l28.348-.214-.008-3.5-28.32.203ZM110.57 176.184l28.586-.286-.011-3.562-28.555.273ZM110.336 215.871l28.941-.39-.011-3.645-28.91.379ZM110.652 163.18l28.473-.258-.023-3.531-28.43.246ZM110.5 189.305l28.695-.317-.011-3.597-28.664.308ZM110.418 202.527l28.82-.347-.011-3.63-28.79.352ZM110.254 229.328l29.066-.422-.011-3.683-29.036.406ZM110.16 242.898l29.2-.46-.012-3.708-29.157.438ZM110.078 256.59l29.324-.5-.011-3.738-29.282.48ZM109.996 270.395l29.457-.532-.023-3.777-29.41.52ZM74.492 99.855l28.051-.09.031-3.402-28.023.082ZM74.254 112.371l28.176-.121.03-3.422-28.132.113ZM74.031 125l28.285-.156.032-3.461-28.258.156ZM73.793 137.73l28.41-.195.031-3.484-28.367.187ZM73.57 150.563l28.52-.215.031-3.524-28.492.215ZM73.098 176.555l28.77-.29.03-3.574-28.738.278ZM72.371 216.371l29.137-.379.031-3.664-29.105.379ZM73.332 163.508l28.645-.258.03-3.543-28.612.246ZM72.852 189.715l28.89-.317.031-3.605-28.851.316ZM72.617 202.988l29.012-.347.031-3.637-28.98.348ZM72.125 229.879l29.258-.43.031-3.683-29.227.406ZM71.879 243.492l29.383-.453.039-3.726-29.36.453ZM71.621 257.234l29.516-.5.043-3.757-29.485.488ZM71.379 271.094l29.637-.543.043-3.79-29.621.52Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#fff",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="N" clipPath="url(#c)">
          <path
            d="m264.426 159.176 21.387-.024.171-8.714H264.57ZM240.453 159.176l21.363-.031.153-8.708h-21.395ZM216.508 159.164l21.344-.02.12-8.707H216.61ZM264.16 174.813l21.344.011.176-8.656-21.375-.008ZM240.227 174.8l21.332.012.144-8.652-21.351-.012ZM216.324 174.781l21.301.02.125-8.653h-21.324ZM263.895 190.34l21.312.02.164-8.626-21.332-.02ZM240 190.32l21.293.02.144-8.625-21.312-.008ZM216.14 190.297l21.27.023.125-8.613-21.293-.023ZM263.629 205.813l21.27.023.163-8.594-21.289-.02ZM239.777 205.781l21.262.031.14-8.59-21.28-.023ZM215.953 205.762l21.23.02.126-8.583-21.25-.02ZM263.363 221.238l21.239.032.164-8.563-21.262-.031ZM239.563 221.195l21.207.032.144-8.551-21.23-.031ZM215.77 221.164l21.199.031.125-8.55-21.223-.032ZM263.098 236.598l21.199.043.172-8.532-21.23-.043ZM239.336 236.559l21.18.039.144-8.532-21.203-.027ZM215.598 236.516l21.156.043.125-8.532-21.18-.03ZM262.84 251.922l21.16.039.164-8.5-21.18-.043ZM239.11 251.867l21.148.043.144-8.5-21.168-.043ZM215.41 251.816l21.13.043.112-8.492-21.136-.039ZM262.574 267.18l21.13.05.163-8.468-21.148-.051ZM238.895 267.117l21.109.063.133-8.48-21.117-.04ZM215.227 267.066l21.09.051.12-8.469-21.109-.05ZM262.309 282.387l21.097.062.16-8.449-21.105-.05ZM238.672 282.328l21.066.059.14-8.45-21.085-.05ZM215.055 282.266l21.043.05.125-8.437-21.067-.05Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#fff",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="P" clipPath="url(#d)">
          <path
            d="M45.14 91.734c7.157 14.555 13.844 29.332 20.38 44.184 1.636 3.715 3.207 7.445 4.793 11.184l2.386 5.59 2.324 5.62c1.547 3.75 3.133 7.489 4.641 11.258l4.484 11.305c2.899 7.57 5.868 15.129 8.622 22.758 1.382 3.808 2.847 7.597 4.148 11.437l3.977 11.504c5.14 15.39 9.89 30.918 13.843 46.649l-.675.183-3.41-11.664-.848-2.918-.914-2.89-1.852-5.786-1.836-5.785c-.613-1.937-1.289-3.84-1.933-5.765-1.313-3.832-2.582-7.672-3.922-11.493-5.43-15.257-11.063-30.449-17.024-45.523-3.031-7.508-6-15.043-9.082-22.531l-2.297-5.621-2.343-5.614c-1.567-3.738-3.125-7.476-4.73-11.195a1494.471 1494.471 0 0 0-9.579-22.344c-3.203-7.437-6.492-14.851-9.79-22.246Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#fff",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="R" clipPath="url(#e)">
          <path
            d="M110.242 34.129c4.774 16.355 9.012 32.851 13.078 49.39 1.024 4.141 1.977 8.286 2.942 12.434l1.441 6.227 1.406 6.226c.91 4.168 1.883 8.309 2.743 12.485l2.613 12.507c1.629 8.368 3.328 16.711 4.793 25.102.746 4.2 1.566 8.375 2.222 12.586l2.036 12.617c2.53 16.848 4.652 33.774 5.902 50.766l-.738.062-1.414-12.68-.348-3.163-.43-3.165-.87-6.32-.852-6.32c-.286-2.11-.645-4.207-.961-6.309-.657-4.199-1.29-8.406-1.977-12.605-2.86-16.766-5.941-33.5-9.371-50.164-1.781-8.313-3.492-16.653-5.324-24.957l-1.363-6.239-1.403-6.214c-.941-4.157-1.887-8.305-2.867-12.442a1637.922 1637.922 0 0 0-5.86-24.848 1993.574 1993.574 0 0 0-6.105-24.785Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#fff",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="av" clipPath="url(#f)">
          <path
            d="M254.688 52.242a1.007 1.007 0 0 1-.961-1.054c.039-1.075.039-2.18-.012-3.266a1.01 1.01 0 0 1 .953-1.043h.008a.992.992 0 0 1 1.054.96 40.17 40.17 0 0 1 .012 3.43c-.02.524-.441.934-.941.973h-.113Zm-1.567-9.594a38.768 38.768 0 0 0-.726-3.187 1 1 0 0 1 .714-1.227.991.991 0 0 1 1.23.707 37.13 37.13 0 0 1 .77 3.348 1.024 1.024 0 0 1-.812 1.18 1.26 1.26 0 0 1-.121.008 1.006 1.006 0 0 1-1.055-.829Zm-2.469-8.183a38.548 38.548 0 0 0-1.414-2.95 1.002 1.002 0 0 1 .41-1.363 1 1 0 0 1 1.364.41 40.477 40.477 0 0 1 1.496 3.106 1.01 1.01 0 0 1-.535 1.32c-.11.047-.22.075-.328.082a1.006 1.006 0 0 1-.993-.605Zm-4.238-7.434a42.187 42.187 0 0 0-2.039-2.562.998.998 0 0 1 .09-1.414 1.009 1.009 0 0 1 1.426.093c.746.86 1.472 1.762 2.148 2.696a1.003 1.003 0 0 1-.223 1.402.95.95 0 0 1-.523.195 1.006 1.006 0 0 1-.879-.41Zm-5.797-6.308a38.355 38.355 0 0 0-2.55-2.04 1 1 0 0 1-.215-1.402 1 1 0 0 1 1.402-.226 41.957 41.957 0 0 1 2.695 2.152c.418.355.461 1.004.09 1.422a1.022 1.022 0 0 1-.695.34.99.99 0 0 1-.727-.246Zm-7.035-4.868a41.504 41.504 0 0 0-2.941-1.421 1.007 1.007 0 0 1-.532-1.32c.223-.512.817-.75 1.332-.524a38.76 38.76 0 0 1 3.09 1.496.999.999 0 0 1 .41 1.36 1.02 1.02 0 0 1-.828.534 1.013 1.013 0 0 1-.531-.125Zm-37.445-.468a1.007 1.007 0 0 1 .422-1.364 42.427 42.427 0 0 1 3.093-1.484 1.019 1.019 0 0 1 1.328.531 1.007 1.007 0 0 1-.53 1.32c-1.005.43-1.997.903-2.95 1.415a.822.822 0 0 1-.41.113.989.989 0 0 1-.953-.531Zm29.496-2.703a39.826 39.826 0 0 0-3.176-.739 1.002 1.002 0 0 1-.809-1.168c.102-.554.625-.91 1.18-.808 1.113.203 2.242.46 3.348.765a1 1 0 0 1 .695 1.243 1 1 0 0 1-.898.734c-.11.008-.223 0-.34-.027Zm-21.414-.739a1.014 1.014 0 0 1 .715-1.238c1.097-.3 2.222-.543 3.351-.75a1.005 1.005 0 0 1 1.176.809 1.007 1.007 0 0 1-.82 1.168c-1.063.195-2.141.441-3.184.718-.066.02-.133.032-.195.04a1.023 1.023 0 0 1-1.043-.747Zm12.965-.593a41.381 41.381 0 0 0-3.266 0 1.008 1.008 0 0 1-1.047-.965c-.02-.551.402-1.012.941-1.055h.024c1.144-.039 2.305-.039 3.441 0 .551.031.98.504.961 1.055a1.01 1.01 0 0 1-.941.965h-.113ZM191.172 19.809c.191-.02.398-.09.562-.223.41-.32.828-.637 1.25-.953a.993.993 0 0 0 .215-1.403 1 1 0 0 0-1.402-.226c-.442.328-.89.664-1.324 1.004-.43.347-.5.984-.153 1.414.207.273.532.41.852.387Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#91b3fa",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="ax" clipPath="url(#g)">
          <path
            d="M176.473 46.805a1 1 0 0 0 .933-.91c.051-.524.114-1.043.184-1.56a1 1 0 0 0-.86-1.136.999.999 0 0 0-1.136.864c-.07.542-.145 1.093-.196 1.636-.05.555.36 1.047.91 1.106h.165ZM216.027 89.852a1.009 1.009 0 0 1-1.023-.997 1.005 1.005 0 0 1 .992-1.023c1.066-.008 2.14-.07 3.207-.184a1.02 1.02 0 0 1 1.106.91 1.002 1.002 0 0 1-.903 1.098c-.472.047-.937.086-1.394.114-.664.039-1.328.07-1.985.082Zm7.578-1.844a1.004 1.004 0 0 1 .747-1.211 41.442 41.442 0 0 0 3.105-.867c.52-.176 1.094.11 1.27.644a1.02 1.02 0 0 1-.645 1.27 39.075 39.075 0 0 1-3.258.91c-.062.016-.12.023-.176.031a1.008 1.008 0 0 1-1.043-.777Zm-13.07 1.547A46.39 46.39 0 0 1 207.2 89a1.019 1.019 0 0 1-.777-1.2 1.01 1.01 0 0 1 1.195-.777c1.047.215 2.11.399 3.164.524a1.008 1.008 0 0 1-.05 2.008 1.629 1.629 0 0 1-.196 0Zm21.293-4.243a1.01 1.01 0 0 1 .461-1.351 44.848 44.848 0 0 0 2.828-1.523 1.002 1.002 0 0 1 1.383.347c.285.469.121 1.094-.348 1.383a41.993 41.993 0 0 1-2.98 1.605 1.005 1.005 0 0 1-1.344-.46Zm-29.914 2.184a39.939 39.939 0 0 1-3.125-1.27 1.011 1.011 0 0 1-.5-1.343c.234-.5.828-.727 1.332-.492.973.441 1.977.851 2.98 1.21a1 1 0 0 1 .602 1.29.985.985 0 0 1-.879.664.936.936 0 0 1-.41-.059Zm-7.957-3.894a36.929 36.929 0 0 1-2.777-1.922 1.009 1.009 0 1 1 1.219-1.61c.851.645 1.73 1.258 2.644 1.832.46.297.602.922.305 1.395-.184.285-.48.441-.79.46a.916.916 0 0 1-.601-.155Zm-6.926-5.528c-.797-.8-1.566-1.64-2.293-2.488a1.01 1.01 0 0 1 .125-1.426.989.989 0 0 1 1.41.125c.7.809 1.426 1.606 2.184 2.356a1.01 1.01 0 0 1 0 1.433c-.176.172-.41.274-.644.285-.278.02-.563-.07-.782-.285Zm-5.55-6.914a41.218 41.218 0 0 1-1.688-2.941.995.995 0 0 1 .43-1.352.99.99 0 0 1 1.351.422 39.988 39.988 0 0 0 1.61 2.785 1.01 1.01 0 0 1-.309 1.395c-.145.09-.309.14-.473.152a1.034 1.034 0 0 1-.922-.46Zm-3.891-7.969a44.903 44.903 0 0 1-1.012-3.234 1.011 1.011 0 0 1 .715-1.23 1.007 1.007 0 0 1 1.238.718c.27 1.024.594 2.059.953 3.063a1.008 1.008 0 0 1-.613 1.289.954.954 0 0 1-.277.062 1.02 1.02 0 0 1-1.004-.668Zm-2.059-8.62c-.101-.821-.172-1.66-.234-2.481-.016-.3-.027-.598-.043-.89-.02-.563.402-1.044.965-1.055.55-.02 1.023.41 1.054.96.008.29.02.57.04.852.05.79.125 1.578.226 2.355a1.016 1.016 0 0 1-.879 1.126.194.194 0 0 1-.062.011 1.02 1.02 0 0 1-1.067-.879ZM240.113 81.227a.94.94 0 0 0 .563-.215 27.86 27.86 0 0 0 1.273-1.067c.418-.367.461-1 .102-1.422a1.012 1.012 0 0 0-1.426-.093c-.398.34-.797.687-1.207 1.004-.43.347-.504.984-.152 1.425a.998.998 0 0 0 .847.368Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#91b3fa",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="az" clipPath="url(#h)">
          <path
            d="M290.82 76.578a.636.636 0 0 0 .575-.48c.109-.524.214-1.047.296-1.567a.628.628 0 0 0-.515-.719.633.633 0 0 0-.715.512 26.618 26.618 0 0 1-.285 1.496.627.627 0 0 0 .469.746c.062.016.12.02.175.012ZM291.383 71.824a.622.622 0 0 1-.606-.644c.032-.871.02-1.743-.03-2.61-.013-.187-.028-.37-.04-.554a.62.62 0 0 1 .574-.664.633.633 0 0 1 .664.562c.02.191.035.383.043.574.059.91.07 1.832.04 2.742a.618.618 0 0 1-.583.594h-.062Zm-1.137-6.933a26.232 26.232 0 0 0-.828-3.051.616.616 0 0 1 .387-.79.623.623 0 0 1 .789.391c.347 1.036.644 2.11.87 3.196a.626.626 0 0 1-.48.738c-.027.004-.054.008-.082.008a.63.63 0 0 1-.656-.492Zm-2.039-5.97a23.597 23.597 0 0 0-1.566-2.753.631.631 0 0 1 .183-.863.617.617 0 0 1 .86.187c.605.922 1.16 1.895 1.64 2.875a.633.633 0 0 1-.285.84.742.742 0 0 1-.238.063.63.63 0 0 1-.594-.348Zm-3.45-5.296a26.734 26.734 0 0 0-2.183-2.281.62.62 0 1 1 .84-.914 26.63 26.63 0 0 1 2.293 2.398.625.625 0 0 1-.07.879.729.729 0 0 1-.367.145.61.61 0 0 1-.512-.227Zm-4.64-4.277a24.423 24.423 0 0 0-2.672-1.692.622.622 0 0 1-.246-.84.61.61 0 0 1 .848-.246 25.672 25.672 0 0 1 2.797 1.762.619.619 0 0 1-.317 1.125.64.64 0 0 1-.41-.11Zm-5.531-3.035a25.874 25.874 0 0 0-3-.981.621.621 0 0 1-.45-.758c.09-.34.43-.535.759-.453 1.062.277 2.128.625 3.152 1.035a.627.627 0 0 1 .348.809.62.62 0 0 1-.81.347Zm-6.102-1.586a27.515 27.515 0 0 0-3.156-.215.622.622 0 0 1-.625-.625.63.63 0 0 1 .637-.614c1.094 0 2.21.082 3.297.223a.623.623 0 0 1 .543.7.639.639 0 0 1-.575.542.636.636 0 0 1-.12-.011Zm-10.18.062a.62.62 0 0 1 .462-.75 26.883 26.883 0 0 1 2.824-.531c.144-.02.289-.04.43-.051.34-.05.656.203.699.543a.62.62 0 0 1-.555.688c-.129.019-.266.039-.41.058-.91.113-1.813.29-2.703.504-.035.008-.07.012-.102.02a.634.634 0 0 1-.644-.48Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#91b3fa",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id="aB" clipPath="url(#i)">
          <path
            d="M266.477 97.031c-1.086.059-2.184.051-3.258-.031a.623.623 0 0 1-.582-.668.632.632 0 0 1 .664-.574c1.035.074 2.078.082 3.113.031.34-.02.637.246.656.594a.63.63 0 0 1-.586.648h-.007Zm2.52-.863a.642.642 0 0 1 .51-.727 25.62 25.62 0 0 0 3.032-.707.62.62 0 0 1 .766.422.619.619 0 0 1-.407.778 28.306 28.306 0 0 1-3.175.738c-.028.008-.051.008-.075.008a.614.614 0 0 1-.652-.512Zm-9.017.402a26.303 26.303 0 0 1-3.152-.82.606.606 0 0 1-.398-.777.61.61 0 0 1 .777-.403c.984.32 1.996.586 3.012.782.336.07.562.398.492.726a.607.607 0 0 1-.574.5.43.43 0 0 1-.157-.008Zm15.16-2.082a.625.625 0 0 1 .317-.828c.941-.41 1.875-.89 2.766-1.414a.622.622 0 0 1 .851.215.623.623 0 0 1-.219.852c-.93.55-1.902 1.054-2.898 1.496a.618.618 0 0 1-.816-.32Zm-21.343.063a25.353 25.353 0 0 1-2.867-1.547.633.633 0 0 1-.207-.86.633.633 0 0 1 .863-.203c.879.551 1.8 1.055 2.734 1.485.317.14.45.52.297.828a.6.6 0 0 1-.523.36.531.531 0 0 1-.297-.063Zm-5.531-3.442a27.117 27.117 0 0 1-2.407-2.191.615.615 0 0 1 .012-.879.622.622 0 0 1 .879.008 26.789 26.789 0 0 0 2.305 2.101.62.62 0 0 1 .093.872.633.633 0 0 1-.453.234.643.643 0 0 1-.43-.145Zm-4.536-4.66a27.993 27.993 0 0 1-1.812-2.71.617.617 0 0 1 .215-.852.638.638 0 0 1 .86.215 22.304 22.304 0 0 0 1.73 2.59.625.625 0 0 1-.121.87.537.537 0 0 1-.34.126.621.621 0 0 1-.532-.239ZM281.242 91.59a.702.702 0 0 0 .34-.121c.418-.328.84-.664 1.227-1.016a.624.624 0 0 0 .062-.879.627.627 0 0 0-.879-.062c-.379.328-.77.656-1.168.965a.62.62 0 0 0 .418 1.113Zm0 0"
            style={{
              stroke: "none",
              fillRule: "nonzero",
              fill: "#91b3fa",
              fillOpacity: 1,
            }}
          />
        </g>
        <filter
          id="a"
          width="100%"
          height="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
        </filter>
      </defs>
      <path
        d="M258.117 250.395c-5.816 6.011-11.305 9.902-15.648 12.964-51.063 36.059-111.477 25.551-124.32 22.98-18.958-3.788-55.61-11.109-82.106-41.78C-4.051 198.152 2.195 125.05 33.289 76.78c5.684-8.816 35.734-57.812 96.8-65.676 36.954-4.753 80.04 4.844 111.235 30.57 65.48 53.993 60.82 163.095 16.793 208.72Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#j)",
        }}
      />
      <path
        d="M62.098 88.508c.02-1.371 1.168-2.469 2.57-2.469h85.238c1.426 0 2.942 1.137 2.942 2.52v193.183c0 1.035-.606 2.028-1.364 2.758-.746.727-1.863 1.137-2.918 1.137l-86.171-.239a4.064 4.064 0 0 1-2.868-1.168 3.794 3.794 0 0 1-1.156-2.785Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref="#k" mask="url(#l)" />
      <path
        d="M13.188 141.793c.027-1.574 1.656-2.875 3.632-2.875h75.082c2.008 0 3.985 1.36 3.985 2.957v142.973c0 .765-.555 1.504-1.242 2.047-.684.543-1.7.84-2.672.84l-78.489-.165c-.972-.011-1.937-.316-2.613-.87-.687-.552-1.074-1.321-1.055-2.098Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <path
        d="m68.469 155.766 21.383-.024.175-8.715H68.613Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#m)",
        }}
      />
      <path
        d="m44.492 155.754 21.363-.02.157-8.707H44.625Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#n)",
        }}
      />
      <path
        d="m20.55 155.754 21.34-.02.126-8.707H20.652Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#o)",
        }}
      />
      <path
        d="m68.203 171.402 21.344.012.172-8.656-21.371-.008Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#p)",
        }}
      />
      <path
        d="m44.27 171.383 21.332.008.144-8.641-21.355-.012Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#q)",
        }}
      />
      <path
        d="m20.363 171.371 21.305.012.121-8.645-21.32-.011Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#r)",
        }}
      />
      <path
        d="m67.938 186.93 21.312.007.164-8.62-21.336-.012Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#s)",
        }}
      />
      <path
        d="m44.043 186.906 21.293.024.14-8.625-21.3-.008Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#t)",
        }}
      />
      <path
        d="m20.18 186.887 21.273.02.121-8.622-21.293-.012Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#u)",
        }}
      />
      <path
        d="m67.668 202.402 21.273.02.176-8.59-21.305-.02Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#v)",
        }}
      />
      <path
        d="m43.816 202.371 21.262.024.145-8.583-21.274-.023Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#w)",
        }}
      />
      <path
        d="m19.996 202.34 21.242.031.11-8.59-21.25-.023Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#x)",
        }}
      />
      <path
        d="m67.402 217.828 21.243.031.164-8.574-21.262-.02Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#y)",
        }}
      />
      <path
        d="m43.602 217.785 21.21.031.145-8.562-21.23-.02Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#z)",
        }}
      />
      <path
        d="m19.82 217.754 21.192.031.12-8.562-21.218-.02Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#A)",
        }}
      />
      <path
        d="m67.137 233.188 21.199.042.176-8.542-21.223-.032Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#B)",
        }}
      />
      <path
        d="m43.379 233.148 21.176.04.144-8.532-21.199-.039Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#C)",
        }}
      />
      <path
        d="m19.637 233.105 21.16.032.121-8.52-21.18-.031Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#D)",
        }}
      />
      <path
        d="m66.883 248.512 21.156.039.164-8.512-21.18-.039Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#E)",
        }}
      />
      <path
        d="m43.152 248.457 21.149.043.144-8.5-21.172-.043Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#F)",
        }}
      />
      <path
        d="m19.453 248.406 21.129.043.113-8.5-21.14-.043Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#G)",
        }}
      />
      <path
        d="m66.613 263.77 21.13.05.163-8.48-21.148-.05Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#H)",
        }}
      />
      <path
        d="m42.938 263.707 21.105.05.144-8.468-21.128-.05Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#I)",
        }}
      />
      <path
        d="m19.281 263.648 21.086.059.113-8.469-21.109-.05Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#J)",
        }}
      />
      <path
        d="m66.36 278.977 21.085.062.164-8.45-21.105-.062Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#K)",
        }}
      />
      <path
        d="m42.71 278.918 21.08.05.144-8.44-21.098-.051Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#L)",
        }}
      />
      <path
        d="m19.094 278.844 21.047.062.125-8.437-21.067-.051Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#M)",
        }}
      />
      <path
        d="M209.133 145.207c.043-1.578 1.66-2.879 3.648-2.879h75.067c2.02 0 3.996 1.371 3.996 2.969v142.96c0 .766-.563 1.505-1.239 2.048-.687.543-1.71.851-2.675.851l-78.489-.176c-.984 0-1.937-.316-2.62-.87-.676-.551-1.067-1.32-1.048-2.098Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref="#N" mask="url(#O)" />
      <path
        d="M134.504 184.09c-6.125-19.23-17.973-34.563-32.012-43.574-12.558-8.051-21.601-20.606-24.949-35.098a54.377 54.377 0 0 0-1.262-4.578c-7.363-23.137-27.566-37.352-45.133-31.758-17.562 5.59-25.828 28.879-18.453 52.016 1.504 4.73 3.543 9.082 5.989 12.976 7.816 12.422 10.878 27.313 8 41.711-2.57 12.875-1.875 27.367 2.722 41.785 6.852 21.508 20.864 38.14 37.086 46.508 6.133 3.164 11.664 7.422 16.254 12.567 7.61 8.55 18.34 12.566 28.203 9.43 10.64-3.391 17.278-14.165 17.758-26.731.277-7.106 1.95-14.082 4.672-20.664 6.43-15.559 7.32-35.14 1.125-54.59Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#91b3fa",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref="#P" mask="url(#Q)" />
      <path
        d="M185.762 145.86c-2.867-21.005-12.328-39.008-25.172-50.88-11.492-10.609-18.559-25.222-19.406-40.82-.09-1.644-.25-3.3-.485-4.969-3.437-25.265-21.71-43.636-40.808-41.035-19.09 2.602-31.782 25.192-28.34 50.457.707 5.172 2.027 10.047 3.851 14.512 5.828 14.258 6.309 30.223.77 44.594-4.957 12.851-6.844 27.969-4.692 43.719 3.196 23.492 14.657 43.23 29.864 54.824 5.754 4.39 10.691 9.8 14.492 15.945 6.316 10.23 16.652 16.324 27.375 14.867 11.562-1.574 20.34-11.508 23.082-24.422 1.559-7.312 4.527-14.218 8.523-20.535 9.41-14.933 13.844-35.015 10.946-56.258Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#7d97f4",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref="#R" mask="url(#S)" />
      <path
        d="M273.531 290.254H106.844a2.36 2.36 0 0 1-2.367-2.367V62.629c0-1.3 1.054-2.356 2.367-2.356H273.53c1.301 0 2.367 1.055 2.367 2.356v225.258a2.368 2.368 0 0 1-2.367 2.367Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#T)",
        }}
      />
      <path
        d="M246.71 259.96H133.298a7.789 7.789 0 0 1-7.785-7.784V102.609a7.78 7.78 0 0 1 7.785-7.78H246.71c4.3 0 7.781 3.48 7.781 7.78v149.567c0 4.293-3.48 7.785-7.781 7.785Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#7d97f4",
          fillOpacity: 1,
        }}
      />
      <path
        d="M242.418 248.469H137.691a2.332 2.332 0 0 1-2.336-2.336v-135.39a2.335 2.335 0 0 1 2.336-2.337h104.727a2.337 2.337 0 0 1 2.336 2.336v135.39a2.335 2.335 0 0 1-2.336 2.337Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#U)",
        }}
      />
      <path
        d="M195 77.91a5.132 5.132 0 0 1-5.129 5.13c-2.828 0-5.121-2.306-5.121-5.13a5.124 5.124 0 1 1 10.25 0Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#V)",
        }}
      />
      <path
        d="m223 160.691-65.973 1.094c-5.02.082-9.105 3.985-9.105 8.727v41.539c0 4.73 4.086 8.406 9.105 8.203l65.973-2.64c4.742-.196 8.574-4.06 8.574-8.637v-40.145c0-4.578-3.832-8.223-8.574-8.14Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#W)",
        }}
      />
      <path
        d="M226.34 153.172c-1.996.031-3.617-1.504-3.617-3.442v-9.093c0-9.125-7.72-16.52-17.266-16.489l-21.496.063c-9.8.02-17.832 7.64-17.832 16.98v9.297c0 1.977-1.7 3.606-3.797 3.637-2.11.043-3.812-1.547-3.812-3.531v-9.332c0-13.325 11.472-24.16 25.44-24.16h21.497c13.57 0 24.496 10.53 24.496 23.464v9.063c0 1.937-1.617 3.512-3.613 3.543Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#X)",
        }}
      />
      <path
        d="M200.695 183.71c0-4.616-4.035-8.241-8.93-7.905-4.343.297-7.917 3.77-8.152 7.906-.183 3.219 1.586 5.992 4.27 7.406 1.137.594 1.71 1.856 1.484 3.102l-1.883 10.57c-.234 1.344.84 2.531 2.262 2.48l4.844-.175c1.414-.051 2.488-1.313 2.254-2.633l-1.883-10.465c-.227-1.25.43-2.5 1.574-3.176 2.492-1.496 4.16-4.136 4.16-7.11Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#Y)",
        }}
      />
      <path
        d="M68.191 290.652c0-.09-.007-.183-.03-.277-1.36-5.426-8.153-8.797-8.153-8.797l-2.692.207c-1.546 4.781-1.351 7.711-1.105 9.024a.772.772 0 0 1 .031.101c2.219.203 6.79.328 11.95-.258Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#Z)",
        }}
      />
      <path
        d="M56.242 290.91c.121.438.438.777.848.86 3.164.664 8.183.132 10.281-.145.473-.059.813-.492.82-.973-5.16.586-9.73.461-11.949.258Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#91b3fa",
          fillOpacity: 1,
        }}
      />
      <path
        d="m56.23 277.781 1.137 5.489c.094.398.399.695.77.738.46.039 1.113.058 1.77-.031.585-.094.991-.688.89-1.32l-.79-4.876Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#aa)",
        }}
      />
      <path
        d="M79.848 290.836c-2.98-.082-4.516-.43-5.305-.758 0 .297 0 .606.008.914.011.336.258.602.554.594l16.325-.102c.511 0 .82-.605.593-1.086-2.14.172-7.59.57-12.175.438Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#91b3fa",
          fillOpacity: 1,
        }}
      />
      <path
        d="M92.023 290.398a1.864 1.864 0 0 0-.062-.125c-1.441-2.007-5.11-6.02-12.36-7.761l-3.484-.102s-1.543 2.684-1.574 7.668c.789.328 2.324.676 5.305.758 4.586.133 10.035-.266 12.175-.438Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ab)",
        }}
      />
      <path
        d="M75.32 277.297c.051.258.778 4.16 1.055 5.664.07.371.348.625.688.644.593.032 1.554.043 2.374-.183.45-.121.747-.574.715-1.086l-.386-6.164Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ac)",
        }}
      />
      <path
        d="M72.68 205.219s4.793 32.886 8.242 72.02c.062.726-.524 1.359-1.23 1.515-1.055.223-2.61.48-3.891.45a1.442 1.442 0 0 1-1.371-1.208c-1.18-6.894-9.578-43.926-11.778-52.078 0 0-2.53 34.617-1.722 52.578a.85.85 0 0 1-.758.89c-.664.075-1.75.134-3.121-.007a1.168 1.168 0 0 1-1.016-.973c-.828-5.84-5.652-40.597-5.45-65.64.013-1.403 1.65-13.004 1.65-13.004Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ad)",
        }}
      />
      <path
        d="m74.531 149.918.645 17.215a48.672 48.672 0 0 0 5.203 1.472c1.035-3.328 3.308-7.402 5.164-10.433-6.832-2.418-11.012-8.254-11.012-8.254Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ae)",
        }}
      />
      <path
        d="M51.52 207.113a1.356 1.356 0 0 1-.891-1.136c-.637-6.176-3.719-44.457 15.742-60.207 0 0 1.113-2.922 10.281 4.257 9.164 7.172 4.258 14.7 2.067 25.075-2.66 12.543-7.32 22.804-5.254 30.527.133.531-.14 1.098-.653 1.289-7.128 2.625-14.226 2.707-21.292.195Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#af)",
        }}
      />
      <path
        d="M73.957 134.297c-.008.543-7.773 11.586-7.773 11.586s1.394 2.742 8.05 4.976l5.746-11.82Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ag)",
        }}
      />
      <path
        d="M70.105 172.059a.23.23 0 0 1-.14-.051c-6.207-4.192-9.125-10.961-9.156-11.02a.265.265 0 0 1 .144-.34c.121-.05.266.012.324.133.032.074 2.891 6.711 8.973 10.817.113.07.145.226.063.347a.246.246 0 0 1-.208.114Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ah)",
        }}
      />
      <path
        d="M79.355 162.676a.236.236 0 0 1-.214-.121c-.02-.02-1.914-2.98-5.532-9.442-1.105-1.988-2.57-3.25-4.332-3.738-2.93-.82-5.754.746-5.777.766a.266.266 0 0 1-.348-.102c-.07-.113-.02-.266.094-.34.121-.07 3.031-1.687 6.164-.816 1.906.531 3.461 1.875 4.64 3.984 3.606 6.45 5.49 9.39 5.509 9.422.082.11.043.266-.07.348a.23.23 0 0 1-.134.039Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ai)",
        }}
      />
      <path
        d="M80.07 127.98s2.766 6.348 2.953 9.676c.184 3.34.899 5.5-2.953 6.168-3.847.676-7.093-1.25-8.855-4.57 0 0-2.758-5.11-2.14-7.207.624-2.09 10.995-4.067 10.995-4.067Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#aj)",
        }}
      />
      <path
        d="m72.535 136.867.215-.09a.527.527 0 0 0 .254-.726c-.543-1.055-1.598-3.465-.234-4.016 1.773-.726 8.757-2.152 10.261-4.629 1.446-2.386.164-5.46-1.761-6.328-.133-.062-.286-.023-.348.11l-.164.296c-.113.215-.418.188-.48-.039-.063-.226-.36-.265-.473-.07-.461.734-1.72 1.945-5.059 2.559-4.75.882-7.894 2.796-7.976 6.082a.254.254 0 0 1-.399.214c-.36-.214-.922-.304-1.672.32-1.3 1.095-.765 3.954 2.09 6.29a.256.256 0 0 1-.012.418c-.52.34-1.289 1.148.72 2.21 2.07 1.106 3.612 1.024 4.206.923.156-.02.246-.164.219-.317l-.637-2.887a.257.257 0 0 1 .258-.32Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ak)",
        }}
      />
      <path
        d="M72.648 137.484s-1.054-4.058-2.867-2.922c-1.824 1.137.942 4.54 2.406 4.692Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#al)",
        }}
      />
      <path
        d="M108.441 148.625s-1.382-2.457-1.3-3.645c.09-1.199-.657-2.949.144-2.816.785.121.95.02 1.164 1.453.219 1.434 2.715 7.68-.008 5.008Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#am)",
        }}
      />
      <path
        d="m108.695 144.723-.027 4.906c-9.371 10.117-16.973 10.723-23.125 8.543-1.856 3.031-4.129 7.105-5.164 10.433 25.039 5.52 30.941-17.5 30.941-17.5 3.387-1.406 4.075-2.234 3.93-3.156Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#an)",
        }}
      />
      <path
        d="M115.918 139.848c-.809-.317-2.367-3.309-2.676-2.325-.297.985.137 2.325 0 2.747-.12.417-2.078 5.222-1.687 6.289.285.777 1.832.652 2.066 1.921.082.41.422.72.8.72.391 0 .727-.31.81-.72.03-.171 1.484-8.304.687-8.632Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#ao)",
        }}
      />
      <path
        d="M124.45 118.434c10.167 5.14 15.382 16.191 13.577 26.863l2.211 1.117 5.153 2.602-1.145 2.28 3.664 1.856 1.149-2.285 1.843.934-1.156 2.273 2.117 1.074 1.149-2.273 2.968 1.496-.55 1.074 3.808 1.926.555-1.074 1.687.851-1.066 2.098 4.55 2.293 1.063-2.09 3.493 1.774-1.145 2.273 3.738 1.895 1.145-2.286 4.351 2.204c.524.257.922.695 1.137 1.23l3.453 8.664a2.367 2.367 0 0 1-.367 2.375h-.012a1.639 1.639 0 0 1-.152.176c-.016.012-.031.027-.05.039a.74.74 0 0 1-.145.125.312.312 0 0 1-.051.05c-.07.048-.137.09-.207.134l-4.25 2.539a2.367 2.367 0 0 1-2.281.07l-43.457-21.965c-7.528 7.77-19.508 10.125-29.68 4.984-12.504-6.328-17.524-21.585-11.192-34.101 6.317-12.504 21.586-17.516 34.094-11.195Zm-26.2 15.187a5.144 5.144 0 0 0 2.273 6.914 5.132 5.132 0 0 0 6.903-2.273 5.133 5.133 0 0 0-2.274-6.903 5.14 5.14 0 0 0-6.902 2.262Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "url(#ap)",
        }}
      />
      <path
        d="m125.574 137.297 20.606 10.418-1.157 2.273 3.665 1.852 1.16-2.274 1.832.922-1.149 2.285 2.11 1.067 1.16-2.274 2.957 1.493-.543 1.086 3.812 1.925.543-1.086 1.688.864-1.055 2.097 4.547 2.293 1.055-2.097 3.504 1.77-1.157 2.273 3.739 1.894 1.156-2.273 4.351 2.203c.512.258.915.695 1.13 1.23l3.449 8.653a2.371 2.371 0 0 1-.98 2.91l-4.25 2.527c-.7.422-1.56.442-2.278.082l-52.465-26.523Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#aq)",
        }}
      />
      <path
        d="M91.133 128.328c6.32-12.504 21.59-17.523 34.094-11.195 12.515 6.32 17.523 21.59 11.203 34.094-6.328 12.503-21.59 17.523-34.102 11.195-12.508-6.32-17.516-21.59-11.195-34.094Zm17.074 8.633a5.138 5.138 0 0 0-9.168-4.64 5.138 5.138 0 0 0 9.168 4.64Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "url(#ar)",
        }}
      />
      <path
        d="M102.328 162.422c-12.508-6.32-17.516-21.59-11.195-34.094 6.32-12.504 21.59-17.523 34.094-11.195 10.168 5.133 15.382 16.183 13.59 26.855l2.203 1.114c-1.497 2.828-1.415 4.652-.915 5.859 1.407 3.379 39.063 19.816 43.016 24.11a2.337 2.337 0 0 1-1.125 1.73l-4.25 2.527c-.7.422-1.559.442-2.277.082l-43.453-21.976c-7.528 7.78-19.52 10.129-29.688 4.988ZM99.04 132.32a5.138 5.138 0 0 0 9.168 4.64 5.138 5.138 0 0 0-9.168-4.64Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "url(#as)",
        }}
      />
      <path
        d="M95.578 130.57c5.078-10.047 17.348-14.082 27.406-8.992 10.055 5.078 14.082 17.348 9 27.406-5.09 10.047-17.359 14.082-27.406 8.993-10.055-5.082-14.082-17.348-9-27.407Zm12.629 6.39a5.138 5.138 0 0 0-9.168-4.64 5.138 5.138 0 0 0 9.168 4.64Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "url(#at)",
        }}
      />
      <path
        d="M70.105 172.059s23.895 7.996 37.27-2.184c.832-.633 1.875-.91 2.898-.734l5.11.828a4.087 4.087 0 0 0 4.652-3.164c.254-1.211.387-2.532.121-3.668l-9.648-.582.277-1.25s-4.258 1.043-4.34 4.37c0 0-9.996 6.555-28.226-3.613 0 0-7.098 5.563-8.114 9.997Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#au)",
        }}
      />
      <use xlinkHref="#av" mask="url(#aw)" />
      <use xlinkHref="#ax" mask="url(#ay)" />
      <path
        d="M242.02 64.05a.475.475 0 0 0 0-.55l-3.32-4.672a25.244 25.244 0 0 0 1.835-7.883l5.04-2.734a.487.487 0 0 0 .245-.492l-1.129-6.782a.473.473 0 0 0-.386-.39l-5.657-.961a25.078 25.078 0 0 0-4.28-6.871l1.64-5.492a.49.49 0 0 0-.184-.52L230.23 22.7a.476.476 0 0 0-.542 0l-4.68 3.317a25.27 25.27 0 0 0-7.887-1.832l-2.723-5.04a.461.461 0 0 0-.492-.234l-6.789 1.125a.469.469 0 0 0-.39.38l-.954 5.651a25.302 25.302 0 0 0-6.87 4.282l-5.5-1.63a.471.471 0 0 0-.52.177l-3.996 5.59a.488.488 0 0 0-.012.554l3.328 4.668a24.86 24.86 0 0 0-1.832 7.887l-5.039 2.734a.464.464 0 0 0-.246.492l1.129 6.782a.456.456 0 0 0 .387.386l5.644.965a25.015 25.015 0 0 0 4.29 6.86l-1.638 5.5a.471.471 0 0 0 .176.523l5.602 4.004a.476.476 0 0 0 .543 0l4.68-3.328a24.915 24.915 0 0 0 7.874 1.843l2.735 5.04a.479.479 0 0 0 .492.234l6.79-1.125a.483.483 0 0 0 .39-.379l.953-5.652a25.302 25.302 0 0 0 6.87-4.282l5.5 1.625a.454.454 0 0 0 .513-.171Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#91b3fa",
          fillOpacity: 1,
        }}
      />
      <path
        d="M214.879 56.156c-3.8-.308-6.637-3.656-6.32-7.457a6.892 6.892 0 0 1 2.43-4.71 6.857 6.857 0 0 1 5.038-1.606c3.797.304 6.637 3.656 6.317 7.453a6.913 6.913 0 0 1-6.45 6.332 5.522 5.522 0 0 1-1.015-.012Zm-2.856-10.937a5.289 5.289 0 0 0-1.855 3.613 5.291 5.291 0 0 0 4.844 5.715 5.305 5.305 0 0 0 5.726-4.844c.235-2.906-1.937-5.476-4.843-5.715a4.103 4.103 0 0 0-.79-.008c-1.128.07-2.203.5-3.082 1.239Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <path
        d="M216.387 66.152a18.82 18.82 0 0 0 1.738-.207c.18-.027.36-.054.543-.09a17.32 17.32 0 0 0 2.621-.75.074.074 0 0 1 .031-.007c.035-.016.07-.028.102-.043.062-.02.125-.043.187-.07a.4.4 0 0 0 .254-.4.247.247 0 0 0-.031-.124.398.398 0 0 0-.52-.223 17.006 17.006 0 0 1-3.32.922 16.22 16.22 0 0 1-14.715-5.183 16.125 16.125 0 0 1-3.914-8.153 16.017 16.017 0 0 1-.195-1.66 16.072 16.072 0 0 1 3-10.414 16.047 16.047 0 0 1 10.52-6.555c8.816-1.465 17.175 4.516 18.628 13.325.09.546.153 1.093.184 1.636a16.028 16.028 0 0 1-1.086 6.946.585.585 0 0 0-.027.175.383.383 0 0 0 .254.348.398.398 0 0 0 .523-.227 16.844 16.844 0 0 0 1.145-7.293 15.808 15.808 0 0 0-.192-1.71c-1.539-9.258-10.316-15.524-19.562-14-4.477.75-8.399 3.187-11.04 6.882-2.304 3.22-3.402 7.047-3.144 10.938a16.937 16.937 0 0 0 7.074 12.793c3.22 2.293 7.047 3.39 10.942 3.144Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref="#az" mask="url(#aA)" />
      <use xlinkHref="#aB" mask="url(#aC)" />
      <path
        d="M282.89 79.855a.31.31 0 0 0 0-.37l-2.218-3.122a16.757 16.757 0 0 0 1.226-5.285l3.372-1.824a.312.312 0 0 0 .164-.328l-.758-4.535a.32.32 0 0 0-.258-.266l-3.777-.637a16.313 16.313 0 0 0-2.868-4.597l1.094-3.676a.306.306 0 0 0-.12-.348l-3.74-2.683a.337.337 0 0 0-.37 0l-3.121 2.222a16.761 16.761 0 0 0-5.286-1.23l-1.824-3.367a.304.304 0 0 0-.328-.164l-4.547.757a.311.311 0 0 0-.254.254l-.636 3.782a16.674 16.674 0 0 0-4.598 2.867l-3.676-1.098c-.133-.031-.277.012-.351.125l-2.68 3.738a.33.33 0 0 0 0 .367l2.223 3.133a16.585 16.585 0 0 0-1.23 5.274l-3.372 1.824a.315.315 0 0 0-.164.328l.758 4.547a.315.315 0 0 0 .258.258l3.777.644a16.692 16.692 0 0 0 2.867 4.586l-1.094 3.688c-.043.125.012.265.121.347l3.739 2.676a.31.31 0 0 0 .37 0l3.134-2.222a16.612 16.612 0 0 0 5.273 1.226l1.824 3.371a.315.315 0 0 0 .328.164l4.547-.75a.32.32 0 0 0 .254-.265l.649-3.778c1.699-.707 3.246-1.68 4.586-2.867l3.687 1.094a.297.297 0 0 0 .34-.121Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#91b3fa",
          fillOpacity: 1,
        }}
      />
      <path
        d="M264.723 74.664a4.727 4.727 0 0 1-4.301-5.09 4.707 4.707 0 0 1 5.082-4.304c2.59.214 4.523 2.5 4.3 5.082a4.643 4.643 0 0 1-1.648 3.203 4.622 4.622 0 0 1-2.734 1.11 6.958 6.958 0 0 1-.7 0Zm-3.063-4.988c-.082.922.207 1.82.813 2.527a3.414 3.414 0 0 0 2.355 1.211 3.41 3.41 0 0 0 2.527-.809 3.414 3.414 0 0 0 1.211-2.355 3.458 3.458 0 0 0-3.168-3.738 3.717 3.717 0 0 0-.511-.012 3.482 3.482 0 0 0-3.227 3.176Zm0 0"
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
      <path
        d="M265.777 81.605a9.4 9.4 0 0 0 1.18-.132c.79-.133 1.566-.336 2.305-.625.035-.012.066-.028.101-.04a.64.64 0 0 0 .399-.617.535.535 0 0 0-.051-.191.614.614 0 0 0-.797-.352c-.7.278-1.426.473-2.16.594a1.868 1.868 0 0 0-.113.024 10.422 10.422 0 0 1-7.621-1.782c-.008-.007-.012-.011-.02-.011-.02-.016-.043-.028-.063-.043a10.393 10.393 0 0 1-4.238-6.82 8.948 8.948 0 0 1-.125-1.063 10.445 10.445 0 0 1 1.938-6.75 10.456 10.456 0 0 1 6.808-4.242c2.766-.461 5.543.187 7.825 1.816a10.446 10.446 0 0 1 4.242 6.809c.054.355.093.71.12 1.066a10.55 10.55 0 0 1-.706 4.496.566.566 0 0 0-.04.266c.009.234.153.449.387.543a.623.623 0 0 0 .809-.36c.637-1.597.902-3.308.79-5.027-.028-.398-.071-.789-.134-1.18a11.658 11.658 0 0 0-4.75-7.629c-2.539-1.824-5.652-2.539-8.746-2.027a11.704 11.704 0 0 0-7.62 4.742 11.702 11.702 0 0 0-2.173 7.547c.028.403.078.801.145 1.2.992 5.988 6.379 10.167 12.308 9.788Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#bdd0fb",
          fillOpacity: 1,
        }}
      />
    </svg>
  )
}
