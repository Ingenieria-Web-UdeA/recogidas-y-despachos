import React from 'react';

const Sidebar = () => {
  return (
    <aside className='hidden h-screen w-64 flex-col justify-between bg-gray-800 text-white md:flex'>
      <div>
        <div className='flex h-20 items-center justify-center bg-gray-900'>
          <img src='your-logo-url' alt='Logo' className='h-12 w-12' />
        </div>
        <nav className='mt-6 flex flex-col px-4'>
          <a
            href='#'
            className='mb-2 flex items-center rounded py-2 px-2 text-gray-200 hover:bg-gray-700'
          >
            <i className='fas fa-home'></i>
            <span className='ml-4'>Home</span>
          </a>
          <a
            href='#'
            className='mb-2 flex items-center rounded py-2 px-2 text-gray-200 hover:bg-gray-700'
          >
            <i className='fas fa-user'></i>
            <span className='ml-4'>Profile</span>
          </a>
          <a
            href='#'
            className='mb-2 flex items-center rounded py-2 px-2 text-gray-200 hover:bg-gray-700'
          >
            <i className='fas fa-cog'></i>
            <span className='ml-4'>Settings</span>
          </a>
        </nav>
      </div>
      <button
        type='button'
        className='m-4 flex h-16 items-center justify-center'
      >
        <i className='fas fa-sign-out-alt'></i>
        <span className='ml-4'>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
