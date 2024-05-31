import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Title/Title";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import img from '../../assets/faq.jpg';
import Footer from "../Home/Footer/Footer";



const FaqBlog = () => {
    const axiosPublic = useAxiosPublic();
    const { data: faqs, isLoading } = useQuery({
        queryKey: ['FAQS'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faq')
            return res.data;
        }
    })
    return (
        <div className="">
            <div className="mt-20 md:mx-5">
                <Title heading={"FAQ About Us"} subHeading={"You can clear any of your common confusion from here"}></Title>
            </div>
            <div className="flex md:mx-5 gap-2 items-center justify-center">
                <div className="flex-1 lg:flex hidden ">
                    <img src={img} alt="" />

                </div>
                <div className="flex-1">
                    {
                        !isLoading && faqs.map((faq, idx) =>
                            <div key={idx} className="collapse md:rounded-xl rounded-none mb-3 collapse-plus bg-base-200">
                                <input type="radio" name="my-accordion-3" />
                                <div className="collapse-title text-xl font-medium">
                                    {faq?.question}
                                </div>
                                <div className="collapse-content">
                                    <p>{faq?.answer}</p>
                                </div>
                            </div>


                        )
                    }



                </div>
            </div>
            <Footer></Footer>


        </div>
    );
};

export default FaqBlog;