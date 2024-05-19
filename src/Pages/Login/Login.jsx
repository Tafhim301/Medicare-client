import { useForm } from "react-hook-form";
import Title from "../../Components/Title/Title";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import loginImg from '../../../src/assets/Login_signup.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/dashboard/userHome';

    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);

    }
  
    const {
        register,
        handleSubmit,

        formState: { errors }

    } = useForm();
    const onSubmit = data => {
        login(data.email, data.password)
            .then(() => {
                
                Swal.fire({
                    title: "Welcome Back!",
                    text: "User Signed In Successfully",
                    icon: 'success',
                    timer: 1500
                })

                navigate(from, {replace : true})
            })

    }
    return (
        <div className="mt-5">
            <Title heading={"Login Now"} subHeading={"Welcome Back!"}></Title>


            <div className="hero min-h-screen m">



                <div className="hero-content shadow-2xl bg-base-100 flex-col items-center md:flex-row md:mx-10 rounded-lg">
                    <div className="text-center flex-1 hidden  border-r md:block  lg:text-left">
                        <img src={loginImg} alt="" />
                    </div>

                    <div className=" flex-1 md:max-w-lg  shrink-0 w-full   ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className=''>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                                </div>



                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input  {...register('password',
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
                                        {showPassword ? <span onClick={handleShowPassword} className='relative top-12 left-44 md:left-56 lg:96'><FaEyeSlash className='text-xl'></FaEyeSlash></span> : <span onClick={handleShowPassword} className='relative top-12  md:left-56 left-44 lg:96 '><FaEye className='text-xl'></FaEye></span>}
                                    </div>
                                    {
                                        errors.initialPassword && <span className='text-red-500'>{errors.initialPassword.message}</span>
                                    }
                                </div>

                            </div>

                            <button type='submit' className="btn bg-blue-700  text-white">Login</button>

                        </form>
                        <div className='text-center'>
                            <p className=''>New Here? <Link to={'/signup'}><span className='text-blue-700  font-bold'>Signup Now</span></Link></p>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="hero min-h-screen">




            </div>
        </div>
    );
};

export default Login;