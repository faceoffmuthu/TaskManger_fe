import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap justify-center gap-3 mt-3 space-x-6'>
        {payload.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center space-x-2'>
                <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }}></div>
                <span className='text-sm text-gray-700 dark:text-slate-300 font-medium'>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend
