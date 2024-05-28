import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Components/Title/Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';



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
        <div>
            <Title heading={"Feautered Tests"} subHeading={"Explore Our most popular tests"}></Title>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}

            >
                {
                    tests&& tests.map(test =><SwiperSlide key={test._id}>
                        <div className="rounded-lg card">
                            <img className="rounded-lg" src={test.image} alt="" />

                        </div>
                    </SwiperSlide>)
                }
                
                
                
            </Swiper>







        </div>
    );
};

export default FeaturedTests;