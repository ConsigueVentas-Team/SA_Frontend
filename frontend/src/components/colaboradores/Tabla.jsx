import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

export const Tabla = ({ data, pagination, handlePageChange, toggleEditarModal }) => {

	return (
		<>
			<div className='w-full bg-[#0e161b] shadow-md  rounded-lg overflow-hidden'>
				<div className="w-full min-w-full overflow-x-auto scrollbar scrollbar-thumb-cv-cyan scrollbar-track-transparent scrollbar-thumb-rounded-full">
					<table className="w-full text-sm text-left text-white">
						<thead className="text-base uppercase">
							<tr>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Nombre
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Teléfono
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Email
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									DNI
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Departamento
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Núcleo
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Perfil
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Turno
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									F. Nacimiento
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									F. Ingreso
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									F. Finalización
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Rol
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap">
									Estado
								</th>
								<th scope="col" className="px-6 py-4 sticky right-0 bg-[#0e161b] text-center">
									Acciones
								</th>
							</tr>
						</thead>
						<tbody className='bg-cv-primary'>
							{data.map((users) => (
								<tr key={users.id} className="border-b border-cv-secondary">
									<th scope="row" className="px-6 py-4 whitespace-nowrap">
										{users.name + " " + users.surname}
									</th>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.cellphone}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.dni}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.position[0].core.department.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.position[0].core.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.position[0].name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.shift}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.birthday}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.date_start}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.date_end}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{users.roles[0].name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex flex-col items-center ">
											{users.status === 1 ?
												<div className='flex items-center justify-center'>
													<div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>Activo
												</div> :
												<>
													<div className='flex items-center justify-center'>
														<div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>Inactivo
													</div>
													<p className='text-center'>{users.status_description}</p>
												</>
											}
										</div>
									</td>
									<td className="w-48 px-6 py-4 text-center sticky right-0 p-1 bg-cv-primary">
										<div className='flex items-center justify-center flex-row space-x-2'>
											<button
												onClick={() => toggleEditarModal(users)}
												className='p-2 border border-cv-secondary rounded-md text-green-500 hover:bg-green-500 hover:text-white active:scale-95 ease-in-out duration-300'>
												<EditIcon />
											</button>
											<Link to={`/colaborador/${users.id}/perfil`} className='p-2 border border-cv-secondary rounded-md text-cv-cyan hover:bg-cv-cyan hover:text-cv-primary active:scale-95 ease-in-out duration-300'>
												<VisibilityIcon />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<nav className="w-full flex items-center justify-center md:justify-between px-6 py-4 gap-2">
					<div className='w-full'>
						<p className='text-sm font-normal whitespace-nowrap'>
							{`Página ${pagination.current_page} de ${pagination.last_page}`}
						</p>
					</div>
					<div className='w-full flex items-center justify-center md:justify-end gap-2'>
						<p className='text-sm font-normal whitespace-nowrap'>
							{`${pagination.from} - ${pagination.to} de ${pagination.total}`}
						</p>
						<div className='inline-flex items-center gap-1 whitespace-nowrap'>
							<button
								onClick={() => handlePageChange(1)}
								disabled={pagination.current_page === 1}
								className={`flex items-center justify-center p-1 rounded-full ${pagination.current_page === 1
									? 'text-white/25'
									: 'text-white hover:bg-cv-secondary'
									} `}
							>
								<FirstPageIcon />
							</button>
							<button
								onClick={() => handlePageChange(pagination.current_page - 1)}
								disabled={pagination.current_page === 1}
								className={`flex items-center justify-center p-1 rounded-full ${pagination.current_page === 1
									? 'text-white/25'
									: 'text-white hover:bg-cv-secondary'
									} `}
							>
								<KeyboardArrowLeft />
							</button>
							<button
								onClick={() => handlePageChange(pagination.current_page + 1)}
								disabled={pagination.current_page === pagination.last_page}
								className={`flex items-center justify-center p-1 rounded-full ${pagination.current_page === pagination.last_page
									? 'text-white/25'
									: 'text-white hover:bg-cv-secondary'
									} `}
							>
								<KeyboardArrowRight />
							</button>
							<button
								onClick={() => handlePageChange(pagination.last_page)}
								disabled={pagination.current_page === pagination.last_page}
								className={`flex items-center justify-center p-1 rounded-full ${pagination.current_page === pagination.last_page
									? 'text-white/25'
									: 'text-white hover:bg-cv-secondary'
									} `}
							>
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
	toggleEditarModal: PropTypes.func.isRequired,
};