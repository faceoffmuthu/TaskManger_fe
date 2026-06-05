import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'

// todoList shape: [{ text: string, subtasks: string[] }]
const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("");
    const [subInputs, setSubInputs] = useState({}); // { [mainIndex]: currentSubtaskText }

    const handleAddOption = () => {
        if (option.trim()) {
            setTodoList([...todoList, { text: option.trim(), subtasks: [] }]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        setTodoList(todoList.filter((_, idx) => idx !== index));
    };

    const handleAddSubtask = (mainIndex) => {
        const value = (subInputs[mainIndex] || "").trim();
        if (!value) return;
        const updated = todoList.map((item, idx) => {
            if (idx !== mainIndex) return item;
            const subtasks = Array.isArray(item.subtasks) ? item.subtasks : [];
            return { ...item, subtasks: [...subtasks, value] };
        });
        setTodoList(updated);
        setSubInputs({ ...subInputs, [mainIndex]: "" });
    };

    const handleDeleteSubtask = (mainIndex, subIndex) => {
        const updated = todoList.map((item, idx) => {
            if (idx !== mainIndex) return item;
            return {
                ...item,
                subtasks: (item.subtasks || []).filter((_, i) => i !== subIndex),
            };
        });
        setTodoList(updated);
    };

    return (
        <div>
            {todoList.map((item, index) => (
                <div
                    key={index}
                    className='bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-3 py-2 rounded-md mt-2'
                >
                    <div className='flex items-center justify-between'>
                        <p className='text-sm md:text-base text-black dark:text-slate-100'>
                            <span className='text-base md:text-lg text-gray-400 dark:text-slate-500 font-semibold mr-2'>
                                {index < 9 ? `0${index + 1}` : index + 1}.
                            </span>
                            <span>{item.text}</span>
                        </p>

                        <button
                            type='button'
                            onClick={() => handleDeleteOption(index)}
                            className='cursor-pointer'
                        >
                            <HiOutlineTrash className='text-xl text-red-500' />
                        </button>
                    </div>

                    {(item.subtasks || []).length > 0 && (
                        <div className='mt-2 ml-6 space-y-1'>
                            {item.subtasks.map((sub, sIdx) => (
                                <div
                                    key={sIdx}
                                    className='flex items-center justify-between bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 px-2 py-1 rounded'
                                >
                                    <p className='text-xs md:text-sm text-gray-700 dark:text-slate-200'>
                                        <span className='text-gray-400 dark:text-slate-500 mr-2'>
                                            {index + 1}.{sIdx + 1}
                                        </span>
                                        {sub}
                                    </p>
                                    <button
                                        type='button'
                                        onClick={() => handleDeleteSubtask(index, sIdx)}
                                        className='cursor-pointer'
                                    >
                                        <HiOutlineTrash className='text-base text-red-400' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <input
                            type='text'
                            placeholder='Enter Subtask'
                            value={subInputs[index] || ""}
                            onChange={({ target }) =>
                                setSubInputs({ ...subInputs, [index]: target.value })
                            }
                            className='w-full text-xs md:text-sm text-black dark:text-slate-100 outline-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-2 py-2 rounded'
                        />
                        <button
                            type='button'
                            onClick={() => handleAddSubtask(index)}
                            className='card-btn text-nowrap'
                        >
                            <HiMiniPlus className='text-base' /> Sub
                        </button>
                    </div>
                </div>
            ))}

            <div className='flex items-center gap-5 mt-4'>
                <input
                    type='text'
                    placeholder='Enter Main Task'
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    className='w-full text-sm md:text-base text-black dark:text-slate-100 outline-none bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-3 rounded-md'
                />

                <button
                    type='button'
                    onClick={handleAddOption}
                    className='card-btn text-nowrap'
                >
                    <HiMiniPlus className='text-xl' /> Add
                </button>
            </div>
        </div>
    );
};

export default TodoListInput;
