import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTestDetails = (id) => {
    const axiosSecure = useAxiosSecure();
    const {data: test,isPending:testLoading,refetch} = useQuery({
        queryKey: ['Test'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/test/${id}`)
            return res.data;
        }

    })
    return [test,testLoading,refetch]
};

export default useTestDetails;