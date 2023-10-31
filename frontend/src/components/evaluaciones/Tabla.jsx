import PropTypes from 'prop-types'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'

export const Tabla = ({ data, pagination, handlePageChange }) => {
    return (
        <>
            <div className='w-full bg-[#0e161b] shadow-md  rounded-lg overflow-hidden'>
                <div className='w-full min-w-full overflow-x-auto scrollbar'>
                    <table className='w-full text-sm text-left text-white'>
                        <thead className='text-base uppercase'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Nombre
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Departamento
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Núcleo
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Perfil
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Turno
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 whitespace-nowrap'>
                                    Rol
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 sticky right-0 bg-[#0e161b] text-center'>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-cv-primary'>
                            {data.map(users => (
                                <tr
                                    key={users.id}
                                    className='border-b border-cv-secondary'>
                                    <th
                                        scope='row'
                                        className='px-6 py-4 whitespace-nowrap'>
                                        {`${users.name} ${users.surname}`}
                                    </th>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {users.position[0].core.department.name}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {users.position[0].core.name}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {users.position[0].name}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {users.shift}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {users.roles[0].name}
                                    </td>
                                    <td className='sticky right-0 w-48 p-1 px-6 py-4 text-center bg-cv-primary'>
                                        <div className='flex flex-row items-center justify-center space-x-2'>
                                            <Link
                                                to={`/evaluacion/${users.id}/${users.name}-${users.surname}-${users.roles[0].name}`}
                                                key={users.id}>
                                                <button
                                                    onClick={() => users.id}
                                                    className='p-2 text-green-500 duration-300 ease-in-out border rounded-md border-cv-secondary hover:bg-green-500 hover:text-white active:scale-95'>
                                                    <EditIcon />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className='flex items-center justify-center w-full gap-2 px-6 py-4 md:justify-between'>
                    <div className='w-full'>
                        <p className='text-sm font-normal whitespace-nowrap'>
                            {`Página ${pagination.current_page} de ${pagination.last_page}`}
                        </p>
                    </div>
                    <div className='flex items-center justify-center w-full gap-2 md:justify-end'>
                        <p className='text-sm font-normal whitespace-nowrap'>
                            {`${pagination.from} - ${pagination.to} de ${pagination.total}`}
                        </p>
                        <div className='inline-flex items-center gap-1 whitespace-nowrap'>
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.current_page === 1}
                                className={`flex items-center justify-center p-1 rounded-full ${
                                    pagination.current_page === 1
                                        ? 'text-white/25'
                                        : 'text-white hover:bg-cv-secondary'
                                } `}>
                                <FirstPageIcon />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        pagination.current_page - 1
                                    )
                                }
                                disabled={pagination.current_page === 1}
                                className={`flex items-center justify-center p-1 rounded-full ${
                                    pagination.current_page === 1
                                        ? 'text-white/25'
                                        : 'text-white hover:bg-cv-secondary'
                                } `}>
                                <KeyboardArrowLeft />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        pagination.current_page + 1
                                    )
                                }
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                className={`flex items-center justify-center p-1 rounded-full ${
                                    pagination.current_page ===
                                    pagination.last_page
                                        ? 'text-white/25'
                                        : 'text-white hover:bg-cv-secondary'
                                } `}>
                                <KeyboardArrowRight />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.last_page)
                                }
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                className={`flex items-center justify-center p-1 rounded-full ${
                                    pagination.current_page ===
                                    pagination.last_page
                                        ? 'text-white/25'
                                        : 'text-white hover:bg-cv-secondary'
                                } `}>
                                <LastPageIcon />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

Tabla.propTypes = {
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    // toggleEditarModal: PropTypes.func.isRequired,
}
