import { AES, enc } from "crypto-js";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AttendanceSection,
  CameraSection,
} from "../../../components/asistencias/MarcarAsistencia";

export const MarcarAsistencia = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(false);
  const [mostrarBotonSalida, setMostrarBotonSalida] = useState(false);
  const [entradaMarcada, setEntradaMarcada] = useState(false);
  const [salidaMarcada, setSalidaMarcada] = useState(false);
  const [tardanzaMañana, setTardanzaMañana] = useState(false);
  const [tardanzaTarde, setTardanzaTarde] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState(false);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [segundaFotoTomada, setSegundaFotoTomada] = useState(false);
  const [mostrarBotonCamara, setMostrarBotonCamara] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [alreadyMarkedAttendance, setAlreadyMarkedAttendance] = useState(false);
  const turno = localStorage.getItem("shift");

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    const fecha = new Date().toISOString().slice(0, 10);
    // comprobar si ya se marcó la entrada y la salida (true o false)
    const entradaMarcadaLocal = localStorage.getItem(`entrada_${fecha}`);
    const salidaMarcadaLocal = localStorage.getItem(`salida_${fecha}`);

    setEntradaMarcada(entradaMarcadaLocal === "true");
    setSalidaMarcada(salidaMarcadaLocal === "true");

    const existeSalidaMarcada = salidaMarcadaLocal === "true";
    setMostrarBotonCamara(!existeSalidaMarcada);

    const existeEntradaMarcada = entradaMarcadaLocal == "true";
    setSegundaFotoTomada(existeEntradaMarcada);

    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );

    const token = tokenD.toString(enc.Utf8);    

    // obtener fecha actual con el formato de acuerdo a la data que se obtiene del backend y poder filtrar correctamente
    const getCurrentDate = () => {
      const newDate = new Date();
      const options = {
        timezone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const date = newDate
        .toLocaleString("en-US", options)
        .split("/")
        .reverse();
      const currentDate = [date[0], date[2], date[1]].join("-");
      return currentDate
    }

    fetch(import.meta.env.VITE_API_URL + "/attendance/id", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let asistenciaDeHoy = data.results.filter((asistencia) =>
          asistencia.created_at.includes(getCurrentDate())
        );

        if (asistenciaDeHoy.length === 0 || asistenciaDeHoy[0]?.admissionTime === "00:00:00" || asistenciaDeHoy[0]?.admissionTime === null ) {
          setSegundaFotoTomada(false);
        }
        else {
          setEntradaMarcada(true)
          setSegundaFotoTomada(true);
        }
        
        //Validamos si ya se ha marcado la asistencia
        if(asistenciaDeHoy.length !== 0 && asistenciaDeHoy[0]?.departureTime != null) {          
          setAlreadyMarkedAttendance(true)          
        }
      })
      .catch((error) => {
        console.error("Error al obtener las asistencias:", error);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRegistroAsistencia = (tipo) => {
    setCargando(true);
    const fecha = new Date().toISOString().slice(0, 10);

    const formData = new FormData();
    const shift = localStorage.getItem("shift");
    const iduser = localStorage.getItem("iduser");
    const photoName = `${shift.charAt(0)}-${iduser}-${tipo === "admission" ? "e" : "s"
      }-${fecha}.jpg`;
    
    formData.append(`${tipo}Image`, fotoCapturada, photoName);

    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );

    const token = tokenD.toString(enc.Utf8);

    fetch(import.meta.env.VITE_API_URL + "/attendance/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if(!response.ok) throw new Error;
        const hora = horaActual.getHours();
        const minutos = horaActual.getMinutes();

        if (tipo === "admission") {          
          setMostrarBotonEntrada(false);
          setFotoUsuario(false);
          setFotoCapturada(null);
          setMostrarBotonCamara(true);
          setVideoEnabled(false);
          setEntradaMarcada(true)

          toast.success("Entrada Marcada");

          if (turno === "Mañana" && hora >= 8 && minutos > 10 && hora <= 13) {
            setTardanzaMañana(true);
          } else {
            setTardanzaMañana(false);
          }

          if (turno === "Tarde" && hora >= 14 && minutos > 10 && hora <= 19) {
            setTardanzaTarde(true);
          } else {
            setTardanzaTarde(false);
          }

          localStorage.setItem(`entrada_${fecha}`, "true");

        } else {                              
          setMostrarBotonSalida(false);
          setMostrarBotonCamara(false);
          setFotoUsuario(false);
          setFotoCapturada(null);
          setVideoEnabled(false);
          setCameraStream(null);
          setAlreadyMarkedAttendance(true)
          setSalidaMarcada(true)
          toast.success("Salida Marcada");
          localStorage.setItem(`salida_${fecha}`, "true");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  const verificarHorario = () => { };

  useEffect(() => {
    verificarHorario();
  }, [horaActual]);

  const reiniciarConteo = () => {
    setCapturing(false);
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStream(stream);
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
          toast.success('Cámara activa');
          return
        })
        .catch((error) => {
          console.error("Error al acceder a la cámara:", error);
          toast.error('No se puede acceder a la cámara. Por favor verifica los permisos.');
          if (cameraStream) {
            cameraStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
        });
    } else {
      console.error('La API de MediaDevices no está disponible en este navegador');
      toast.error('Este navegador no es compatible con la cámara.');
    }
  };

  const stopCamera = () => {
    if (cameraStream && videoRef.current) {
      cameraStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraStream(null);
    }
  };

  const toggleCamera = () => {
    if (videoEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
    setVideoEnabled(!videoEnabled);
    reiniciarConteo();
  };

  const videoRef = useRef(null);

  const handleCapture = () => {
    if (cameraStream) {
      setCapturing(true);
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      imageCapture
        .takePhoto()
        .then((blob) => {
          setFotoUsuario(URL.createObjectURL(blob));
          setCapturing(false);
          
          if (!segundaFotoTomada) {
            setMostrarBotonEntrada(true);
            setMostrarBotonCamara(false);
            setSegundaFotoTomada(true);
            setCargando(false);
          } else {
            setMostrarBotonSalida(true);
            setMostrarBotonCamara(false);
            setCargando(false);
          }

          stopCamera();
          setVideoEnabled(false);
          setFotoCapturada(blob);
        })
        .catch((error) => {
          console.error("Error taking photo:", error);
          setCapturing(false);
          setCargando(false);
        });
    }
  };

  useEffect(() => {
    if (videoEnabled) {
      startCamera();
      reiniciarConteo();
    }

    return () => {
      stopCamera();
    };
  }, [videoEnabled]);

  const [buttonClickedAdmission, setButtonClickedAdmission] = useState(false);

  const handleButtonClickAdmission = () => {
    setButtonClickedAdmission(true);
    handleRegistroAsistencia("admission");
  };

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    handleRegistroAsistencia("departure");
  };

  return (
    <>
      <Toaster />
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1 uppercase md:space-x-3">
          <li>
            <div className="flex items-center text-white ">
              <ChevronRightIcon />
              <span className="ml-1 text-base font-medium md:ml-2">
                Marcar asistencia
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <div className={`registro-Entrada min-h-[10vh] flex justify-center`}>
            {
              alreadyMarkedAttendance ? 
                <div className="w-full text-xl font-medium px-6 py-12 border-2 border-[#57f3ff] rounded-xl mt-14 grid place-items-center bg-[#16232b]">
                  <svg 
                      xmlns="http://www.w3.org/2000/svg"                        
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokewinecap="round" 
                      strokewinejoin="round" 
                      className="w-[100px]"
                  >
                      <circle cx="12" cy="12" r="10" stroke="#4CAF50" fill="#E8F5E9"></circle>
                      <path d="M9 12l2 2 4-4" stroke="#4CAF50"></path>
                  </svg>
                  <span className="mt-6">
                    ¡Ya has marcado tu asistencia!
                  </span>
                </div>
                :
              
                (entradaMarcada && turno === 'Mañana' && horaActual.getHours() < 13) || 
                (entradaMarcada && turno === 'Tarde' && horaActual.getHours() < 19) ?
                  <div className="text-xl font-medium p-6 border-2 border-[#57f3ff] rounded-xl mt-14 grid place-items-center h-96 bg-[#16232b]">La camara se activara cuando sea la hora de salida</div>
                  :
                  <CameraSection
                    fotoUsuario={fotoUsuario}
                    videoEnabled={videoEnabled}
                    capturing={capturing}
                    handleCapture={handleCapture}
                    toggleCamera={toggleCamera}
                    videoRef={videoRef}
                    mostrarBotonCamara={mostrarBotonCamara}
                    cameraStream={cameraStream}
                  />              
            }
          </div>
        </div>
        <div
          className={`w-full  md:w-1/3 ${fotoCapturada ? "lg:mt-9" : ""} ${!fotoUsuario && !videoEnabled ? "mt-10 lg:mt-9" : "mt-7 lg:mt-20"
            }`}
        >
          <AttendanceSection
            horaActual={horaActual}
            mostrarBotonEntrada={mostrarBotonEntrada}
            mostrarBotonSalida={mostrarBotonSalida}
            entradaMarcada={entradaMarcada}
            salidaMarcada={salidaMarcada}
            tardanzaMañana={tardanzaMañana}
            tardanzaTarde={tardanzaTarde}
            buttonClicked={buttonClicked}
            buttonClickedAdmission={buttonClickedAdmission}
            handleButtonClick={handleButtonClick}
            handleButtonClickAdmission={handleButtonClickAdmission}
            cargando={cargando}
          />
        </div>
      </div>
    </>
  );
};
