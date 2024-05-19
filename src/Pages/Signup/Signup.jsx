import { useForm } from 'react-hook-form';
import signupImg from '../../assets/Login_signup.png'
import Title from '../../Components/Title/Title';
import useAuth from '../../Hooks/useAuth'

import { FaEye, FaEyeSlash, } from "react-icons/fa";
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useDistricts from '../../Hooks/useDistricts';
import useUpazilla from '../../Hooks/useUpazilla';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Signup = () => {
    const [districts] = useDistricts();
    const [upazillas] = useUpazilla();
    const {signUp,updateUserProfile} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setShowConfirmPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/dashboard/userHome';

    const handleShowPassword = () => {
        setShowPassword(!showPassword);

    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfrimPassword);

    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }

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
            signUp(user.email,data.password)
            .then(async() => {
                updateUserProfile(user.name,user.avatar)
                const result = await axiosPublic.post('/user',user)
                if(result.data.insertedId){
                    console.log(result.data);
                    Swal.fire({
                        title: "Good Job!",
                        text: "User Signed Up Successfully",
                        icon:'success',
                        timer: 1500
                    })
                    //TODO: navigate user to userdashboard
                    navigate(from, {replace : true})
                }
            })
           



        }
    }
    const password = watch('initialPassword', '');

    return (
        <div>
            <Title heading={"Signup Now"} subHeading={"To explore some of our unexplored features"}></Title>


            <div className="hero min-h-screen">



                <div className="hero-content shadow-2xl bg-base-100 flex-col items-center md:flex-row md:mx-10 rounded-lg">
                    <div className="text-center flex-1 hidden  border-r lg:block  lg:text-left">
                        <img src={signupImg} alt="" />
                    </div>

                    <div className=" flex-1 shrink-0 w-full   ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className='md:grid gap-4 grid-cols-2'>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input {...register('name', { required: true })} type="text" placeholder="Your Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select defaultValue={'default'} {...register('blood_group', { required: true })} className="select select-bordered w-full">
                                        <option disabled value={'default'}>Select your blood group</option>
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
                                    <input {...register('avatar', { required: true })} type="file" className="file-input file-input-primary border border-gray-400 w-full max-w-xs" />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <select defaultValue={'default'} {...register('district', { required: true })} className="select select-bordered w-full">
                                        <option disabled value={'default'}>Select your district</option>
                                        {districts.length > 0 && districts.map((district, idx) => <option key={idx} value={district.name}>{district.name}</option>)}


                                    </select>
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Upazilla</span>
                                    </label>
                                    <select defaultValue={'default'} {...register('upazilla', { required: true })} className="select select-bordered w-full">
                                        <option disabled value={'default'}>Select your upazilla</option>
                                        {upazillas.length > 0 && upazillas.map((upazilla, idx) => <option key={idx} value={upazilla.name}>{upazilla.name}</option>)}


                                    </select>
                                </div>


                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input  {...register('initialPassword',
                                        {
                                            minLength: {
                                                value: 8,
                                                message: "must be 8 chars",
                                            }, pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                                message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                                            }
                                        })}

                                        type={showPassword ? "text" : "password"} placeholder="Enter Your Password" className="input input-bordered" required />
                                    <div className='absolute '>
                                        {showPassword ? <span onClick={handleShowPassword} className='relative top-12 left-48 md:left-60'><FaEyeSlash className='text-xl'></FaEyeSlash></span> : <span onClick={handleShowPassword} className='relative top-12 left-48 md:left-60'><FaEye className='text-xl'></FaEye></span>}
                                    </div>
                                    {
                                        errors.initialPassword && <span className='text-red-500'>{errors.initialPassword.message}</span>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input {...register('password', { required: true, validate: value => value === password || "Password do not match" })} type={showConfrimPassword ? "text" : "password"} placeholder="Confirm Your Password" className="input input-bordered" required />
                                    <div className='absolute '>
                                        {showConfrimPassword ? <span onClick={handleShowConfirmPassword} className='relative top-12 left-48 md:left-60'><FaEyeSlash className='text-xl'></FaEyeSlash></span> : <span onClick={handleShowConfirmPassword} className='relative top-12 left-48 md:left-60'><FaEye className='text-xl'></FaEye></span>}
                                    </div>
                                    {errors.password && errors.password.type === "validate" && <span className="text-red-500">{errors.password.message}</span>}


                                </div>
                            </div>

                            <button type='submit' className="btn bg-blue-700  text-white">Signup</button>

                        </form>
                        <div className='text-center'>
                            <p className=''>Already have an account? <Link to={'/login'}><span className='text-blue-700  font-bold'>Login Now</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero min-h-screen">




            </div>
        </div>
    );
}


export default Signup;