import React from 'react'

const UserCard = ({ userInfo }) => {
    return (
        <div className='user-card p-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img
                        src={userInfo?.profileImageUrl}
                        alt={`Avatar`}
                        className='w-16 h-16 rounded-full border-2 border-white'
                    />

                    <div>
                        <p className='text-[22px] font-semibold leading-7 text-gray-900 dark:text-slate-100'>{userInfo?.name}</p>
                        <p className='text-[18px] text-gray-500 dark:text-slate-400 mt-1'>{userInfo?.email}</p>
                    </div>

                </div>


            </div>

            <div className='flex items-center justify-end gap-3 mt-5'>
                <StatCard
                label="Pending"
                count={userInfo?.pendingTasks || 0}
                status="pending"

                />
                <StatCard
                label="In Progress"
                count={userInfo?.inProgressTasks || 0}
                status="In Progress"

                />
                <StatCard
                label="Completed"
                count={userInfo?.completedTasks || 0}
                status="Completed"

                />

            </div>

        </div>
    )
}

export default UserCard

const StatCard = ({ label, count, status }) => {
   
    const getStatusTagColor = ()=>{
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-gray-50 dark:bg-slate-800";

            case "Completed":
                return "text-indigo-500 bg-gray-50 dark:bg-slate-800";

            default:
                return " text-violet-500 bg-gray-50 dark:bg-slate-800";
        }
    };

    return (
        <div className={`flex-1 text-[13px] font-medium ${getStatusTagColor()} px-4 py-2 rounded-lg`}>
           <span className='text-[18px] font-semibold'>{count}</span> <br/> {label}

        </div>
    )
}
