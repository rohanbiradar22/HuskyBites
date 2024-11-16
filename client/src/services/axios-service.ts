import axios from "axios";

// common axios service
const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

axiosInstance.interceptors.request.use((req) => {
    if(localStorage.getItem("token")){
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return req
})

export default axiosInstance;