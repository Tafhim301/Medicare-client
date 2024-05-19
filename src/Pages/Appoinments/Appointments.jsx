import { useQuery } from "@tanstack/react-query";

import useAuth from "../../Hooks/useAuth";
import AppointmentTable from "./AppointmentTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Appointments = () => {
    const {user} = useAuth();
    const axiosSecure =useAxiosSecure();
    const {data: appointments = [],isPending: isLoading} = useQuery({
        queryKey: ["UpcomingAppointments"],
        queryFn: async() =>{
            const res = await axiosSecure(`/appointments/${user?.email}`);
            return res.data;
        }
    })
    return (
       <div>
         {isLoading ?
            <div className="justify-center items-center flex mt-6 ">
                <span className="loading-spinner loading loading-md"></span>
            </div>
        :  <AppointmentTable appointments={appointments} ></AppointmentTable> }
       </div>
        
    
    );
};

export default Appointments;