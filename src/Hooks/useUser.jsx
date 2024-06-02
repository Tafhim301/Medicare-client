import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: isActive, isPending: userLoading} = useQuery({
        queryKey: ["User"],
        queryFn: async() =>{
            const res = await  axiosSecure.get(`/user/active/${user?.email}`)
            return res.data
        }
    })
    
    return [isActive,userLoading];
};


export default useUser;