import PropTypes from 'prop-types';
import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ButtonNavigation } from './Elements';


export const Calendar = ({currentMonth, birthdays, fetchBirthdays, setCurrentMonth, onDayClick }) => {

    const prevMonth = () => {
        const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        setCurrentMonth(prevMonthDate);
        fetchBirthdays(prevMonthDate.toLocaleString('es-ES', { month: 'numeric' }).toUpperCase(), '');        
    };

    const nextMonth = () => {
        const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonthDate);
        fetchBirthdays(nextMonthDate.toLocaleString('es-ES', { month: 'numeric' }).toUpperCase(), '');        
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        fetchBirthdays(today.toLocaleString('es-ES', { month: 'numeric' }).toUpperCase(), '');        
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
                ? 'bg-cv-cyan text-cv-primary hover:bg-cv-cyan-hover'
                : isCurrentMonth
                    ? 'text-white'
                    : 'text-gray-600'
                }`;

            const birthdayPeople = birthdays.filter((person) => {
                const personMonth = new Date(person.birthday).getUTCMonth() + 1;
                const personDay = new Date(person.birthday).getUTCDate();
                return personMonth === date.getUTCMonth() + 1 && personDay === date.getUTCDate();
            });


            return (
                <div
                    key={date.toDateString()}
                    onClick={birthdayPeople.length > 0 ? () => onDayClick(date) : null}
                    className={`${dayClassName} w-7 h-7 flex items-center justify-center p-1 rounded-full font-semibold ${birthdayPeople.length > 0 ? 'bg-red-500 hover:bg-red-700 cursor-pointer' : ''}`}
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
                <button onClick={goToToday} className='w-full p-1 border rounded-md border-cv-secondary hover:bg-cv-secondary'>Todos</button>
            </footer>
        </div>
    )
}

Calendar.propTypes = {
    birthdays: PropTypes.array.isRequired,
    fetchBirthdays: PropTypes.func.isRequired,
    currentMonth: PropTypes.string.isRequired,
    setCurrentMonth: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
}