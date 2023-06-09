import { useRecogidasContext } from '@context/recogidasContext';

const ActionButtons = () => {
  const { setOpenModalRecogidas, setOpenModalDespachos } =
    useRecogidasContext();

  return (
    <div className='flex items-center gap-2'>
      <button type='button' onClick={() => setOpenModalRecogidas(true)}>
        Nueva recogida
      </button>
      <button type='button' onClick={() => setOpenModalDespachos(true)}>
        Nuevo despacho
      </button>
    </div>
  );
};

export default ActionButtons;
