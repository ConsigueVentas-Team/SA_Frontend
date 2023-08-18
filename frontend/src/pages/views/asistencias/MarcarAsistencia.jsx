import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from "@mui/material";
import PropTypes from 'prop-types';
import { AES, enc } from 'crypto-js';
import { RelojAnalogico } from '../../../components/asistencias/MarcarAsistencia/RelojAnalogico';

export const MarcarAsistencia = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(false);
  const [mostrarBotonSalida, setMostrarBotonSalida] = useState(false);
  const [entradaMarcada, setEntradaMarcada] = useState(false);
  const [salidaMarcada, setSalidaMarcada] = useState(false);
  const [tardanzaMañana, setTardanzaMañana] = useState(false);
  const [tardanzaTarde, setTardanzaTarde] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [segundaFotoTomada, setSegundaFotoTomada] = useState(false);
  const [mostrarBotonCamara, setMostrarBotonCamara] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [buttonClickedAdmission, setButtonClickedAdmission] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    const fecha = new Date().toISOString().slice(0, 10);
    const entradaMarcadaLocal = localStorage.getItem(`entrada_${fecha}`);
    const salidaMarcadaLocal = localStorage.getItem(`salida_${fecha}`);
    setEntradaMarcada(entradaMarcadaLocal === 'true');
    setSalidaMarcada(salidaMarcadaLocal === 'true');

    const existeSalidaMarcada = salidaMarcadaLocal === 'true';
    setMostrarBotonCamara(!existeSalidaMarcada);

    const existeEntradaMarcada = entradaMarcadaLocal == 'true';
    setSegundaFotoTomada(existeEntradaMarcada);

    // Decrypt token
    const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY);
    const token = tokenD.toString(enc.Utf8);

    fetch('http://127.0.0.1:8000/api/attendance/id', {
      headers: {
        Authorization: `Bearer 32|Ibf6bdZf7H7zQ6NjHtAx9HQgKSOgSNiYcbkwC9E8`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const asistenciasHoy = data.attendance.filter((asistencia) => asistencia.date === fecha);
        if (asistenciasHoy.length === 0) {
          setSegundaFotoTomada(false);
        } else {
          setSegundaFotoTomada(true);
        }
      })
      .catch((error) => {
        console.error('Error al obtener las asistencias:', error);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const marcarAsistencia = (tipo) => {
    const fecha = new Date().toISOString().slice(0, 10);
    const formData = new FormData();
    formData.append('date', fecha);
    formData.append(`${tipo}_time`, horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    const shift = localStorage.getItem('shift');
    const iduser = localStorage.getItem('iduser');
    const photoName = `${shift.charAt(0)}-${iduser}-${tipo === 'admission' ? 'e' : 's'}-${fecha}.jpg`;
    formData.append(`${tipo}_image`, fotoCapturada, photoName);

    // Decrypt token
    const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY);
    const token = tokenD.toString(enc.Utf8);

    fetch(import.meta.env.VITE_API_URL + '/attendance/insert', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (tipo === 'admission') {
          const hora = horaActual.getHours();
          const minutos = horaActual.getMinutes();
          const turno = localStorage.getItem('shift');
          setMostrarBotonEntrada(false);
          setFotoUsuario(null);
          setFotoCapturada(null);
          setMostrarBotonCamara(true);
          setVideoEnabled(false);

          if (
            (turno === 'Mañana' && (hora >= 8 && minutos >= 10) && (hora <= 13))
          ) {
            setTardanzaMañana(true);
          } else {
            setTardanzaMañana(false);
          }

          if (
            (turno === 'Tarde' && (hora >= 14 && minutos >= 10) && (hora <= 19))
          ) {
            setTardanzaTarde(true);
          } else {
            setTardanzaTarde(false);
          }

          localStorage.setItem(`entrada_${fecha}`, 'true');

          // toast.success('Entrada marcada exitosamente');
        } else {
          setMostrarBotonSalida(false);
          setMostrarBotonCamara(false);
          setFotoUsuario(null);
          setFotoCapturada(null);
          setVideoEnabled(false);
          setCameraStream(null);

          localStorage.setItem(`salida_${fecha}`, 'true');

          // toast.success('Salida marcada correctamente');
        }
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
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
          } else {
            setMostrarBotonSalida(true);
            setMostrarBotonCamara(false);
          }

          stopCamera();
          setVideoEnabled(false);
          setFotoCapturada(blob);
        })
        .catch((error) => {
          console.log('Error taking photo:', error);
          setCapturing(false);
        });
    }
  };

  const videoRef = useRef(null); // Declaración de videoRef una vez

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraStream(stream);
        if (videoRef.current) { // Verifica si videoRef.current es null o no
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
        }
      })
      .catch((error) => {
        console.log('Error accessing camera:', error);
      });
  };

  const stopCamera = () => {
    if (cameraStream && videoRef.current) {
      cameraStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraStream(null);
    }
  };

  const reiniciarConteo = () => {
    setCapturing(false);
  };

  const CameraSection = ({ videoEnabled, toggleCamera, handleCapture }) => {
    return (
      <div className={`seccion-izquierda w-full`}>
        <div className={`w-full rounded-xl bg-slate-950 relative h-96`}>
          <div className="absolute top-0 left-0 w-full h-full">
            {fotoUsuario && (
              <img src={fotoUsuario} alt="Foto capturada" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
            )}
            {!fotoUsuario && (
              (videoEnabled ? (
                <video
                  className="w-full h-full object-cover"
                  ref={videoRef}
                  style={{ display: videoEnabled ? 'block' : 'none' }}
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-xl">Cámara desactivada</span>
                </div>
              )))
            }
          </div>
          <div className="absolute bottom-0 mb-4 w-full flex items-center justify-center">
            {mostrarBotonCamara && (
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: videoEnabled ? "transparent" : "#EF4444",
                  color: "#fff",
                  width: "3rem",
                  height: "3rem",
                  border: videoEnabled ? "2px solid #FFFFFF" : "2px solid #EF4444",
                }}
                onClick={toggleCamera}
              >
                {videoEnabled ? (
                  "si"
                  // <BsFillCameraVideoFill style={{ color: "#FFFFFF" }} />
                ) : (
                  "no"
                  // <BsFillCameraVideoOffFill style={{ color: "#FFFFFF" }} />
                )}
              </button>
            )}
          </div>
        </div>
        <div className='grid justify-items-center'>
          {videoEnabled && (
            <button
              className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4"
              onClick={handleCapture}
              disabled={capturing}
            >
              {capturing ? `Capturando` : 'Tomar foto'}
            </button>
          )}
        </div>
      </div>
    );
  };

  CameraSection.propTypes = {
    videoEnabled: PropTypes.bool.isRequired, // Define la validación de tipos
    toggleCamera: PropTypes.func.isRequired,
    handleCapture: PropTypes.func.isRequired,
  };

  const TimeSection = ({ horaActual, mostrarBotonEntrada }) => {
    return (
      <div className="seccion-derecha bg-cv-primary flex flex-col items-center justify-start m-4 -mt-1 rounded-xl">
        <div className='mr-6 mt-5 ml-6'>
          <RelojAnalogico hora={horaActual} />
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white">
          {horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        <div className='text-center mb-10'>
          {mostrarBotonEntrada && (
            <button
              className="bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                setButtonClickedAdmission(true);
                marcarAsistencia('admission');
              }}
              disabled={
                (localStorage.getItem('shift') === 'Mañana' && (
                  (horaActual.getHours() < 8) || (horaActual.getHours() >= 13)
                )) ||
                (localStorage.getItem('shift') === 'Tarde' && (
                  (horaActual.getHours() < 14) ||(horaActual.getHours() >= 19 && horaActual.getMinutes() > 0)
                )) ||
                buttonClickedAdmission
              }
            >
              Marcar entrada
            </button>
          )}
          {entradaMarcada && <p className="text-green-500 font-bold mt-4">Entrada marcada</p>}
          {mostrarBotonSalida && (
            <button
              className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                setButtonClicked(true);
                marcarAsistencia('departure');
              }}
              disabled={
                (localStorage.getItem('shift') === 'Mañana' && (
                  (horaActual.getHours() < 8) || (horaActual.getHours() >= 13)
                )) ||
                (localStorage.getItem('shift') === 'Tarde' && (
                  (horaActual.getHours() < 14) ||(horaActual.getHours() >= 19 && horaActual.getMinutes() > 0)
                )) ||
                buttonClicked
              }
            >
              Marcar salida
            </button>
          )}
          {buttonClicked && <p className='text-blue-500 font-semibold mt-4'>¡Ya has marcado asistencia!</p>}
          {salidaMarcada && <p className="text-green-500 font-bold mt-4">Salida marcada</p>}
          {tardanzaMañana && (
            <p className="text-red-500 font-bold mt-4">Tardanza (marcado después de las 8:10)</p>
          )}
          {tardanzaTarde && (
            <p className="text-red-500 font-bold mt-4">Tardanza (marcado después de las 14:10)</p>
          )}
        </div>
      </div>
    );
  };

  TimeSection.propTypes = {
  horaActual: PropTypes.instanceOf(Date).isRequired, // Cambia esto si 'horaActual' tiene otro tipo
  mostrarBotonEntrada: PropTypes.bool.isRequired,
};

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
      <CameraSection videoEnabled={videoEnabled} toggleCamera={toggleCamera} handleCapture={handleCapture} />
      </div>
      <div className="w-1/2 pl-4">
      <TimeSection horaActual={horaActual} mostrarBotonEntrada={mostrarBotonEntrada} />
      </div>
      {/* <Toaster /> */}
    </div>
  );
};
