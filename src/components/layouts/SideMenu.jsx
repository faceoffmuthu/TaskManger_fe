import React from 'react'
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SideMenu = ({activeMenu}) => {
    const {user, clearUser} = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route?.includes('logout')) {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    useEffect(()=>{
        if(user){
            setSideMenuData(user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
        }
        return ()=> {};
    },[user])
  return <div className='w-64 h-[calc(100vh-61px)] bg-white dark:bg-slate-900 border-r border-gray-200/50 dark:border-slate-700 sticky top-[61px] z-20'>
    <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
            <img src={user?.profileImageUrl || ""}
             alt="profile"
             className='w-22 h-22 bg-slate-400 rounded-full'/>

        </div>

        {user?.role === "admin" && (
            <div className='text-xs font-medium bg-primary text-white px-3 py-1 rounded mt-2'>
                Admin
                </div>
        )}

        <h5 className='text-lg text-gray-950 dark:text-slate-100 font-semibold leading-6 mt-3'>
            {user?.name || ""}
        </h5>
        <p className='text-sm text-gray-500 dark:text-slate-400'>
            {user?.email || ""}
        </p>
    </div>

    {sideMenuData.map((item, index) => (
        <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 text-base font-medium transition-colors ${
            activeMenu === item.label
                ? "text-primary bg-gradient-to-r from-blue-50 to-blue-100/70 dark:from-blue-500/10 dark:to-blue-500/5 border-r-[3px] border-primary"
                : "text-gray-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
        } py-3.5 px-6 mb-3 cursor-pointer`}
        onClick={() => handleClick(item.path)}
        >
            <item.icon className='text-2xl'/>
            {item.label}
        </button>
    ))}
  </div>
}

export default SideMenu
