import { FaAd, FaBookMedical, FaClipboardList, FaHome, FaSearch, FaUsers, } from "react-icons/fa";
import {  FaCalendar, FaEnvelope, FaList,    } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { BsCardImage } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";



const Dashboard = () => {
    const [isAdmin,adminLoading] = useAdmin();
    if(adminLoading){
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }

    return (
        <div className="flex">
            <div className="w-64 min-h-screen text-white bg-indigo-400">
                <ul className="menu space-y-2">
                    {
                        isAdmin ?
                      <>
                            
                            <li>
                                <NavLink to={'/dashboard/addTest'}><FaBookMedical />Add A Test</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/allTest'}><FaList></FaList>All Tests</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/reservations'}><FaClipboardList />Reservations</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}><FaUsers />All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/addBanner'}><BsCardImage />Add Banner</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/allBanners'}><IoIosImages />All Banners</NavLink>
                            </li>
                        </>
                        :
                            
                            <>
                                <li>
                                    <NavLink to={'/dashboard/userHome'}><FaHome />My Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/appointments'}><FaCalendar />My Upcoming Appointments</NavLink>
                                </li>
                                
                                <li>
                                    <NavLink to={'/dashboard/testResult'}><FaAd />Test Result</NavLink>
                                </li>
                               
                            </>
                    }
                    <div className="divider">
                    </div>
                    <li>
                        <NavLink to={'/'}><FaHome />Home</NavLink>
                    </li>

                    <li><NavLink to={'/allTests'}> <FaSearch></FaSearch>All Tests</NavLink></li>
                    <li><NavLink to={'/contact'}> <FaEnvelope></FaEnvelope>Contact</NavLink></li>


                </ul>
            </div>

            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;