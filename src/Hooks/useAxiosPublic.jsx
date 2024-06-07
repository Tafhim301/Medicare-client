import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://medicare-server-sepia.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;