import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useUpazilla = () => {
    const {data: upazillas = []} = useQuery({
        queryKey: ['upazillas'],
        queryFn:async() =>{
           const res = await axios.get('/upazila.json')
           return res.data;
        } 
            
    })
    return [upazillas]
};

export default useUpazilla;