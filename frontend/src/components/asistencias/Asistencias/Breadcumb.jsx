import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChecklistIcon from '@mui/icons-material/Checklist';

export const Breadcumb = () => {


    return (
        <nav className="flex" >
            <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
                <li className="inline-flex items-center">
                    <div className="inline-flex items-center text-base font-medium text-gray-400">
                        <ChecklistIcon />
                        <span className='ml-1 text-base font-medium md:ml-2'>Asistencias</span>
                    </div>
                </li>
                <li >
                    <Link to="/marcar-asistencia" className="flex items-center text-gray-500 hover:text-white ">
                        <ChevronRightIcon />
                        <span className="ml-1 text-base font-medium md:ml-2">Marcar asistencia</span>
                    </Link>
                </li>
            </ol>
        </nav>

    )
}
