import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
    baseURL: 'https://educircle-server.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.status === 401 || error === 403) {
                toast.error('Unauthorized Access!')
                signOutUser()
                    .then(() => {
                        // console.log('log out user')
                        navigate('/login')
                    })
                    .catch(error => {
                        // console.log(error)
                    })
            }
            // console.log('caught in interceptors--->', error)
            return Promise.reject(error);
        }
        )
    }, [])
    return axiosInstance;
};

export default useAxiosSecure;