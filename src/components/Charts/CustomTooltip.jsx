import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
   return (
    <div className='bg-white dark:bg-slate-800 p-2.5 rounded-lg shadow-md border border-gray-300 dark:border-slate-700'>
        <p className='text-sm font-semibold text-purple-800 dark:text-purple-300 mb-1'>{payload[0].name}</p>
        <p className='text-base text-gray-600 dark:text-slate-300'>Count: <span className='text-base font-medium text-gray-900 dark:text-slate-100'>{payload[0].value}</span></p>
    </div>
   )
  }
}

export default CustomTooltip
