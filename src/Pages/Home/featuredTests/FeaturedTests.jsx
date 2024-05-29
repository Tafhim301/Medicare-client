import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Components/Title/Title";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "react-router-dom";



const FeaturedTests = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tests } = useQuery({
        queryKey: ["Feautered Tests"],
        queryFn: async () => {
            const res = await axiosPublic.get('/feautered-tests');
            return res.data;
        }
    })
    console.log(tests)
    return (
        <div className="my-5 mt-2 ">
            <Title heading={"Feautered Tests"} subHeading={"Explore Our most popular tests"}></Title>
            <Swiper
                
             
                spaceBetween={20}
                slidesPerView={1}
                
                pagination={{
                    clickable: true,

                }}
                modules={[Pagination]}
                
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                    767: { // Medium devices
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: { // Large devices
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}

            >
                {
                    tests&& tests.map(test =><SwiperSlide  key={test?._id}>
                       <div className="card m-3 rounded-none bg-base-100 md:rounded-lg  h-full shadow-xl">
                <figure><img className="w-full h-72" src={test.image} alt="Test Image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Test Name: <span className="font-bold">{test?.name}</span></h2>
                
                    <p>Available Date: <span className="font-bold">{test?.date}</span></p>
                    <p>Available Slots: <span className="font-bold">{test?.slots}</span></p>

                    <div className="card-actions">
                        <Link to={`/testDetails/${test?._id}`}><button className="btn btn-primary">Details</button></Link>
                    </div>
                </div>
            </div>

                    </SwiperSlide>)
                }
                
                
                
            </Swiper>







        </div>
    );
};

export default FeaturedTests;