import React from 'react';

const Sidebar = () => {
  return (
    <aside className='hidden w-64 flex-col justify-between px-3 py-5 md:flex'>
      <div className='flex flex-col gap-4'>
        <div>Logo</div>
        <div>
          <div>Resumen</div>
          <div>Recogidas</div>
          <div>Facturacion</div>
          <div>Indicadores</div>
        </div>
      </div>
      <div>Log out</div>
    </aside>
  );
};

export default Sidebar;
