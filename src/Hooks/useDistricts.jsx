import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useDistricts = () => {
    const {data: districts = []} = useQuery({
        queryKey: ["districts"],
        queryFn:async() =>{
           const res = await axios.get('/districts.json')
           return res.data;
        } 
            
    })
    return [districts]
   
};

export default useDistricts;