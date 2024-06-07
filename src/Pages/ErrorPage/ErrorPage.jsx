import { Link } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import errorImg from '../../assets/ErrorImg.png'
import Footer from '../Home/Footer/Footer';

const ErrorPage = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className=' mb-2'>
                <img className='w-full h-screen' src={errorImg} alt="" />
                <div className='flex justify-center -mt-20'>
                    <Link to={'/'}><button className="btn border-none text-white bg-blue-500">Back To Home</button></Link>
                </div>
            </div>
         
            <div className=''>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default ErrorPage; 