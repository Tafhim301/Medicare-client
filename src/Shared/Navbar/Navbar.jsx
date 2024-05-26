import { Link, NavLink, } from 'react-router-dom';
import logoImg from '../../assets/medicare_logo.jpg'

import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
   
    const navLinks =
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/allTests'}>All Tests</NavLink></li>
            {
                user &&

            <li><NavLink to={'/dashboard/userHome'}>Dashboard</NavLink></li>
            }

        </>
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error.message))
    }

   

    return (
        <div>
            <div className="navbar fixed border-b z-10 top-0 bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <div className='flex  items-center text-xl font-semibold'>
                        <img className='h-12' src={logoImg} alt="" />
                        <p className=''>Medicare</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    
                    {
                        user ?
                            <button onClick={handleLogOut} className='btn'>Log Out</button>
                            :
                            <button className='btn'><Link to={'/login'}>Login Now</Link></button>


                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;