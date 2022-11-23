import logo from '@/assets/logo.jpg';
export const Header = () => {
  return (
    <nav
      className='bg-indigo-600 shadow-lg mx-auto flex items-center justify-between py-3 px-3'
      aria-label='Global'
    >
      <div className='flex justify-between flex-1'>
        <div className='flex items-center justify-between lg:w-auto rounded-md overflow-auto'>
          <a href='/'>
            <span className='sr-only'>Quadtree</span>
            <img className='h-8 w-auto sm:h-10' src={logo} alt='' />
          </a>
        </div>
        <div className='font-bold text-xl self-center text-white'>Quadtree</div>
      </div>
    </nav>
  );
};
