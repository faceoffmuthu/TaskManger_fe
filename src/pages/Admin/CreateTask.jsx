import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { AUTH_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropdown from '../../components/inputs/SelectDropdown'
import SelectUsers from '../../components/inputs/SelectUsers'
import TodoListInput from '../../components/inputs/TodoListInput'
import AddAttachmentsInput from '../../components/inputs/AddAttachmentsInput'
import DeleteAlert from '../../components/DeleteAlert'
import Modal from '../../components/Modal'

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    // reset form
    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      assignedTo: "",
      todoChecklist: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item.text,
        completed: false,
        subtasks: (item.subtasks || []).map((s) => ({ text: s, completed: false })),
      }));


      const response = await axiosInstance.post(AUTH_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task created successfully");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async () => {
    setLoading(true);
    
    try {
      const prevTodoChecklist = currentTask?.todoChecklist || [];
      const todolist = taskData.todoChecklist.map((item) => {
        const matched = prevTodoChecklist.find((t) => t.text === item.text);
        const prevSubs = matched?.subtasks || [];
        const subtasks = (item.subtasks || []).map((s) => {
          const ms = prevSubs.find((p) => p.text === s);
          return { text: s, completed: ms ? ms.completed : false };
        });
        const completed = subtasks.length > 0
          ? subtasks.every((s) => s.completed)
          : (matched ? matched.completed : false);
        return { text: item.text, completed, subtasks };
      });

      const response = await axiosInstance.put(AUTH_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });
      
      toast.success("Task updated successfully");
      clearData();
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);

    }
    finally{
      setLoading(false);
    }
   };


  const handleSubmit = async (e) => {
    setErrors(null);

    // Input validation
    if (!taskData.title.trim()) {
      setErrors("Task title is required");
      return;
    }

    if (!taskData.description.trim()) {
      setErrors("Task description is required");
      return;
    }

    if (!taskData.dueDate.trim()) {
      setErrors("Task due date is required");
      return;
    }

    if (!taskData.priority.trim()) {
      setErrors("Task priority is required");
      return;
    }

    if (taskData.assignedTo.length === 0) {
      setErrors("Task not assigned to any member");
      return;
    }

    if (taskData.todoChecklist.length === 0) {
      setErrors("Add atleast one todo task");
      return;
    }

    const missingSubs = taskData.todoChecklist.find(
      (it) => !it.subtasks || it.subtasks.length === 0
    );
    if (missingSubs) {
      setErrors(`Add at least one subtask under "${missingSubs.text}"`);
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(AUTH_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevData) => ({

          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format('YYYY-MM-DD')
            : null,
          assignedTo: taskInfo.assignedTo?.map((item) => item?._id) || [],
          todoChecklist: taskInfo?.todoChecklist?.map((item) => ({
            text: item?.text,
            subtasks: (item?.subtasks || []).map((s) => s?.text),
          })) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to fetch task');
    }
  };

  // Delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(AUTH_PATHS.TASKS.DELETE_TASK(taskId));
      
      setOpenDeleteAlert(false);
      toast.success('Expense details deleted successfully');
      navigate('/admin/tasks');
    } catch (error) {
      console.error('Error deleting expense:', error.response?.data?.message || error.message);
      toast.error('Failed to delete expense details');
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID();
    }
    return () => {}
  }, [taskId]);



  return (
    <DashboardLayout activeMenu="Create Task">
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium text-gray-900 dark:text-slate-100'>
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 dark:bg-rose-500/10 rounded px-2 py-1 border border-rose-100 dark:border-rose-500/30 hover:bg-rose-300 dark:hover:bg-rose-500/20 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}


            </div>

            <div className='mt-4'>
              <label className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                Task Title
              </label>
              <input
                type="text"
                placeholder='Create App UI'
                value={taskData.title}
                onChange={({ target }) => handleValueChange('title', target.value)}
                className='form-input'
              />

            </div>

            <div className='mt-3'>
              <label className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                Task Description
              </label>
              <textarea
                placeholder='Description task'
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange('description', target.value)}
                className='form-input'
              />

            </div>

            <div className='grid grid-cols-12 gap-4 mt-2'>
              <div className='col-span-6 md:col-span-3'>
                <label className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange('priority', value)}
                  placeholder="Select Priority"
                  className='form-input'
                />
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                  Due Date
                </label>
                <input
                  type="date"
                  placeholder='Select Due Date'
                  value={taskData.dueDate}
                  onChange={({ target }) => handleValueChange('dueDate', target.value)}
                  className='form-input'
                />
              </div>

              <div className='col-span-12 md:col-span-3'>
                <label className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                  Assigned To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange('assignedTo', value)}
                />
              </div>

            </div>

            <div className='mt-3'>
              <label className='text-sm md:text-base font-medium text-slate-600 dark:text-slate-300'>
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) => handleValueChange('todoChecklist', value)}
              />

            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600 dark:text-slate-300'>
                Add Attachments

              </label>

              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) => handleValueChange('attachments', value)}
              />

            </div>

            {errors && (
              <p className='text-xs font-medium text-red-500 mt-5'>{errors}</p>
            )}

            <div className='flex justify-end mt-7'>
              <button className='add-btn'
                onClick={handleSubmit}
                disabled={loading}
              >

                {taskId ? "UPDATE TASK" : "CREATE TASK"}

              </button>

            </div>

          </div>

        </div>

      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={()=> deleteTask()}
        />

      </Modal>

    </DashboardLayout>
  )
}

export default CreateTask
