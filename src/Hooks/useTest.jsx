import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {
    const axiosPublic = useAxiosPublic();
    const {data: tests,isPending:testsLoading,refetch} = useQuery({
        queryKey: ['AllTests'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/allTests')
            return res.data;
        }

    })
    return [tests,testsLoading,refetch];
};

export default useTest;