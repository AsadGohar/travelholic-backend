import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    credentials: 'include'
});

// instance.defaults.headers.delete['Authorization']= 

export const imagePath = 'http://localhost:4000/uploads/images'
export default instance;
