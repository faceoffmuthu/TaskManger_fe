import { AUTH_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();
        // Append image file to form data
        formData.append('image', imageFile);

        const response = await axiosInstance.post(
            AUTH_PATHS.IMAGE.UPLOAD_IMAGE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', //Set header for file upload
                },
            }
        );

        return response.data; //Return uploaded image data
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default uploadImage;
