import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";


const UserHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: userInfo, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/info/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            {
                isPending ? <div className="justify-center items-center flex mt-6 ">
                    <span className="loading-spinner loading loading-md"></span>
                </div> :
                    <div>
                        <div className="flex border-b-2 p-2 items-center gap-2 ">
                            <img src={userInfo.avatar} className="rounded-full w-28 border p-3" alt="" />
                            <h2 className="text-3xl font-bold">Hi,{userInfo.name}</h2>
                        </div>
                        <div className="mt-2" >
                            <h2 className="text-2xl font-bold">Your Profile Details:</h2>
                            <div className="">
                                <p>Name: {userInfo.name}</p>
                                <p>Email: {userInfo.email}</p>
                                <p>blood Group: {userInfo.blood_group}</p>
                                <p>District: {userInfo.district}</p>
                                <p>Upazilla: {userInfo.upazilla}</p>
                                <Link to={`/dashboard/updateProfile`}> <button className="btn mt-3 btn-accent">Update Profile</button></Link>
                            </div>


                        </div>


                    </div>
            }

        </div>
    );
};

export default UserHome;