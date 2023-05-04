import { useRecogidasContext } from '@context/recogidasContext';
import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { FormButtons } from './FormButtons';
import { useMutation } from '@apollo/client';
import { CREATE_SHIPMENT } from 'graphql/client/shipment';
import { toast } from 'react-toastify';

const ModalDespachos = () => {
  const [formData, setFormData] = useState<{
    shipmentDate: string;
    shippedBunches: number;
    deliveredWeight: number;
  }>({
    shipmentDate: '',
    shippedBunches: 0,
    deliveredWeight: 0,
  });

  const { openModalDespachos, setOpenModalDespachos } = useRecogidasContext();
  const [createShipment, { loading: mutationLoading }] =
    useMutation(CREATE_SHIPMENT);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createShipment({
        variables: {
          shipmentDate: formData.shipmentDate,
          shippedBunches: formData.shippedBunches,
          deliveredWeight: formData.deliveredWeight,
        },
      });

      toast.success(
        `Despacho creado con éxito. El peso por racimo fue de ${data?.createShipment?.bunchWeight.toFixed(
          2
        )} kg`
      );
      setOpenModalDespachos(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error('Ocurrió un error al crear el despacho');
    }
  };

  return (
    <Modal
      open={openModalDespachos}
      setOpen={setOpenModalDespachos}
      modalTitle='Crear un despacho'
    >
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-2'>
          <label htmlFor='shipmentDate'>
            <span>Fecha del despacho</span>
            <input
              type='date'
              required
              name='shipmentDate'
              value={formData.shipmentDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shipmentDate: e.target.value,
                }))
              }
            />
          </label>
          <label htmlFor='bunches'>
            <span>Cantidad de racimos despachados</span>
            <input
              type='number'
              required
              name='bunches'
              min={0}
              step={1}
              placeholder='0'
              value={formData.shippedBunches.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shippedBunches: parseInt(e.target.value),
                }))
              }
            />
          </label>
          <label>
            <span>Kilos entregados en planta</span>
            <input
              type='number'
              placeholder='0'
              min={0}
              required
              value={formData.deliveredWeight.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deliveredWeight: parseInt(e.target.value),
                }))
              }
            />
          </label>
          <FormButtons
            loading={mutationLoading}
            closeModal={() => setOpenModalDespachos(false)}
          />
        </form>
      </div>
    </Modal>
  );
};

export { ModalDespachos };
