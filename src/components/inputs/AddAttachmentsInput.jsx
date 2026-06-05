import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { LuPaperclip } from 'react-icons/lu'

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        const updateArr = attachments.filter((_, i) => i !== index);
        setAttachments(updateArr);
    };

    return (
        <div>
            {attachments.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className='flex items-center justify-between bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-md px-3 py-2 mb-2'
                >
                    <div className='flex flex-1 items-center gap-3'>
                        <LuPaperclip className='text-gray-400 text-lg' />
                        <p className='text-sm md:text-base text-black dark:text-slate-100 break-all'>{item}</p>
                    </div>

                    <button
                        type='button'
                        onClick={() => handleDeleteOption(index)}
                        className='cursor-pointer ml-3'
                    >
                        <HiOutlineTrash className='text-xl text-red-500' />
                    </button>
                </div>
            ))}

            <div className='flex items-center gap-5 mt-4'>
                <div className='flex w-full items-center gap-3 border border-gray-100 dark:border-slate-700 rounded-md px-3 bg-white dark:bg-slate-800'>
                    <LuPaperclip className='text-gray-400 text-lg' />

                    <input
                        type="text"
                        placeholder='Add File'
                        value={option}
                        onChange={({ target }) => setOption(target.value)}
                        className='w-full text-sm md:text-base text-black dark:text-slate-100 outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-slate-400 py-3'
                    />
                </div>

                <button
                    type='button'
                    className='card-btn text-nowrap'
                    onClick={handleAddOption}
                >
                    <HiMiniPlus className='text-lg' /> Add
                </button>
            </div>
        </div>
    );
};

export default AddAttachmentsInput;
