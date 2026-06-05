import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const input = ({value, onChange, label, placeholder, type}    ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label className='text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium'>{label}</label>
        <div className='input-box'>
        <input
            type={type == 'password' ? showPassword ? 'text' : 'password' : type}
            placeholder={placeholder}
            className='w-full bg-transparent outline-none text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base'
            value={value}
            onChange={(e) => onChange(e)}
            
        />
        {type === 'password' && (
            <>
                {showPassword ? (
                    <FaRegEye 
                        size={22}
                        className='text-primary cursor-pointer'
                        onClick={()=> togglePassword()} 
                    />
                ) : (
                    <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                        onClick={()=> togglePassword()}
                    />
                )}
            </>
        )}
        </div>
    </div>
  )
}

export default input
