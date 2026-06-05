import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Admin/Dashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import PrivateRoute from './routes/PrivateRoute'
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import { UserContext, UserProvider } from './context/userContext'
import { ThemeProvider } from './context/themeContext'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <ThemeProvider>
    <UserProvider>
    <div>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/login' replace />}/> */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/tasks' element={<ManageTasks/>}/>
            <Route path='/admin/create-task' element={<CreateTask/>}/>
            <Route path='/admin/users' element={<ManageUsers/>}/>
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={['user']}/>}>
            <Route path='/user/dashboard' element={<UserDashboard/>}/>
            <Route path='/user/tasks' element={<MyTasks/>}/>
            <Route path='/user/task-details/:id' element={<ViewTaskDetails/>}/>
          </Route>

          {/* {Default route} */}
          <Route path='/' element={<Root />}/>
        </Routes>

      </Router>
    </div>

    <Toaster
    toastOptions={{
      className:"",
      style:{
        fomtSize:"13px",
      },
    }}
    />
      
    
    </UserProvider>
    </ThemeProvider>
  )
}

export default App

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if(loading) return <Outlet/>;

  if(!user){
    return <Navigate to='/login' />;
  }

  return user.role === 'admin' ? <Navigate to='/admin/dashboard' /> : <Navigate to='/user/dashboard' />;
  
  }

  

  
