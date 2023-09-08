import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';

export const CameraSection = ({
    fotoUsuario,
    videoEnabled,
    capturing,
    handleCapture,
    toggleCamera,
    cameraStream,
    videoRef,
    isMobile,
    mostrarBotonCamara
}) => {
    return (
        <div className={`seccion-izquierda w-full mb-4 p-4 sm:p-6 lg:p-8`}>
            <div className={`w-full h-[66.001%] rounded-xl ${!fotoUsuario && !videoEnabled ? 'bg-slate-950' : ''} relative `}>
                <div className="absolute top-0 left-0 w-full h-full">
                    {fotoUsuario && (
                        <div>
                            <img src={fotoUsuario} alt="Foto capturada" className="rounded-xl object-contain" style={{ transform: "scaleX(-1)" }} />
                        </div>
                    )}
                    {!fotoUsuario && (
                        (videoEnabled ? (
                            <div className=''>
                                <video
                                    className="rounded-xl object-contain"
                                    ref={videoRef}
                                    style={{ display: videoEnabled ? 'block' : 'none' }}
                                    autoPlay
                                    playsInline
                                    muted
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-white text-xl">Cámara desactivada</span>
                            </div>
                        ))
                    )}
                </div>
                <div className={`absolute bottom-0 sm:p-6 lg:p-8 w-full flex items-center justify-center ${!fotoUsuario && !videoEnabled ? '' : '-mb-20'}`}>
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
                                <VideocamIcon style={{ color: "#FFFFFF" }} />
                            ) : (
                                <VideocamOffIcon style={{ color: "#FFFFFF" }} />
                            )}
                        </button>
                    )}
                </div>
            </div>
            <div className='grid justify-items-center p-4 sm:p-6 lg:p-8'>
                {videoEnabled && (
                    <button
                        className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
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