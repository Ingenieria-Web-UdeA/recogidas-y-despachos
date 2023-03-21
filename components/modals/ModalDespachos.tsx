import { useRecogidasContext } from '@context/recogidasContext';
import React from 'react';
import Modal from './Modal';

const ModalDespachos = () => {
  const { openModalDespachos, setOpenModalDespachos } = useRecogidasContext();
  return (
    <Modal
      open={openModalDespachos}
      setOpen={setOpenModalDespachos}
      modalTitle='Crear un despacho'
    >
      <div>Este es el modal para crear un despacho</div>
    </Modal>
  );
};

export { ModalDespachos };
