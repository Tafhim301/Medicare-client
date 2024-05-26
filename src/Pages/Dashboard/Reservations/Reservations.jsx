
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Reservation from "./Reservation";

const Reservations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reservations,refetch } = useQuery({
        queryKey: ['reservations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reservations');
            return res.data;
        }
    });

    // Common field to group by
    const commonField = 'testId';

    // Object to store arrays based on the category
    const groupedArrays = {};

    reservations && reservations.forEach(obj => {
        const category = obj[commonField];
        if (!groupedArrays[category]) {
            groupedArrays[category] = [];
        }
        groupedArrays[category].push(obj);
    });

    // Convert object values to an array
    const newArray = Object.values(groupedArrays);

    return (
        <div>
            {reservations && newArray.map((group, index) => (
                <div key={index}>
                   
                    {
                        <Reservation refetch={refetch} reservation={group} key={index} />
                    }
                </div>
            ))}
        </div>
    );
};

export default Reservations;
