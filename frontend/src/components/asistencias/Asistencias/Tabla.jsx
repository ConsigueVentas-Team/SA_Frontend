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
				<div className="w-full min-w-full overflow-x-auto scrollbar">
					<table className="w-full text-sm text-left text-white">
						<thead className="text-base uppercase">
							<tr>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
									Departamento
								</th>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
									Nucleo
								</th>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
									Turno
								</th>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
									Colaborador
								</th>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
									Fecha
								</th>
								<th scope="col" className="px-6 py-4 text-center whitespace-nowrap">
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
									<th scope="row" className="px-6 py-4 text-center whitespace-nowrap">
										{attendance.user.position[0].core.department.name}
									</th>
									<td className="px-6 py-4 text-center whitespace-nowrap">
										{attendance.user.position[0].core.name}
									</td>
									<td className="px-6 py-4 text-center whitespace-nowrap">
										{attendance.user.shift}
									</td>
									<th scope="row" className="px-6 py-4 text-center whitespace-nowrap">
										{attendance.user.name + " " + attendance.user.surname}
									</th>
									<th scope="row" className="px-6 py-4 text-center whitespace-nowrap">
										{attendance.date}
									</th>
									<th scope="row" className="px-6 py-4 text-center whitespace-nowrap">
										<div className='flex items-center justify-center'>
											{attendance.attendance === 1 && (
												<div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
											)}
											{attendance.delay === 1 && attendance.justification === 0 && (
												<div className="w-5 h-5 rounded-full bg-[#FAFF00]"></div>
											)}
											{attendance.delay === 0 && attendance.justification === 0 && attendance.attendance === 0 && (
												<div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
											)}
											{(attendance.justification === 1) && (
												<div className="w-5 h-5 rounded-full bg-[#57F3FF]"></div>
											)}
										</div>
									</th>
									<td className="sticky right-0 text-center  whitespace-nowrap bg-cv-primary">
										<div className='flex items-center justify-center'>
											<button
												onClick={() => handleViewClick(attendance)}
												className='p-2 duration-300 ease-in-out border rounded-md border-cv-secondary text-cv-cyan hover:bg-cv-cyan hover:text-cv-primary active:scale-95'>
												<VisibilityIcon />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<nav className="flex items-center justify-center w-full gap-2 px-6 py-4 md:justify-between">
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