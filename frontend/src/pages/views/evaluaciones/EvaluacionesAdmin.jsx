import React, { useState } from 'react';
import Modal from './Modal'; 
import BasicTable from '../../../components/evaluaciones/Evaluador/BasicTable'; 

export const EvaluacionesAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>Abrir Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <BasicTable />
    </>
  );
};
