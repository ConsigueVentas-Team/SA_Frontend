import { useEffect, useState } from 'react';
import moment from 'moment';
import { AES, enc } from 'crypto-js';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Filtros, Leyenda, ModalImagen } from '../../../components/asistencias/Asistencias';
import TablaAsistencias from '../../../components/asistencias/Asistencias/TablaAsistencias';

export const Asistencias = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isInputReady, setIsInputReady] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [filterDate, setFilterDate] = useState(selectedDate || '');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterShift, setFilterShift] = useState('');

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    obtenerAsistencia();
  }, []);

  useEffect(() => {
    setFilterDate(selectedDate || '');
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
    setSelectedDate(event.target.value);
  };

  const formatSelectedDate = (dateValue) => {
    if (!dateValue) return '';

    const date = moment(dateValue, 'YYYY-MM-DD').toDate();
    const formattedDate = moment(date).locale('es').format('LL');
    return formattedDate;
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const clearFilterEmployee = () => {
    setFilterEmployee('');
  };

  const clearFilterDepartment = () => {
    setFilterDepartment('');
  };

  const clearFilterArea = () => {
    setFilterArea('');
  };

  const clearFilterShift = () => {
    setFilterShift('');
  };

  const obtenerAsistencia = async () => {
    try {
      const tokenD = AES.decrypt(
        localStorage.getItem('token'),
        import.meta.env.VITE_TOKEN_KEY
      );
      const token = tokenD.toString(enc.Utf8);
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/attendance`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAttendance(data.attendance);
      } else {
        console.error('Error al obtener las asistencias1:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener las asistencias2:', error);
    }
  };

  return (
    <div className='h-full bg-cv-secondary'>
      <div className="space-y-3">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-full flex flex-col md:flex-row justify-between gap-3">
            <Leyenda />
            <div className="w-full md:w-4/6 space-y-3">
              <div className="w-full bg-cv-primary rounded-lg">

                <div className="w-full flex items-center justify-between p-2 space-x-3">
                  <h2 className="text-white text-center text-xl uppercase font-semibold">Fecha:</h2>
                  <div className="w-full flex items-center justify-between relative">
                    <input type="date" defaultValue={selectedDate}
                      onChange={handleDateChange} className='date w-full p-1 outline-none font-semibold text-cv-primary bg-cv-primary rounded-lg' />
                    <p className="text-white bg-cv-primary text-center text-xl uppercase font-semibold absolute">{formatSelectedDate(selectedDate)}</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between items-center mb-3 ">
                <div className='flex justify-center w-full mt-20 mb-24'>
                <Link to="/marcar-asistencia" className='w-full md:w-1/3 text-center bg-cv-cyan rounded-lg py-3 px-6 text-cv-primary font-bold uppercase whitespace-nowrap'>Marcar Asistencia</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
            <div className="relative w-full">
              {/* Filtro de empleado */}
              <input
                type="text"
                id=""
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                onFocus={() => setIsInputReady(true)}
                placeholder="Ingresa nombres y/o apellidos del colaborador"
                className="block w-full p-3 pr-10 text-sm border border-gray-300 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
              />
              <button onClick={clearFilterEmployee} className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Filtros adicionales */}
          <Filtros
            filterDepartment={filterDepartment}
            setFilterDepartment={setFilterDepartment}
            filterArea={filterArea}
            setFilterArea={setFilterArea}
            filterShift={filterShift}
            setFilterShift={setFilterShift}
          />
        </div>

        {/* Tabla de asistencias */}
        <TablaAsistencias data={attendance} openImageModal={openImageModal} setImageUrl={setImageUrl} filterDate={filterDate} filterEmployee={filterEmployee} filterDepartment={filterDepartment} filterArea={filterArea} filterShift={filterShift} />

        {/* Modal de imagen */}
        {showImageModal && (
          <ModalImagen imageUrl={imageUrl} closeImageModal={closeImageModal} />
        )}
      </div>
    </div>
  );
};

export const DefaultImage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="350"
      height="263"
      viewBox="0 0 350 263"
    >
      <g>
        <path fill="#FFF" d="M0 0H350V263H0z"></path>
        <path
          fill="gray"
          d="M94.23 251.262c-9.777-1.176-17.64-7.864-20.808-17.7-1.07-3.316-1.184-4.703-1.11-13.476.094-11.656.922-16.395 3.922-22.465 1.5-3.039 3.063-5.176 5.536-7.578 6.765-6.578 12.109-9.555 32.851-18.297 7.379-3.105 18.05-7.89 23.715-10.625 11.496-5.55 12.437-6.34 13.824-11.582 1.442-5.457 1.434-5.476-4.715-11.492-8.742-8.55-14.363-18.297-17.511-30.36-.407-1.55-.938-2.32-1.774-2.57-3.504-1.047-7.433-5.793-9.058-10.933-1.227-3.875-1.293-9.914-.145-13.23.945-2.731 4.39-6.196 6.164-6.196 1.02 0 1.07-.188.668-2.508-.727-4.195-.375-17.41.61-22.86 1.015-5.632 2.863-11.445 4.882-15.37 5.555-10.797 28.781-22.754 44.207-22.754 15.91 0 38.535 12.078 44.528 23.77 3.87 7.55 5.722 18.554 5.273 31.331-.277 7.844-.234 8.371.711 8.668 1.535.48 4.547 4.223 5.246 6.52.992 3.261.766 9.195-.488 12.863-1.805 5.277-5.465 9.66-8.938 10.7-.84.25-1.367 1.015-1.765 2.57-.989 3.863-3.282 10.03-4.95 13.312-3.972 7.813-11.43 17.188-16.234 20.41-1.547 1.035-1.875 1.586-1.879 3.13-.004 2.937 1.524 7.956 3 9.87 1.617 2.086 17.074 9.727 33.485 16.55 21.386 8.9 28.308 12.696 34.777 19.09 2.36 2.333 4.027 4.634 5.488 7.579 3.028 6.098 3.899 11.156 3.957 22.988.043 9.266-.027 9.969-1.347 13.528-3.688 9.94-10.653 15.742-20.508 17.082-4.805.652-156.211.687-161.614.035zm0 0"
        ></path>
      </g>
    </svg>
  )
}