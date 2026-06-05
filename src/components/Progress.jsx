import React from 'react'

const Progress = ({progress,status}) => {

    const getColor = () => {
        switch (status) {
            case 'In Progress':
                return 'bg-cyan-500';
            case 'Completed':
                return 'bg-lime-500';
            default:
                return 'bg-violet-500';
        }
    };
  return (
    <div className='w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5'>
        <div className={`${getColor()} h-1.5 rounded-full`} style={{width: `${Math.min(progress, 100)}%`}}>
        </div>
    </div>
  )
}

export default Progress