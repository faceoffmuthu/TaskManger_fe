import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex items-center gap-3 min-w-0'>
        <div className={`w-2 h-10 md:h-12 ${color} rounded-full shrink-0`}></div>
        <p className='text-sm md:text-base text-gray-500 dark:text-slate-400 leading-none whitespace-nowrap'>
            <span className='text-xl md:text-2xl text-black dark:text-slate-100 font-semibold mr-2'>
                {value}
            </span>
            {label}
        </p>
    </div>
  )
}

export default InfoCard
