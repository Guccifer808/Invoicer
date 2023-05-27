import useDarkMode from 'src/hooks/useDarkMode';
import { motion } from 'framer-motion';

import logo from 'src/assets/logo.png';
import profilePic from 'src/assets/profilePic.png';
import moon from 'src/assets/icon-moon.svg';
import sun from 'src/assets/icon-sun.svg';

const Header: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();

  const toggleDarkMode = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  //framer-motion transition
  const transition = {
    stiffness: 100,
    damping: 10,
  };

  return (
    <div className=''>
      <header className='p-4duration-300 z-50 flex h-[80px] items-center justify-end bg-light ease-in-out dark:bg-dark lg:hidden '>
        {/* Logo */}
        <img
          src={logo}
          alt='logo'
          className='absolute left-0 top-0 h-24 w-24'
        />
        {/* Right side */}
        <div className='flex items-center'>
          {/* Theme switcher */}
          {colorTheme === 'light' ? (
            <motion.img
              initial={{
                scale: 0.75,
                rotate: 90,
              }}
              animate={{
                scale: 1,
                rotate: 360,
                transition,
              }}
              whileTap={{
                scale: 0.9,
                rotate: 15,
              }}
              className='ml-6 w-6 cursor-pointer'
              src={moon}
              onClick={toggleDarkMode}
            />
          ) : (
            <motion.img
              initial={{
                scale: 0.75,
                rotate: 90,
              }}
              animate={{
                scale: 1,
                rotate: 360,
                transition,
              }}
              whileTap={{
                scale: 0.9,
                rotate: 15,
              }}
              className='ml-6 w-6 cursor-pointer'
              src={sun}
              onClick={toggleDarkMode}
            />
          )}

          <div className=''></div>

          <div className='relative'>
            <img
              src={profilePic}
              alt='profile'
              className='mx-4 h-6 w-6 cursor-pointer'
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className='z-50 hidden lg:block'>
        <div className='fixed left-0 top-0 z-50 flex h-screen w-24 flex-col rounded-r-2xl bg-dark dark:bg-darkSecondary'>
          <div className='flex h-full w-full flex-col items-center justify-between'>
            {/* Logo */}
            <img src={logo} alt='sidebar logo' className='relative' />
            {/* Bottom */}
            <div className='mb-4 mt-auto flex flex-col items-center justify-center'>
              {colorTheme === 'light' ? (
                <motion.img
                  initial={{
                    scale: 0.75,
                    rotate: 90,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 360,
                    transition,
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15,
                  }}
                  className='mt-6 w-6 cursor-pointer'
                  src={moon}
                  onClick={toggleDarkMode}
                  alt='moon icon'
                />
              ) : (
                <motion.img
                  initial={{
                    scale: 0.75,
                    rotate: 90,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 360,
                    transition,
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15,
                  }}
                  className='mt-6 w-6 cursor-pointer'
                  src={sun}
                  onClick={toggleDarkMode}
                  alt='sun icon'
                />
              )}
              <div className='my-6 w-24 border-t border-solid border-dark'></div>
              <div className='relative'>
                <img
                  src={profilePic}
                  alt='profile'
                  className='h-6 w-6 cursor-pointer'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
