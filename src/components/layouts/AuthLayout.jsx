import React from 'react'
import authBg from '../../assets/images/auth-bg.png'


const AuthLayout = ({children}) => {
  return (
    <div className='flex min-h-screen flex-col lg:flex-row bg-white dark:bg-slate-900'>
        <div className='w-full min-h-screen lg:w-[58vw] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 flex flex-col'>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100'>Task Manager</h2>
            {children}

        </div>
        <div 
            className="hidden lg:flex lg:w-[42vw] min-h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 lg:p-12"
            style={{ backgroundImage: `url(${authBg})` }}
        >
            
        </div>
        
     </div>
  )
}

export default AuthLayout
