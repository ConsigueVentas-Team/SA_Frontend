import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { RelojAnalogico } from './RelojAnalogico';

export const AttendanceSection = ({
    horaActual,
    mostrarBotonEntrada,
    mostrarBotonSalida,
    entradaMarcada,
    salidaMarcada,
    tardanzaMañana,
    tardanzaTarde,
    buttonClicked,
    buttonClickedAdmission,
    handleButtonClick,
    handleButtonClickAdmission
}) => {
    return (
        <div className="seccion-derecha bg-cv-primary flex flex-col items-center justify-start m-4 mb-96 rounded-xl">
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
                        onClick={handleButtonClickAdmission}
                        disabled={
                            (localStorage.getItem('shift') === 'Mañana' && (
                                (horaActual.getHours() < 8) || (horaActual.getHours() >= 13)
                            )) ||
                            (localStorage.getItem('shift') === 'Tarde' && (
                                (horaActual.getHours() < 14) || (horaActual.getHours() >= 19 && horaActual.getMinutes() > 0)
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
                        onClick={handleButtonClick}
                        disabled={
                            (localStorage.getItem('shift') === 'Mañana' && (
                                (horaActual.getHours() < 8) || (horaActual.getHours() >= 13)
                            )) ||
                            (localStorage.getItem('shift') === 'Tarde' && (
                                (horaActual.getHours() < 14) || (horaActual.getHours() >= 19 && horaActual.getMinutes() > 0)
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