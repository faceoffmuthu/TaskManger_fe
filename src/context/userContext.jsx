import React, { createContext, useEffect, useState, useContext } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { AUTH_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(AUTH_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error('User not authenticated', error);
                clearUser();
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        if (userData?.token) {
            localStorage.setItem('token', userData.token);
        }
        setLoading(false);

    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token');
        setLoading(false);

    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
