import React, { useRef, useState } from 'react';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

export const CameraSection = ({ videoEnabled, toggleCamera, handleCapture, mostrarBotonCamara }) => {

    const [fotoUsuario, setFotoUsuario] = useState(null); // Agregar esta línea
    const [capturing, setCapturing] = useState(false); // Agregar esta línea
    const videoRef = useRef(null); // Agregar esta línea

    return (
        <div className={`seccion-izquierda w-full ${isMobile ? 'mb-4' : ''}`}>
            <div className={`w-full rounded-xl bg-slate-950 relative ${isMobile ? 'h-96' : 'h-4/6'}`}>
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
    videoEnabled: PropTypes.bool.isRequired,
    toggleCamera: PropTypes.func.isRequired,
    handleCapture: PropTypes.func.isRequired,
    mostrarBotonCamara: PropTypes.bool.isRequired,
    videoRef: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
};