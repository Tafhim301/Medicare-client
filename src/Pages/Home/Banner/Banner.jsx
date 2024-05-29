
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banner = {} } = useQuery({
    queryKey: ["Active Banner"],
    queryFn: async () => {
      const res = await axiosPublic.get('/banner');
      return res.data;
    }
  });

  return (
    <div className="">
      <div className="min-h-screen relative hero " style={{ backgroundImage: `url(${banner.image})` }}>
      <div className="hero-overlay bg-opacity-50"></div>
        
        <svg className="absolute bottom-0  hidden md:block  w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1420 320">
          <path fill="black" fillOpacity="0.6" d="M0,96L60,96C120,96,240,96,360,117.3C480,139,600,181,720,186.7C840,192,960,160,1080,122.7C1200,85,1320,43,1380,21.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
       
          <text x="50%" y="210" fill="white" dominantBaseline="middle" textAnchor="middle" fontSize="clamp(3rem, 2.5vw, 1.5rem)">
            {banner.title}!
          </text>
        
          <text x="50%" y="250" fill="white" dominantBaseline="middle" textAnchor="middle" fontSize="clamp(0.55rem, 2vw, 1.12rem)">
            {banner.description} with
            <tspan fill="yellow"> {banner.coupon_code}  </tspan> to get <tspan fill="yellow">{banner.discount_rate}% Off</tspan>
          </text>
        </svg>
        <Link  to={'/allTests'}><button className="btn  md:flex justify-center hidden absolute bottom-2 border-none  bg-blue-500 text-white">See All Tests</button></Link>

      </div>
         
      <div className='md:hidden text-white absolute left-0 right-0 bottom-0 px-2 py-5 bg-black bg-opacity-30 '>
        <p className='text-xl'>{banner.title}!!</p>
        <p className='text-xs'>{banner.description} with <span className='font-bold text-lg'>{banner.coupon_code}</span> to get <span className='font-bold text-lg'>{banner.discount_rate}</span>% off</p>
       <Link to={'/allTests'}><button className="btn bg-blue-500 border-none text-white">See All Tests</button></Link>

      </div>
    </div>
  );
};

export default Banner;
