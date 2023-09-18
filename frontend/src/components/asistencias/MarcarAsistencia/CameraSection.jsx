import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import PropTypes from 'prop-types';
import Loading from '../../essentials/Loading';

export const CameraSection = ({
    fotoUsuario,
    videoEnabled,
    capturing,
    handleCapture,
    toggleCamera,
    videoRef,
    mostrarBotonCamara,
    cameraStream
}) => {
    return (
        <div className={`seccion-izquierda w-full mb-4 p-4 sm:p-6 lg:p-8`}>
            <div className={`w-full rounded-xl ${!fotoUsuario && !videoEnabled ? 'bg-slate-950 border-cv-cyan border-2 h-[60vh] mt-5' : ' mt-5'} relative `}>
                <div className=" w-full h-full rounded-xl flex justify-center">
                    {fotoUsuario && (
                        <div>
                            <img src={fotoUsuario} alt="Foto capturada" className="rounded-xl object-contain border-2 border-cv-cyan" style={{ transform: "scaleX(-1)" }} />
                        </div>
                    )}
                    {!fotoUsuario && (
                        (videoEnabled ? (
                            <div className=''>
                                <div>
                                    {cameraStream == null ? (
                                        <Loading />
                                    ) : (
                                        <video
                                            className="rounded-xl h-full object-contain border-2 z-10 border-cv-cyan"
                                            ref={videoRef}
                                            style={{ display: videoEnabled ? 'block' : 'none' }}
                                            autoPlay
                                            playsInline
                                            muted
                                        />
                                    )}
                                    {mostrarBotonCamara && videoEnabled && cameraStream != null && (
                                        <div className='flex items-center  justify-center -mt-14 z-20 relative'>
                                            <button
                                                className='w-12 h-12 max-[460px]:w-8 max-[460px]:h-8'
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "50%",
                                                    background: videoEnabled ? "transparent" : "#EF4444",
                                                    color: "#fff",
                                                    border: videoEnabled ? "2px solid #FFFFFF" : "2px solid #EF4444",
                                                }}
                                                onClick={toggleCamera}
                                            >
                                                <div className='text-xs'>
                                                    <VideocamIcon
                                                        className='text-gray-300 text-xs w-1 h-1' />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {videoEnabled && cameraStream != null &&(
                                    <div className='flex justify-center'>
                                        <button
                                            className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-10"
                                            onClick={handleCapture}
                                            disabled={capturing}
                                        >
                                            {capturing ? `Capturando` : 'Tomar foto'}
                                        </button>
                                    </div>
                                )}
                            </div>

                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-white text-xl">Cámara desactivada</span>
                                <div className={`absolute bottom-0 mb-5 sm:p-6 lg:p-8 w-full flex items-center justify-center`}>
                                    {mostrarBotonCamara && !videoEnabled && (
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
                                            onClick={toggleCamera}>
                                            <VideocamOffIcon style={{ color: "#FFFFFF" }} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

CameraSection.propTypes = {
    fotoUsuario: PropTypes.bool.isRequired,
    videoEnabled: PropTypes.bool.isRequired,
    capturing: PropTypes.bool.isRequired,
    handleCapture: PropTypes.func.isRequired,
    toggleCamera: PropTypes.func.isRequired,
    videoRef: PropTypes.object.isRequired,
    mostrarBotonCamara: PropTypes.bool.isRequired,
    cameraStream: PropTypes.func.isRequired
};