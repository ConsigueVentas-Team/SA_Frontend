import { DefaultImage } from "./DefaultImage";
import PropTypes from 'prop-types';

export const ModalImagen = ({ image, closeImageModal }) => {
    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2"
            >
                <div className="relative w-full my-6 mx-auto max-w-3xl p-1 rounded-lg ">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        <div className="flex items-center justify-center p-2.5 md:p-5 border-b border-solid border-slate-200 rounded-t text-black">
                            <h3 className="text-xl md:text-3xl font-semibold">
                                Fotografías de asistencia
                            </h3>
                        </div>
                        {image && (
                            <div>
                                <div className='text-center text-cv-primary uppercase'>
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
                                    ) : image.delay === 0 && image.attendance === 0 && image.justification === 0 (
                                        <p className='space-x-2 text-lg font-bold text-white bg-[#FF0000] p-2'>
                                            <span>{image.user.name.split(" ")[0] + ' ' + image.user.surname.split(" ")[0]}</span>
                                            <span>Falto</span>
                                        </p>
                                    )}
                                </div>
                                <div className="relative p-3 md:p-6 flex-auto">
                                    <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-x-2 md:space-y-0'>
                                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                                            <h4 className='font-semibold text-lg'>Fotografía de Entrada</h4>
                                            {image.admission_image ? (
                                                <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + image.admission_image} alt="Fotografía de entrada" />
                                            ) : (
                                                <div className='rounded-lg w-4/5 md:w-full border'>
                                                    <DefaultImage />
                                                </div>
                                            )}
                                            {(image.attendance === 1 || image.delay === 1) && (
                                                <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                                    <span>Hora de Entrada:</span>
                                                    <span>{image.admission_time ? image.admission_time : 'No registrada'}</span>
                                                </p>
                                            )}
                                        </div>
                                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                                            <h4 className='font-semibold text-lg'>Fotografía de Salida</h4>
                                            {image.departure_image ? (
                                                <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + image.departure_image} alt="Fotografía de salida" />
                                            ) : (
                                                <div className='rounded-lg w-4/5 md:w-full border'>
                                                    <DefaultImage/>
                                                </div>
                                            )}
                                            {(image.attendance === 1 || image.delay === 1) && (
                                                <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                                    <span>Hora de Salida:</span>
                                                    <span>{image.departure_time ? image.departure_time : 'No registrada'}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
                                type="button"
                                onClick={closeImageModal}
                            >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
};

ModalImagen.propTypes = {
	image: PropTypes.array.isRequired,
    closeImageModal: PropTypes.func.isRequired
};