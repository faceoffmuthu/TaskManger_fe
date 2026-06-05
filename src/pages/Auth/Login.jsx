import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { AUTH_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login From Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Please enter a valid password');
      return;
    }

    setError('');

    // Login API call
    try {
      const response = await axiosInstance.post(AUTH_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }

    }
  }

  return (
    <AuthLayout>
      <div className='w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex flex-1 flex-col justify-center py-8 sm:py-10 md:py-12'>
        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-black dark:text-slate-100 leading-tight'>Welcome Back</h3>
        <p className='text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 mt-3 mb-6 sm:mb-8'>Please enter your details to login</p>

        <form onSubmit={handleLogin} className='flex flex-col gap-4 sm:gap-5'>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email'
            placeholder='leodas@gmail.com'
            type='email'
            required
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 Characters'
            type='password'
            required
          />

          {error && <p className='text-sm sm:text-base text-red-500 pb-1 sm:pb-2'>{error}</p>}

          <button
            type='submit'
            className='btn-primary text-base sm:text-lg'
          >
            Login
          </button>

          <p className='text-sm sm:text-base text-slate-800 dark:text-slate-300 mt-2 sm:mt-3 text-center sm:text-left'>
            Don't have an account?{" "}
            <Link to="/signup" className='text-primary font-medium underline'>
              Sign Up
            </Link>

          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
