import React from 'react';

interface CardLoteProps {
  loteNumero: number;
}

const CardLote = ({ loteNumero }: CardLoteProps) => {
  return (
    <div className='flex flex-col items-center gap-2 rounded-xl bg-gray-800 px-6 py-4 text-sm text-gray-50 shadow-xl'>
      <span className='text-xl font-bold'>Lote {loteNumero}</span>
      <div className='flex flex-col text-gray-200'>
        <div>
          <span className='text-md'>Recogidas:</span>
          <span className='text-xs'> 50</span>
        </div>
        <div>
          <span className='text-md'>Despachos:</span>
          <span className='text-xs'> 50</span>
        </div>
      </div>
    </div>
  );
};

export { CardLote };
