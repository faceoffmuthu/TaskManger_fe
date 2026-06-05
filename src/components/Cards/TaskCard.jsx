import React from 'react'
import Progress from '../Progress'
import AvatarGroup from '../AvatarGroup'
import { LuPaperclip } from 'react-icons/lu'
import moment from 'moment'

const TaskCard = ({
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachmentCount,
    completedTodoCount,
    todoChecklist,
    onClick
}) => {

    const getStatusTagColor = () => {
        switch (status) {
            case 'In Progress':
                return 'text-cyan-600 bg-cyan-50';
            case 'Completed':
                return 'text-lime-600 bg-lime-50';
            default:
                return 'text-violet-600 bg-violet-50';
        }
    };

    const getPriorityTagColor = () => {
        switch (priority) {
            case 'Low':
                return 'text-emerald-600 bg-emerald-50';
            case 'Medium':
                return 'text-amber-600 bg-amber-50';
            default:
                return 'text-rose-600 bg-rose-50';
        }
    };

    return (
        <div className='bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 cursor-pointer hover:shadow-md transition-shadow' onClick={onClick}>
            <div className='flex items-center gap-3'>
                <div
                    className={`text-[12px] font-medium ${getStatusTagColor()} px-3 py-1 rounded`}
                >
                    {status}
                </div>
                <div
                    className={`text-[12px] font-medium ${getPriorityTagColor()} px-3 py-1 rounded`}
                >
                    {priority} Priority
                </div>
            </div>

            <div className={`mt-4 pl-3 border-l-[3px] ${status === 'In Progress' ? 'border-cyan-500' :
                    status === 'Completed' ? 'border-lime-500' :
                        'border-violet-500'
                }`}>

                <p className='text-[17px] font-bold text-gray-800 dark:text-slate-100 line-clamp-2'>
                    {title}
                </p>

                <p className='text-[14px] font-medium text-gray-500 dark:text-slate-400 mt-1 line-clamp-2 leading-[22px]'>
                    {description}
                </p>

                <p className='text-[14px] text-gray-700 dark:text-slate-300 font-medium mt-3 mb-1'>
                    Task Done: <span className='font-bold text-gray-800 dark:text-slate-100'>
                        {completedTodoCount} / {todoChecklist?.length || 0}
                    </span>
                </p>

            </div>

            <div className='mt-2'>
                <Progress progress={progress} status={status} />
            </div>

            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <label className='text-[12px] text-gray-500 dark:text-slate-400 font-medium'>Start Date</label>
                        <p className='text-[14px] font-bold text-gray-900 dark:text-slate-100 mt-0.5'>{moment(createdAt).format('Do MMM YYYY')}</p>
                    </div>

                    <div>
                        <label className='text-[12px] text-gray-500 dark:text-slate-400 font-medium'>Due Date</label>
                        <p className='text-[14px] font-bold text-gray-900 dark:text-slate-100 mt-0.5'>{moment(dueDate).format('Do MMM YYYY')}</p>
                    </div>
                </div>

                <div className='flex items-center justify-between mt-5'>
                    <AvatarGroup avatars={assignedTo || []} />

                    {attachmentCount > 0 && (
                        <div className='flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1.5 rounded-lg'>
                            <LuPaperclip className='text-blue-500 dark:text-white text-[15px]' />
                            <span className='text-[13px] font-semibold text-blue-600 dark:text-white'>{attachmentCount}</span>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default TaskCard
