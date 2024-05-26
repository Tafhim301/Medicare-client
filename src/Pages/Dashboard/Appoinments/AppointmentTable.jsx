
import Swal from 'sweetalert2';
import formatDate from './formatDate'; 
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const AppointmentTable = ({ appointments,refetch }) => {
    const axiosSecure = useAxiosSecure();
    const handleCancel = async(_id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel an appointment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`appointment/delete/${_id}`)
                if(res.data.deletedCount > 0){

                    Swal.fire({
                      title: "Cancelled!",
                      text: "Your appointment has been cancelled",
                      icon: "success",
                      timer: 1500
                    });

                    refetch();
                }

            }
          });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Name</th>
                            <th>Test Date</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 &&
                            appointments.map((appointment, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{appointment?.test_name}</td>
                                    <td>{formatDate(appointment?.date)}</td>
                                    <td><button onClick={() => handleCancel(appointment._id)} className="btn-sm text-white bg-red-500 btn">X</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentTable;
