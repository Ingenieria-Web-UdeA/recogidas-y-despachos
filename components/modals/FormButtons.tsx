import ReactLoading from 'react-loading';

interface FormButtonsProps {
  loading: boolean;
  closeModal: () => void;
}

const FormButtons = ({ loading, closeModal }: FormButtonsProps) => (
  <div className='flex w-full justify-center gap-4'>
    <button type='submit' disabled={loading}>
      {loading ? (
        <ReactLoading type='spin' height={30} width={30} color='blue' />
      ) : (
        'Crear'
      )}
    </button>
    <button
      type='button'
      disabled={loading}
      onClick={closeModal}
      className='secondary'
    >
      Cancelar
    </button>
  </div>
);

export { FormButtons };
