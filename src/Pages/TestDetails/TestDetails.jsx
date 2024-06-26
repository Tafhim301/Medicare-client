
import { useParams } from 'react-router-dom';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PromoCode from '../../Components/PromoCode/PromoCode';
import Swal from 'sweetalert2';
import useUser from '../../Hooks/useUser';



const TestDetails = () => {
    const [isActive,userLoading] = useUser();
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();
    const { data: test, isPending: testLoading, } = useQuery({
        queryKey: ['Test'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/test/${id}`)
            return res.data;
        }

    })


    const handleBooking = () => {
        if(!isActive){
            return Swal.fire({
                title: "Sorry",
                icon:"warning",
                text:"Your activity has been blocked"

            })
        }

       else if(test.slots === 0 ){
            return Swal.fire({
                title: "Sorry",
                icon:"info",
                text:"All the available slots has been booked"
            })

        }
        document.getElementById('my_modal_1').showModal()


    }
    if(userLoading){
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }
    return (
        <div className="md:mx-10">
            {testLoading ? (
                <div className="justify-center items-center flex mt-6 ">
                    <span className="loading-spinner loading loading-md"></span>
                </div>
            ) :
                <div className="card relative rounded-none md:mb-5  bg-base-100 shadow-xl">
                    <figure><img className="w-full h-screen" src={test?.image} alt="Test Image" /></figure>
                    <div className="card-body lg:absolute bottom-0 lg:bg-black lg:text-white lg:bg-opacity-40 w-full">
                        <h2 className="card-title">Test Name: <span className="font-bold">{test?.name}</span></h2>
                        <p>Test Description: <span className="font-bold">{test?.details}</span></p>
                        <p>Available Date: <span className="font-bold">{test?.date}</span></p>
                        <p>Available Slots: <span className="font-bold">{test?.slots}</span></p>

                        <div className="card-actions">
                            <button onClick={handleBooking} className="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                </div>}
             
                {
                    test &&
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <PromoCode test={test}></PromoCode>
                        <div className="modal-action">
                            <form method="dialog">
                                
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
}
            

        </div>
    );
};

export default TestDetails;