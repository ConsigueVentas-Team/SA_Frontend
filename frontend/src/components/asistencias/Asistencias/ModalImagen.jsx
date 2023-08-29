export const ModalImagen = ({ imageUrl, closeImageModal }) => {
    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2"
            >
                <div className="relative w-full my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

                        <div className="flex items-center justify-center p-2.5 md:p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl md:text-3xl font-semibold">
                                Fotografías de asistencia
                            </h3>
                        </div>
                        {imageUrl && (
                            <div>
                                <div className='text-center text-cv-primary uppercase'>
                                    {imageUrl.attendance === 1 && (
                                        <p className='space-x-2 text-lg font-bold bg-[#24FF00] p-2'>
                                            <span>{imageUrl.user.name.split(" ")[0] + ' ' + imageUrl.user.surname.split(" ")[0]}</span>
                                            <span>Asistió</span>
                                        </p>
                                    )}
                                    {imageUrl.delay === 1 && imageUrl.justification === 1 ? (
                                        <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                                            <span>{imageUrl.user.name.split(" ")[0] + ' ' + imageUrl.user.surname.split(" ")[0]}</span>
                                            <span>Justifico por Tardanza</span>
                                        </p>
                                    ) : imageUrl.delay === 1 && (
                                        <p className='space-x-2 text-lg font-bold bg-[#FAFF00] p-2'>
                                            <span>{imageUrl.user.name.split(" ")[0] + ' ' + imageUrl.user.surname.split(" ")[0]}</span>
                                            <span>Ingreso Tarde</span>
                                        </p>
                                    )}
                                    {imageUrl.absence === 1 && imageUrl.justification === 1 ? (
                                        <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                                            <span>{imageUrl.user.name.split(" ")[0] + ' ' + imageUrl.user.surname.split(" ")[0]}</span>
                                            <span>Justifico por Falta</span>
                                        </p>
                                    ) : imageUrl.absence === 1 && (
                                        <p className='space-x-2 text-lg font-bold text-white bg-[#FF0000] p-2'>
                                            <span>{imageUrl.user.name.split(" ")[0] + ' ' + imageUrl.user.surname.split(" ")[0]}</span>
                                            <span>Falto</span>
                                        </p>
                                    )}
                                </div>
                                <div className="relative p-3 md:p-6 flex-auto">
                                    <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-x-2 md:space-y-0'>
                                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                                            <h4 className='font-semibold text-lg'>Fotografía de Entrada</h4>
                                            {imageUrl.admission_image ? (
                                                <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.admission_image} alt="Fotografía de entrada" />
                                            ) : (
                                                <div className='rounded-lg w-4/5 md:w-full border'>
                                                    <DefaultImage />
                                                </div>
                                            )}
                                            {/* <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.admission_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.admission_image : defaultImage} alt="Fotografía de entrada" /> */}
                                            {(imageUrl.attendance === 1 || imageUrl.delay === 1) && (
                                                <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                                    <span>Hora de Entrada:</span>
                                                    <span>{imageUrl.admission_time ? imageUrl.admission_time : 'No registrada'}</span>
                                                </p>
                                            )}
                                        </div>
                                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                                            <h4 className='font-semibold text-lg'>Fotografía de Salida</h4>
                                            {imageUrl.departure_image ? (
                                                <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.departure_image} alt="Fotografía de salida" />
                                            ) : (
                                                <div className='rounded-lg w-4/5 md:w-full border'>
                                                    <DefaultImage />
                                                </div>
                                            )}
                                            {/* <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.departure_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.departure_image : defaultImage} alt="Fotografía de salida" /> */}
                                            {(imageUrl.attendance === 1 || imageUrl.delay === 1) && (
                                                <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                                    <span>Hora de Salida:</span>
                                                    <span>{imageUrl.departure_time ? imageUrl.departure_time : 'No registrada'}</span>
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