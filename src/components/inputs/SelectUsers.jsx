import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { AUTH_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(AUTH_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]);
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers.filter((user) => selectedUsers.includes(user._id)).map((user) => user.profileImageUrl || "");

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([])
        }
        return () => { };
    }, [selectedUsers])
    return (
        <div className='space-y-4 mt-2'>
            {selectedUserAvatars.length === 0 && (
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className='w-full flex items-center justify-center gap-2 text-base text-gray-700 dark:text-slate-200 font-medium hover:text-primary dark:hover:text-white bg-gray-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 cursor-pointer'

                >
                    <LuUsers className="text-xl" />Add Member

                </button>
            )}

            {selectedUserAvatars.length > 0 && (
                <div className='cursor-pointer' onClick={()=>setIsModalOpen(true)}>
                   <AvatarGroup
                   avatars={selectedUserAvatars}
                   maxVisible={3}
                   />
                </div>
            )}

            <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Select Users"
            >
                <div className='space-y-4 h-[60vh] overflow-y-auto'>
                    {allUsers.map((user)=>(
                        <div 
                        key={user._id}
                        className='flex items-center gap-4 p-3 border-b border-gray-200 dark:border-slate-700'>
                            <img
                            src={user.profileImageUrl || ''}
                            alt={user.name}
                            className='w-10 h-10 rounded-full object-cover'
                            />

                            <div className='flex-1'>
                                <p className='font-medium text-gray-800 dark:text-slate-100'>{user.name}</p>
                                <p className='text-[13px] text-gray-500 dark:text-slate-400'>{user.email}</p>
                            </div>

                            <input
                            type="checkbox"
                            checked={tempSelectedUsers.includes(user._id)}
                            onChange={() => toggleUserSelection(user._id)}
                            className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer'
                            />
                            </div>
                    ))}
                </div>

                <div className='flex justify-end gap-4 pt-4'>
                    <button className='card-btn'
                    onClick={()=> setIsModalOpen(false)}
                    > CANCEL
                        
                    </button>
                    <button className='card-btn-fill'
                    onClick={handleAssign}
                    > DONE
                        
                    </button>
                     
                </div>
            </Modal>
        </div>
    )
}

export default SelectUsers