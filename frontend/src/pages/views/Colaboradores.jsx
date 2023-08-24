
import { useState } from 'react';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { ListaColaboradores, ModalAgregar } from '../../components/colaboradores';

export const Colaboradores = () => {
	const [showAgregarModal, setShowAgregarModal] = useState(false);

	const toggleAgregarModal = () => {
		setShowAgregarModal(!showAgregarModal);
	};
	return (
		<>
			<section className="w-full flex flex-col justify-center items-center gap-4">
				<h1 className="w-full inline-flex items-center text-base font-medium uppercase text-white">
					<Diversity3Icon />
					<span className='ml-1 text-base font-medium md:ml-2'>Colaboradores</span>
				</h1>
				<ListaColaboradores toggleAgregarModal={toggleAgregarModal} />
			</section >
			{showAgregarModal &&
				<ModalAgregar close={toggleAgregarModal}/>
			}
		</>
	)
}
