import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ReservationTable = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: reservations,refetch } = useQuery({
        queryKey: ['Reservations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservations/${id}`)
            return res.data;
        }

    })

    console.log(reservations);

    const handleCancel = async (test) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/appointment/delete/${test._id}/${test.testId}`)
                if (res.data.deletedCount > 0) {

                    Swal.fire({
                        title: "Cancelled!",
                        text: "Appointment has been cancelled.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });



    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-sm mb-16 ">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="w-1/5">Test Name</th>
                            <th>Booked By</th>
                            <th className="w-1/5 ">Result</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations && reservations.map((test, idx) =>

                                <tr className="gap-5" key={idx}>

                                    <th>{idx + 1}</th>
                                    <td>{test.test_name}</td>
                                    <td>{test.email}</td>
                                    <td className="text-start" ><Link to={`/dashboard/submitForm/${test._id}`}><btn className="btn">Submit</btn></Link></td>
                                    <td className="text-start" ><btn onClick={() => handleCancel(test)} className="btn text-white btn-error">Cancel</btn></td>

                                </tr>
                            )

                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default ReservationTable;