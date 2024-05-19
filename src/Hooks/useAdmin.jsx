import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from '../Hooks/useAxiosSecure'
import useAuth from "./useAuth";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: isAdmin, isPending: adminLoading} = useQuery({
        queryKey: ["Verify Admin"],
        queryFn: async() =>{
            const res = await  axiosSecure.get(`/user/admin/${user.email}`)
            return res.data
        }
    })
    
    return [isAdmin,adminLoading];
};

export default useAdmin;