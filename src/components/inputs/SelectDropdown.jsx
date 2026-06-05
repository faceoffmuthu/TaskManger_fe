import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropdown = ({options,value,onChange,placeholder,className}) => {
    const [isOpen,setIsOpen] = useState(false);

    const handleSelect = (option) => {
      onChange(option);
      setIsOpen(false);
    };
  return (
    <div className='relative w-full'>
        {/* Dropdown Button */}
        <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between ${className || 'w-full text-sm md:text-base text-black dark:text-slate-100 outline-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-3 rounded-md mt-2'}`}>
            <span>{value ? (options.find((opt) => opt.value === value)?.label || placeholder) : placeholder}</span>
            <span className='ml-2'>{isOpen ? <LuChevronDown className='rotate-180'/> : <LuChevronDown/>}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
            <div className='absolute w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mt-1 rounded-md shadow-lg z-10'>
                {options.map((option)=>(
                    <div
                    key={option.value}
                    onClick={()=>handleSelect(option.value)}
                    className='px-3 py-2 text-sm text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'>
                        {option.label}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default SelectDropdown