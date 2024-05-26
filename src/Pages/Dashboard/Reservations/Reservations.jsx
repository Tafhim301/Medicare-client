import  { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Reservation from "./Reservation";

const Reservations = () => {
    const axiosSecure = useAxiosSecure();
    const [searchEmail, setSearchEmail] = useState('');
    
    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchEmail(e.target.search.value);
    }

    const { data: reservations, refetch } = useQuery({
        queryKey: ['reservations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reservations');
            return res.data;
        }
    });

    // Common field to group by
    const commonField = 'testId';

    // Filter reservations based on the entered email
    const filteredReservations = reservations ? reservations.filter(reservation => {
        return reservation.email.includes(searchEmail);
    }) : [];

    // Group filtered reservations
    const groupedArrays = {};

    filteredReservations.forEach(obj => {
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
            <form onSubmit={handleSearch}>
                <label className="input mb-5 mr-5 input-bordered flex items-center ">
                    <input name='search' type="text" className="grow" placeholder="Search by email..." />
                    <button type="submit" className="btn btn-sm">Search By Email</button>
                </label>
            </form>

            {reservations && newArray.map((group, index) => (
                <div key={index}>
                    <Reservation refetch={refetch} reservation={group} key={index} />
                </div>
            ))}
        </div>
    );
};

export default Reservations;
