import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Tabla = ({ data, pagination, handlePageChange, openImageModal, setImage }) => {

	const handleViewClick = (attendance) => {
		openImageModal();
		setImage(attendance)
	};

	return (
		<>
			<div className='w-full bg-[#0e161b] shadow-md  rounded-lg overflow-hidden'>
				<div className="w-full min-w-full overflow-x-auto">
					<table className="w-full text-sm text-left text-white">
						<thead className="text-base uppercase">
							<tr>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Departamento
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Nucleo
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Turno
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Colaborador
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Fecha
								</th>
								<th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
									Asistencia
								</th>
								<th scope="col" className="px-6 py-4 sticky right-0 bg-[#0e161b] text-center">
									Acciones
								</th>
							</tr>
						</thead>
						<tbody className='bg-cv-primary'>
							{data.map((attendance) => (
								<tr key={attendance.id} className='border-b border-cv-secondary'>
									<th scope="row" className="px-6 py-4 whitespace-nowrap text-center">
										{attendance.user.position[0].core.department.name}
									</th>
									<td className="px-6 py-4 whitespace-nowrap text-center">
										{attendance.user.position[0].core.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">
										{attendance.user.shift}
									</td>
									<th scope="row" className="px-6 py-4 whitespace-nowrap text-center">
										{attendance.user.name + " " + attendance.user.surname}
									</th>
									<th scope="row" className="px-6 py-4 whitespace-nowrap text-center">
										{attendance.date}
									</th>
									<th scope="row" className="px-6 py-4 whitespace-nowrap text-center">
										<div className='flex items-center justify-center'>
											{attendance.attendance === 1 && (
												<div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
											)}
											{attendance.delay === 1 && attendance.justification !== 1 && (
												<div className="w-5 h-5 rounded-full bg-[#FAFF00]"></div>
											)}
											{attendance.delay === 0 && attendance.justification !== 1 && (
												<div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
											)}
											{(attendance.justification === 1) && (
												<div className="w-5 h-5 rounded-full bg-[#57F3FF]"></div>
											)}
										</div>
									</th>
									<td className=" whitespace-nowrap sticky right-0 bg-cv-primary text-center">
										<div className='flex items-center justify-center'>
											<button
												onClick={() => handleViewClick(attendance)}
												className='p-2 border border-cv-secondary rounded-md text-cv-cyan hover:bg-cv-cyan hover:text-cv-primary active:scale-95 ease-in-out duration-300'>
												<VisibilityIcon />
											</button>
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
	openImageModal: PropTypes.func.isRequired,
	setImage: PropTypes.func.isRequired,
};