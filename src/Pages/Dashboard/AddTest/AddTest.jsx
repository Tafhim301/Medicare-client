import Swal from "sweetalert2";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Title from "../../../Components/Title/Title";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTest = () => {
    const { register, reset, handleSubmit,setValue } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => { console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log(image);
        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

            if (res.data.success) {
                const test = {
                    name: data.name,
                    image: res.data.data.display_url,
                    details: data.details,
                    slots: parseInt(data.slots),
                    date: data.date,
                    price: parseFloat(data.price),



                }

                axiosSecure.post('/addTest', test)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log(res.data);
                            Swal.fire({
                                title: "Good Job!",
                                text: "Test added Successfully",
                                icon: 'success',
                                timer: 1500
                            })
                            reset();

                        }

                    })
            }


    

    };

    useEffect(() => {
        register('date');
        setValue('date', startDate); 
    }, [register, setValue, startDate]);

    return (
        <div>
            <Title heading={"Upload A New Test"} subHeading={"Provide Some new service to your wonderful clients"} />
            <div className="hero">
                <div className="hero-content">
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Test Name</span>
                                    </label>
                                    <input {...register('name')} type="text" placeholder="Test Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Test Image</span>
                                    </label>
                                    <input {...register('image')} type="file" placeholder="Test Image" className="file-input input-bordered file-input-primary" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Details</span>
                                    </label>
                                    <input {...register('details')} type="text" placeholder="Test Details" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input {...register('price')} type="text" placeholder="Price" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <DatePicker
                                        
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setValue('date', date); // Update 'date' field value
                                        }}
                                        
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Slots</span>
                                    </label>
                                    <input {...register('slots')} type="text" placeholder="Slots" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Add Test</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTest;
