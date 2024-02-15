import { DefaultImage } from "./DefaultImage";
import PropTypes from 'prop-types';

export const ModalImagen = ({ image, closeImageModal }) => {
    return (
        <div>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-2 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            >
                <div className="relative w-full max-w-3xl p-1 mx-auto my-6 rounded-lg ">

                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">

                        <div className="flex items-center justify-center p-2.5 md:p-5 border-b border-solid border-slate-200 rounded-t text-black">
                            <h3 className="text-xl font-semibold md:text-3xl">
                                Fotografías de asistencia
                            </h3>
                        </div>
                        {image && (
                            <div>
                                <div className='text-center uppercase text-cv-primary'>
                                    {image.attendance === 1 && (
                                        <p className='space-x-2 text-lg font-bold bg-[#24FF00] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Asistió</span>
                                        </p>
                                    )}
                                    {image.delay === 1 && image.justification === 1 ? (
                                        <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Justifico por Tardanza</span>
                                        </p>
                                    ) : image.delay === 1 && (
                                        <p className='space-x-2 text-lg font-bold bg-[#FAFF00] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Ingreso Tarde</span>
                                        </p>
                                    )}
                                    {image.delay === 0 && image.attendance === 0 && image.justification === 1 ? (
                                        <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Justifico por Falta</span>
                                        </p>
                                    ) : image.delay === 0 && image.attendance === 0 && image.justification === 0 && (
                                        <p className='space-x-2 text-lg font-bold text-white bg-[#FF0000] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Falto</span>
                                        </p>
                                    )}
                                </div>
                                <div className="relative flex-auto p-3 md:p-6">
                                    <div className='flex flex-col items-center justify-between space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
                                        <div className='flex flex-col items-center justify-center w-full space-y-2 text-center'>
                                            <h4 className='text-lg font-semibold'>Fotografía de Entrada</h4>
                                            {image.admission_image ? (
                                                <div className="w-auto h-64">
                                                    <img className='w-auto h-full border rounded-lg md:w-full' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + image.admission_image} alt="Fotografía de entrada" />
                                                </div>
                                            ) : (
                                                <div className='w-4/5 h-64 flex items-center justify-center border rounded-lg md:w-full'>
                                                    <DefaultImage />
                                                </div>
                                            )}
                                            {(image.attendance === 1 || image.delay === 1) && (
                                                <p className='space-x-3 text-lg font-semibold text-cv-primary'>
                                                    <span>Hora de Entrada:</span>
                                                    <span>{image.admission_time ? image.admission_time : 'No registrada'}</span>
                                                </p>
                                            )}
                                        </div>
                                        <div className='flex flex-col items-center justify-center w-full space-y-2 text-center'>
                                            <h4 className='text-lg font-semibold'>Fotografía de Salida</h4>
                                            {image.departure_image ? (
                                                <div className="w-auto h-64">
                                                <img className='w-auto h-64 border rounded-lg md:w-full' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + image.departure_image} alt="Fotografía de salida" />
                                                </div>
                                            ) : (
                                                <div className='w-4/5 flex items-center justify-center h-auto border rounded-lg md:w-full'>
                                                    <DefaultImage />
                                                </div>
                                            )}
                                            {(image.attendance === 1 || image.delay === 1) && (
                                                <p className='space-x-3 text-lg font-semibold text-cv-primary'>
                                                    <span>Hora de Salida:</span>
                                                    <span>{image.departure_time ? image.departure_time : 'No registrada'}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-end p-3 border-t border-solid rounded-b border-slate-200">
                            <button
                                className="flex items-center justify-center px-4 py-2 text-xl text-white uppercase duration-300 ease-in-out rounded-md bg-cv-primary active:scale-95"
                                type="button"
                                onClick={closeImageModal}
                            >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
    );
};

ModalImagen.propTypes = {
    image: PropTypes.array.isRequired,
    closeImageModal: PropTypes.func.isRequired
};