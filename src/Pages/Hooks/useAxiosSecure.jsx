import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000'
    });
    

    // Request interceptor to add authorization header for every secure call to the API
    useEffect(()=>{
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        
        });
    
        // Intercept 401 and 403 status
        axiosSecure.interceptors.response.use(
            (response)=> response, {
           
        }, async (error) => {
            
            if (error.response && (error.response.status === 401||error.response.status===403) ) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
    
    },[logOut,navigate,axiosSecure])
    return [axiosSecure];
};

export default useAxiosSecure;
