import { useForm } from "react-hook-form";
import Title from "../../../Components/Title/Title";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddBanner = () => {
    const { register,reset, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data);
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
            const banner = {
                name: data.name,
                image: res.data.data.display_url,
                title: data.title,
                description: data.description,
                coupon_code: data.coupon_code,
                discount_rate: parseFloat(data.discount_rate),
                isActive: false


            }

            axiosSecure.post('/banner',banner)
            .then(res =>{
                if(res.data.insertedId){
                    console.log(res.data);
                    Swal.fire({
                        title: "Good Job!",
                        text: "Banner added Successfully",
                        icon:'success',
                        timer: 1500
                    })
                    reset();
                    
                }
                
            })
        }


    }
    return (

        <div>
            <Title heading={"Upload A New Banner"} subHeading={"Let Them Know What Special Offer is Ahead"}></Title>
            <div className="hero ">

                <div className="hero-content">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Name</span>
                                    </label>
                                    <input {...register('name')} type="text" placeholder="Banner Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Image</span>
                                    </label>
                                    <input {...register('image')} type="file" placeholder="Banner Image" className="file-input input-bordered file-input-primary" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Title</span>
                                    </label>
                                    <input {...register('title')} type="text" placeholder="Banner Title" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Description</span>
                                    </label>
                                    <input {...register('description')} type="text" placeholder="Banner Description" className="input input-bordered " required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Coupon Code</span>
                                    </label>
                                    <input {...register('coupon_code')} type="text" placeholder="Coupon Code" className="input input-bordered " required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Discount Rate</span>
                                    </label>
                                    <input {...register('discount_rate')} type="text" placeholder="Discount Rate" className="input input-bordered " required />

                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn  btn-primary">Upload Banner</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBanner;