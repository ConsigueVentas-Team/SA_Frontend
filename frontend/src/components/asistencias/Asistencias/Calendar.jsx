import PropTypes from 'prop-types';
import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ButtonNavigation } from './Elements';


export const Calendar = ({ setSelectedMonth, onDayClick, selectedDay }) => {

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const prevMonth = () => {
        const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        setCurrentMonth(prevMonthDate);
        setSelectedMonth(prevMonthDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase());
    };


    const nextMonth = () => {
        const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonthDate);
        setSelectedMonth(nextMonthDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase());
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        setSelectedMonth(today.toLocaleString('es-ES', { month: 'long' }).toUpperCase());
    };

    function monthName(date) {
        const opciones = { month: 'long', year: 'numeric' };
        const fechaFormateada = date.toLocaleString('es-ES', opciones).toLocaleUpperCase('es-ES');
        return fechaFormateada;
    }

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
        return daysOfWeek.map((day, index) => (
            <li key={index}>
                {day}
            </li>
        ));
    };

    const renderDays = () => {
        const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        const startDate = new Date(startOfMonth);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const endDate = new Date(endOfMonth);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        const calendarDays = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            calendarDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return calendarDays.map((date) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday =
                date.getFullYear() === new Date().getFullYear() &&
                date.getMonth() === new Date().getMonth() &&
                date.getDate() === new Date().getDate();

            const dayNumber = date.getDate().toString().padStart(2, '0');

            const dayClassName = `${isToday
                ? 'bg-cv-cyan text-cv-primary hover:bg-cv-cyan-hover cursor-pointer'
                : isCurrentMonth
                    ? ''
                    : 'text-gray-600'
                }`;

            const selectedClassName = date.toISOString().split('T')[0] === selectedDay
                ? 'bg-white text-cv-primary'
                : '';



            return (
                <div
                    key={date.toDateString()}
                    className={`${dayClassName} ${selectedClassName} cursor-pointer hover:bg-cv-secondary w-7 h-7 flex items-center justify-center p-1 rounded-full font-semibold }`}
                    onClick={() => onDayClick(date)}
                >
                    {dayNumber}
                </div>

            );
        });
    };

    return (
        <div className="w-full overflow-hidden text-white bg-cv-primary rounded-xl">
            <div className="p-1 space-y-4">
                <header className="flex justify-between p-2 border-b border-cv-secondary">
                    <ButtonNavigation onClick={prevMonth}><NavigateBeforeIcon /></ButtonNavigation>
                    <p className='text-lg'>
                        {monthName(currentMonth)}
                    </p>
                    <ButtonNavigation onClick={nextMonth}><NavigateNextIcon /></ButtonNavigation>
                </header>
                <ul className="grid grid-cols-7 text-base font-semibold justify-items-center text-cv-cyan">
                    {renderDaysOfWeek()}
                </ul>
                <div className="grid grid-cols-7 gap-4 pb-3 justify-items-center">
                    {renderDays()}
                </div>
            </div>
            <footer className="flex justify-center gap-4 px-5 py-3 text-base text-white border-t border-cv-secondary bg-cv-primary">
                <button onClick={goToToday} className='w-full p-1 border rounded-md border-cv-secondary hover:bg-cv-secondary'>Hoy</button>
            </footer>
        </div>
    )
}

Calendar.propTypes = {
    birthdays: PropTypes.array.isRequired,
    fetchBirthdays: PropTypes.func.isRequired,
    selectedMonth: PropTypes.string.isRequired,
    setSelectedMonth: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
}
