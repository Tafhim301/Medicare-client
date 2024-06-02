import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Components/Title/Title";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';




const Recommendatons = () => {
    const axiosPublic = useAxiosPublic();
    const { data: suggestions } = useQuery({
        queryKey: ["Personalized Recommendations"],
        queryFn: async () => {
            const res = await axiosPublic.get('/suggestions');
            return res.data;
        }
    })

    return (
        <div className="my-5 mt-2 ">
            <Title heading={"Personalized Recommendations"} subHeading={"Explore what expert says"}></Title>
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
                <div className="">
                    {
                        suggestions && suggestions.map(suggestion => <SwiperSlide key={suggestion?._id}>
                            <div className="card m-3  rounded-none bg-base-100 md:rounded-lg h-full  shadow-xl">
                                <figure><img className="w-full h-72" src={suggestion.image} alt="Test Image" /></figure>
                                <div className="card-body">
                                    <h2 className="flex items-center gap-1">Title: <span className="font-bold card-title">{suggestion?.title}</span></h2>


                                    <p>Description: <span className="font-bold">{suggestion?.description}</span></p>
                                    <p>Posted On: <span className="font-bold">{suggestion?.date}</span></p>
                                    <p>Written By: <span className="font-bold">{suggestion?.author}</span></p>


                                </div>
                            </div>

                        </SwiperSlide>)
                    }

                </div>


            </Swiper>







        </div>
    );
};

export default Recommendatons;