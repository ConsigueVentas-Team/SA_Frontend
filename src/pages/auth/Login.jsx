import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AES } from "crypto-js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../../components/essentials/Loading";
import LoginImage from "./LoginImage";
import FrasesLogin from "./FrasesLogin";
import Logo from "./Logo";
export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [msg, setMsg] = useState("");
  const [viewLoading, setViewLoading] = useState(false);
  //Errors
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.title = "Iniciar sesión | Consigue Ventas";
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
  };

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
    if (username !== "" && password !== "") {
      setViewLoading(true);
      if (captchaCompleted) {
        var url = import.meta.env.VITE_API_URL + "/login";
        var headers = {
          Accept: "application/json",
          "Content-type": "application/json",
        };
        var Data = {
          username: username,
          password: password,
          captchaResponse: captchaValue,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Data),
          });
          const responseData = await response.json();

          if (response.ok) {
            if (
              responseData.message === "No autorizado" ||
              responseData.message ===
                "Tu cuenta ha sido bloqueado, contacte a un administrador"
            ) {
              setError(responseData.message);
            } else {
              setMsg(responseData.message);
              const tokenD = responseData.access_token;
              const token = AES.encrypt(
                tokenD,
                import.meta.env.VITE_TOKEN_KEY
              ).toString();
              localStorage.setItem("token", token);
              localStorage.setItem("iduser", responseData.user.id);
              localStorage.setItem("rol", responseData.role.name);
              localStorage.setItem("name", responseData.user.name);
              localStorage.setItem("avatar", responseData.user.avatar);
              localStorage.setItem("surname", responseData.user.surname);
              // localStorage.setItem('shift', responseData.profile.shift)
              localStorage.setItem("shift", responseData.user.shift);
              localStorage.setItem("login", true);
              navigate("/");
              window.location.reload();
            }
          } else {
            setViewLoading(false);
            setError(responseData.error);
          }
        } catch (err) {
          setViewLoading(false);
          setError(err.toString());
          console.log(err);
        }
      } else {
        setViewLoading(false);
        setError("No has marcado el captcha.");
      }
    } else {
      setViewLoading(false);
      setError("Todos los campos son requeridos");
    }
  };

  const onRecaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaCompleted(true);
    setCaptchaError("");
  };

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

            <div className="w-full md:w-1/2">
              <div className="w-full bg-white rounded-lg space-y-2">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-72">
                    <Logo />
                  </div>
                </div>
                <form onSubmit={loginSubmit}>
                  {error !== "" ? (
                    <span className="text-sm text-red-500">
                      {error.toString()}
                    </span>
                  ) : (
                    <span className="text-sm text-green-400">
                      {msg.toString()}
                    </span>
                  )}
                  {error["g-recaptcha-response"] && (
                    <span className="text-sm text-violet-900">
                      {error["g-recaptcha-response"].toString()}
                    </span>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="w-full">
                        <div>
                          <label
                            htmlFor="username"
                            className="block mb-1 font-medium text-gray-900 "
                          >
                            Usuario
                          </label>
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
                        <span className="mt-1 text-sm text-red-500">
                          {usernameError}
                        </span>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="password"
                          className="block mb-1 font-medium text-gray-900 w-full"
                        >
                          Contraseña
                        </label>
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
                            <button
                              type="button"
                              className="absolute inset-y-0 right-2"
                              onClick={handleTogglePassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon
                                  sx={{
                                    fontSize: 20,
                                  }}
                                  className="text-cv-primary cursor-pointer"
                                />
                              ) : (
                                <VisibilityOffIcon
                                  sx={{
                                    fontSize: 20,
                                  }}
                                  className="text-cv-primary cursor-pointer"
                                />
                              )}
                            </button>
                          )}
                        </div>
                        <span className="mt-1 text-sm text-red-500">
                          {passwordError}
                        </span>
                      </div>

                      <div className="w-full flex flex-col items-center justify-center">
                        <ReCAPTCHA
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={onRecaptchaChange}
                          onExpired={() => setCaptchaCompleted(false)}
                          onErrored={() =>
                            setCaptchaError("Hubo un error en el captcha.")
                          }
                        />
                        {captchaError && (
                          <span className="text-red-500 text-xs">
                            {captchaError}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {viewLoading ? (
                        <div className="w-96 h-10">
                          <Loading></Loading>
                        </div>
                      ) : (
                        <input
                          type="submit"
                          className="w-full rounded-lg bg-cv-primary text-white px-10 py-2.5 cursor-pointer uppercase text-base font-bold tracking-wide shadow-3xl active:scale-95 ease-in-out duration-300"
                          value="Iniciar Sesión"
                        />
                      )}
                    </div>
                  </div>
                </form>
                <div className="flex items-center justify-center relative">
                  <Link
                    to="/olvide-contraseña"
                    className="text-sm font-medium text-cv-primary  hover:underline focus:outline-none text-center"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <div className="absolute right-4 flex justify-end">
                    <button className="text-cv-primary"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
