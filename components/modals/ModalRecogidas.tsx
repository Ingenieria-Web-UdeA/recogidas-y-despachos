import { useRecogidasContext } from '@context/recogidasContext';
import { FormEvent, useState } from 'react';
import Modal from './Modal';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LOTS } from 'graphql/client/lots';
import { Lot } from '@prisma/client';
import {
  GET_FILTERED_COLLECTIONS,
  UPSERT_COLLECTION,
} from 'graphql/client/collections';
import { toast } from 'react-toastify';
import { FormButtons } from './FormButtons';
import { GET_COLLECTIONS_BY_MONTH } from 'graphql/client/indicators';

const ModalRecogidas = () => {
  const [upsertCollection, { loading: mutationLoading }] =
    useMutation(UPSERT_COLLECTION);
  const { openModalRecogidas, setOpenModalRecogidas } = useRecogidasContext();
  const [formData, setFormData] = useState({
    lot: '',
    collectionDate: '',
    bunches: 0,
  });
  const { data, loading } = useQuery<{ lots: Lot[] }>(GET_LOTS, {
    fetchPolicy: 'cache-first',
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await upsertCollection({
        variables: {
          lot: formData.lot,
          bunches: formData.bunches,
          collectionDate: formData.collectionDate,
        },
        refetchQueries: [GET_FILTERED_COLLECTIONS, GET_COLLECTIONS_BY_MONTH],
      });
      toast.success('Recogida creada exitosamente');
      setOpenModalRecogidas(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error('Error al crear la recogida');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Modal
      open={openModalRecogidas}
      setOpen={setOpenModalRecogidas}
      modalTitle='Crear nueva recogida'
    >
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <label htmlFor='lote'>
            <span>Lote</span>
            <select
              required
              value={formData.lot}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lot: e.target.value }))
              }
              name='lote'
            >
              <option disabled value={''}>
                Seleccione un lote
              </option>
              {data?.lots.map((lot) => (
                <option key={`lot_${lot.id}`} value={lot.id}>
                  {lot.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='date'>
            <span>Fecha</span>
            <input
              required
              value={formData.collectionDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  collectionDate: e.target.value,
                }))
              }
              type='date'
              name='date'
            />
          </label>
          <label htmlFor='racimos'>
            <span>Cantidad de racimos</span>
            <input
              required
              type='number'
              name='racimos'
              min={0}
              step={1}
              value={formData.bunches.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bunches: parseInt(e.target.value),
                }))
              }
              placeholder='0'
            />
          </label>
          <FormButtons
            loading={mutationLoading}
            closeModal={() => setOpenModalRecogidas(false)}
          />
        </form>
      </div>
    </Modal>
  );
};

export { ModalRecogidas };
