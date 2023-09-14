import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChecklistIcon from '@mui/icons-material/Checklist';

export const Breadcumb = () => {

    const rol = localStorage.getItem("rol");
    const hasRole = (targetRole) => {
        return rol !== targetRole;
    };

    return (
        <nav className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
                {hasRole("Colaborador") && (
                    <li className="inline-flex items-center">
                        <Link to="/asistencias" className="inline-flex items-center text-base font-medium text-gray-400 hover:text-white">
                            <ChecklistIcon />
                            <span className='ml-1 text-base font-medium md:ml-2'>Asistencias</span>
                        </Link>
                    </li>
                )}
                <li >
                    <div className="flex items-center text-gray-500 ">
                        <ChevronRightIcon />
                        <span className="ml-1 text-base font-medium md:ml-2">Marcar asistencia</span>
                    </div>
                </li>
            </ol>
        </nav>

    )
}
