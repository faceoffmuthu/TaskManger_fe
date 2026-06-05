import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef =   useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            // Upload the image state
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
  return (
    <div className='flex justify-center mb-4 sm:mb-6'>
        <input
            type='file'
            ref={inputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
        />

        {!image ?(
            <div className='w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-blue-100/50 rounded-full relative'>
            <LuUser className='text-4xl sm:text-5xl text-primary'/>

            <button
            type='button'
            onClick={onChooseFile}
            className='absolute bottom-0 right-0 bg-primary text-white p-2 sm:p-2.5 rounded-full shadow-md cursor-pointer'
            >
                <LuUpload className=''/>
            </button>
            </div>
        ):(
            <div className='relative'>
                <img src={previewUrl} alt="profile photo" className='w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover' />

                <button
                type='button'
                onClick={handleRemoveImage}
                className='absolute bottom-0 right-0 bg-red-500 text-black p-2 sm:p-2.5 rounded-full shadow-md cursor-pointer'
                >
                    <LuTrash className=''/>
                </button>
            </div>
        )}
        
    </div>
  )
}

export default ProfilePhotoSelector
