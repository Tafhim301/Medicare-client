import { useForm } from 'react-hook-form';

import Title from '../../../Components/Title/Title';





import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useDistricts from '../../../Hooks/useDistricts';
import useUpazilla from '../../../Hooks/useUpazilla';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateProfile = () => {
    const [districts] = useDistricts();
    const [upazillas] = useUpazilla();
    const { user, updateUserProfile } = useAuth();

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: userInfo, } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/info/${user.email}`)
            return res.data;
        }
    })
  




    const {
        register,
        handleSubmit,



    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const image = data.avatar[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log(image);
        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (res.data.success) {

            const user = {
                name: data.name,
                email: data.email,
                avatar: res.data.data.display_url,
                blood_group: data.blood_group,
                district: data.district,
                upazilla: data.upazilla,
                isActive: true

            }

            updateUserProfile(user.name, user.avatar)

            const result = await axiosSecure.put(`/user/${userInfo._id}`, user)
            if (result.data.modifiedCount > 0) {
                console.log(result.data);
                Swal.fire({
                    title: "Good Job!",
                    text: "Your profile has been updated successfully",
                    icon: 'success',
                    timer: 1500
                })
                
                navigate('/dashboard/userHome')
            }





        }
    }


    return (
        <div>
            <Title heading={"Update Your Profile"} subHeading={"Let us know what's new about you"}></Title>


            <div className="hero min-h-screen">



                <div className="hero-content shadow-2xl bg-base-100 flex-col items-center md:flex-row md:mx-10 rounded-lg">

                    <div className=" flex-1 shrink-0 w-full   ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className='md:grid gap-4 grid-cols-2'>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input {...register('name', { required: true })} type="text" placeholder="Your Name" defaultValue={userInfo?.name} className="input input-bordered" required />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input defaultValue={userInfo?.email} {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select defaultValue={userInfo?.blood_group} {...register('blood_group', { required: true })} className="select select-bordered w-full">
                                        <option value="A+">A+</option>
                                        <option value="B+">B+</option>
                                        <option value="O+">O+</option>
                                        <option value="AB+">AB+</option>
                                        <option value="A-">A-</option>
                                        <option value="B-">B-</option>
                                        <option value="O-">O-</option>
                                        <option value="AB-">AB-</option>

                                    </select>
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Avatar</span>
                                    </label>
                                    <input  {...register('avatar', { required: true })} type="file" className="file-input file-input-primary border border-gray-400 w-full max-w-xs" />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <select defaultValue={userInfo?.district} {...register('district', { required: true })} className="select select-bordered w-full">

                                        {districts.length > 0 && districts.map((district, idx) => <option key={idx} value={district.name}>{district.name}</option>)}


                                    </select>
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Upazilla</span>
                                    </label>
                                    <select defaultValue={userInfo?.upazilla} {...register('upazilla', { required: true })} className="select select-bordered w-full">

                                        {upazillas.length > 0 && upazillas.map((upazilla, idx) => <option key={idx} value={upazilla.name}>{upazilla.name}</option>)}


                                    </select>
                                </div>



                            </div>

                            <button type='submit' className="btn bg-blue-700  text-white">Update Profile</button>

                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}


export default UpdateProfile;