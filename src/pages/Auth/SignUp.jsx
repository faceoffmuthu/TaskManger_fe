import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/input'
import { validateEmail, validatePassword } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { AUTH_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');


  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up from submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl ='';

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }


    setError('');
    setIsLoading(true);

    // Sign up API call
     try {

      // Upload profile image if provided
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }
      const response = await axiosInstance.post(AUTH_PATHS.AUTH.REGISTER, {
        name:fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
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

    } finally {
      setIsLoading(false);
    }

  };

  return (
    <AuthLayout>
      <div className='w-full max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto flex flex-1 flex-col justify-center py-6 sm:py-8 md:py-10'>
        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-black dark:text-slate-100 leading-tight text-center md:text-left'>Create Account</h3>
        <p className='text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 mt-3 mb-6 sm:mb-8 text-center md:text-left'>Please enter your details to create an account</p>

        <form onSubmit={handleSignUp} className='flex flex-col gap-4 sm:gap-5'>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-2 sm:gap-y-3'>
            <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label='Full Name'
            placeholder='Leo Das'
            type='text'
            required
            />

            <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label='Email'
            placeholder='leodas@gmail.com'
            type='email'
            required
            />

            <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 Characters'
            type='password'
            required
            />

            <Input
            value={adminInviteToken}
            onChange={({target}) => setAdminInviteToken(target.value)}
            label='Admin Invite Token'
            placeholder='6-digit code'
            type='text'
            />
          </div>

          {error && <p className='text-sm sm:text-base text-red-500 pb-1 sm:pb-2 text-center md:text-left'>{error}</p>}

          <button
          type='submit'
          className='btn-primary text-base sm:text-lg mt-1'
          disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p className='text-sm sm:text-base text-slate-800 dark:text-slate-300 mt-2 sm:mt-3 text-center md:text-left'>
            Already have an account?{" "}
            <Link to="/login" className='text-primary font-medium underline'>
              Login
            </Link>
          
          </p>
          
        </form>
      </div>
      
    </AuthLayout>
  )
}

export default SignUp
