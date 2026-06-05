export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
export const AUTH_PATHS = {
  AUTH :{
    REGISTER: "api/auth/register", //Register a new user (Admin or Member)
    LOGIN: "api/auth/login", //Authenticatr user & return JWT token
    GET_PROFILE: "api/auth/profile", //Get logged in user details
  },

  USERS: {
    GET_ALL_USERS: "api/users", //Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `api/users/${userId}`, //Get user by ID (Admin only)
    CREATE_USER: "api/users", //Create a new user (Admin only)
    UPDATE_USER: (userId) => `api/users/${userId}`, //Update user (Admin only)
    DELETE_USER: (userId) => `api/users/${userId}`, //Delete user (Admin only)
    
  },
  TASKS: {
    GET_DASHBOARD_DATA: "api/tasks/dashboard-data", //Get dashboard data (Admin only)
    GET_USER_DASHBOARD_DATA: "api/tasks/user-dashboard-data", //Get user dashboard data (Admin only)
    GET_ALL_TASKS: "api/tasks", //Get all tasks (Admin only)
    GET_TASK_BY_ID: (taskId) => `api/tasks/${taskId}`, //Get task by ID (Admin only)
    CREATE_TASK: "api/tasks", //Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `api/tasks/${taskId}`, //Update task (Admin only)
    DELETE_TASK: (taskId) => `api/tasks/${taskId}`, //Delete task (Admin only)

    UPDATE_TASK_STATUS: (taskId) => `api/tasks/${taskId}/status`, //Update task status (Admin only)
    UPDATE_TODO_CHECKLIST:(taskId)=>`api/tasks/${taskId}/todo`, //Update todo checklist (Admin only)
  },
  REPORTS:{
    EXPORT_TASKS:"api/reports/export/tasks", //Download tasks as Excel
    EXPORT_USERS:"api/reports/export/users", //Download user-task report
  },
  IMAGE:{
    UPLOAD_IMAGE:"api/auth/upload-image", //Upload user profile image
  }
}
