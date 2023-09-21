import PropTypes from 'prop-types';
import { ListItem, NotFound } from './Elements';


export const BirthdayList = ({ data, selectedMonth }) => {

    return (
        <div className="w-full p-1 shadow bg-cv-primary rounded-xl">
            <div className="flex items-center justify-between p-2 mb-4 border-b border-cv-secondary">
                <h5 className="inline-flex gap-1 text-base font-bold leading-none text-white md:text-xl whitespace-nowrap">Lista de cumpleaños de<p className='lowercase first-letter:uppercase'>{selectedMonth}</p></h5>
            </div>
            {data.length > 0 ? (
                <div className="flow-root h-auto scrollbar md:max-h-96 md:overflow-y-auto ">
                    <ul className="divide-y divide-cv-secondary">
                        {data.map((user) => (
                            <ListItem key={user.id} user={user} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='flex items-center justify-center w-full h-80'>
                    <div>
                        <NotFound />
                        <p className='font-bold text-center uppercase text-slate-500'>No hay Cumpleaños</p>
                    </div>
                </div>
            )}
        </div>
    )
}

BirthdayList.propTypes = {
    data: PropTypes.array.isRequired,
    selectedMonth: PropTypes.string.isRequired,
}