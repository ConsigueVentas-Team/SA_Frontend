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

    fetch(import.meta.env.VITE_API_URL + "/attendance/id", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.attendance.admission_time == "00:00:00") {
          setSegundaFotoTomada(false);
        } else {
          setSegundaFotoTomada(true);
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
    formData.append(`${tipo}_image`, fotoCapturada, photoName);

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
      .then((response) => response.json())
      .then((data) => {
        if (tipo === "admission") {
          const hora = horaActual.getHours();
          const minutos = horaActual.getMinutes();
          const turno = localStorage.getItem("shift");
          setMostrarBotonEntrada(false);
          setFotoUsuario(false);
          setFotoCapturada(null);
          setMostrarBotonCamara(true);
          setVideoEnabled(false);

          toast.success("Entrada Marcada");

          if (turno === "Mañana" && hora >= 8 && minutos >= 10 && hora <= 13) {
            setTardanzaMañana(true);
          } else {
            setTardanzaMañana(false);
          }

          if (turno === "Tarde" && hora >= 14 && minutos >= 10 && hora <= 19) {
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

  // const startCamera = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((stream) => {
  //       setCameraStream(stream);
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.style.transform = "scaleX(-1)";
  //     })
  //     .catch((error) => {
  //       console.log("Error accessing camera:", error);
  //     });
  // };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStream(stream);
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
          toast.success('Cámara activa');
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
          console.log("Error taking photo:", error);
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
            <div className="flex items-center text-gray-500 ">
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
