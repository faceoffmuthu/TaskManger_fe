import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import SideMenu from './SideMenu';
import { useTheme } from '../../context/themeContext';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex items-center gap-5 bg-white dark:bg-slate-900 boader boader-b border-gray-200/50 dark:border-slate-700 backdrop-blur-[2px] p-4 px-7 sticky top-0 z-30'>
        <button
        className='block lg:hidden text-black dark:text-slate-100'
        onClick={()=>{
            setOpenSideMenu(!openSideMenu);
        }}>

            {openSideMenu ? (
                <HiOutlineX className='text-2xl'/>
            ):(
                <HiOutlineMenu className='text-2xl'/>
            )}

        </button>

        <h2 className='text-xl font-semibold text-black dark:text-slate-100'>Task Manager</h2>

        <button
            type='button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className='ml-auto p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'
        >
            {theme === 'dark' ? (
                <HiOutlineSun className='text-xl' />
            ) : (
                <HiOutlineMoon className='text-xl' />
            )}
        </button>

        {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white dark:bg-slate-900'>
            <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Navbar
