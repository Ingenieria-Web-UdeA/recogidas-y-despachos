import React from 'react';

const DateFilters = () => (
  <div className='flex flex-col gap-2 md:flex-row'>
    <label htmlFor='date-from'>
      <span>Desde</span>
      <input name='date-from' type='date' />
    </label>
    <label htmlFor='date-to'>
      <span>Hasta</span>
      <input name='date-to' type='date' />
    </label>
  </div>
);

export default DateFilters;
