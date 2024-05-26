import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Reservation = ({ reservation,refetch,search }) => {
    const axiosSecure = useAxiosSecure();

    const handleCancel = async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/appointment/delete/${id}`)
                if(res.data.deletedCount > 0){

                    Swal.fire({
                      title: "Deleted!",
                      text: "Appointment has been cancelled .",
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
                           reservation && reservation.map((test,idx) =>
                        <tr className="gap-5" key={idx}>
                            <th>{idx + 1}</th>
                            <td>{test.test_name}</td>
                            <td>{test.email}</td>
                            <td className="text-start" ><btn className="btn">Submit</btn></td>
                            <td className="text-start" ><btn onClick={() => handleCancel(test._id)} className="btn text-white btn-error">Cancel</btn></td>
                            
                        </tr>
                            )
                            
                        }
                     
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Reservation;