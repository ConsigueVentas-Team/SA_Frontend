import { Link } from 'react-router-dom';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Breadcumb = () => {
	return (
		<div className="w-full mb-5">
			<nav className="flex" >
				<ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
					<li className="inline-flex items-center">
						<Link to="/colaboradores" className="inline-flex items-center text-base font-medium text-gray-400 hover:text-white">
							<Diversity3Icon />
							<span className='ml-1 text-base font-medium md:ml-2'>Colaboradores</span>
						</Link>
					</li>
					<li >
						<div className="flex items-center text-gray-400 ">
							<ChevronRightIcon />
							<span className="ml-1 text-base font-medium md:ml-2 text-gray-500">Perfil</span>
						</div>
					</li>
				</ol>
			</nav>
		</div>
	)
}
